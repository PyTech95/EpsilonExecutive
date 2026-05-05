"""Epsilon Executive Education backend — auth, content CMS, submissions."""
from fastapi import FastAPI, APIRouter, HTTPException, Depends, Header, UploadFile, File
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import uuid
import shutil
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Optional, List, Any, Dict

from pydantic import BaseModel, Field, EmailStr
from passlib.context import CryptContext
import jwt

from seed_data import seed_if_empty

# ---------- setup ----------
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

UPLOAD_DIR = ROOT_DIR / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
ALLOWED_IMAGE_EXT = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".avif"}

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

JWT_SECRET = os.environ.get("JWT_SECRET", "dev-secret")
JWT_ALGO = "HS256"
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "admin@epsilon-edu.in")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "Epsilon@2026")

pwd_ctx = CryptContext(schemes=["bcrypt"], deprecated="auto")

app = FastAPI(title="Epsilon CMS")
api = APIRouter(prefix="/api")


# ---------- auth helpers ----------
def make_token(email: str) -> str:
    exp = datetime.now(tz=timezone.utc) + timedelta(days=7)
    return jwt.encode({"sub": email, "exp": exp}, JWT_SECRET, algorithm=JWT_ALGO)


def decode_token(token: str) -> Optional[str]:
    try:
        data = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGO])
        return data.get("sub")
    except Exception:
        return None


async def require_admin(authorization: Optional[str] = Header(None)) -> str:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing token")
    token = authorization.split(" ", 1)[1]
    email = decode_token(token)
    if not email:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    admin = await db.admins.find_one({"email": email})
    if not admin:
        raise HTTPException(status_code=403, detail="Not an admin")
    return email


# ---------- schemas ----------
class LoginIn(BaseModel):
    email: str
    password: str


class LoginOut(BaseModel):
    token: str
    email: str


class ChangePasswordIn(BaseModel):
    current: str
    new: str


class ApplySubmission(BaseModel):
    programme: str
    fullName: str
    email: EmailStr
    phone: Optional[str] = ""
    role: Optional[str] = ""
    company: Optional[str] = ""
    experience: Optional[str] = ""
    why: Optional[str] = ""
    heard: Optional[str] = ""


class ContactSubmission(BaseModel):
    name: str
    email: EmailStr
    topic: str
    message: str


class BrochureSubmission(BaseModel):
    name: str
    phone: str
    email: EmailStr
    course: str


class SubscribeSubmission(BaseModel):
    email: EmailStr


class ScheduleSubmission(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    company: Optional[str] = ""
    role: Optional[str] = ""
    preferredDate: Optional[str] = ""
    preferredTime: Optional[str] = ""
    timezone: Optional[str] = ""
    interest: Optional[str] = ""
    message: Optional[str] = ""


class CorporateSubmission(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    company: str
    role: Optional[str] = ""
    teamSize: Optional[str] = ""
    interest: Optional[str] = ""
    message: Optional[str] = ""


# ---------- sanitize helpers ----------
def clean(doc: Optional[dict]) -> Optional[dict]:
    if not doc:
        return doc
    d = dict(doc)
    if "_id" in d and isinstance(d["_id"], str) is False:
        d["_id"] = str(d["_id"])
    return d


def clean_list(docs: list) -> list:
    return [clean(d) for d in docs]


# ==================================================================
# AUTH
# ==================================================================
@api.post("/auth/login", response_model=LoginOut)
async def login(body: LoginIn):
    admin = await db.admins.find_one({"email": body.email})
    if not admin:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    if not pwd_ctx.verify(body.password, admin["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return LoginOut(token=make_token(body.email), email=body.email)


@api.get("/auth/me")
async def me(email: str = Depends(require_admin)):
    return {"email": email}


@api.post("/auth/change-password")
async def change_password(body: ChangePasswordIn, email: str = Depends(require_admin)):
    admin = await db.admins.find_one({"email": email})
    if not admin or not pwd_ctx.verify(body.current, admin["password_hash"]):
        raise HTTPException(status_code=401, detail="Current password incorrect")
    await db.admins.update_one(
        {"email": email},
        {"$set": {"password_hash": pwd_ctx.hash(body.new)}},
    )
    return {"ok": True}


# ==================================================================
# SITE CONTENT (home page singleton + beliefs)
# ==================================================================
@api.get("/content/home")
async def get_home():
    doc = await db.site_content.find_one({"_id": "home"})
    return clean(doc) or {}


@api.put("/content/home")
async def put_home(body: Dict[str, Any], email: str = Depends(require_admin)):
    body["_id"] = "home"
    await db.site_content.update_one({"_id": "home"}, {"$set": body}, upsert=True)
    return {"ok": True}


@api.get("/content/beliefs")
async def list_beliefs():
    docs = await db.beliefs.find().sort("order", 1).to_list(100)
    return clean_list(docs)


@api.put("/content/beliefs")
async def replace_beliefs(items: List[Dict[str, Any]], email: str = Depends(require_admin)):
    for i, it in enumerate(items):
        it.setdefault("_id", str(uuid.uuid4()))
        it["order"] = i + 1
    await db.beliefs.delete_many({})
    if items:
        await db.beliefs.insert_many(items)
    return {"ok": True, "count": len(items)}


# ==================================================================
# Generic collection factory
# ==================================================================
def collection_routes(path: str, collection: str, sort_key: str = "order"):
    @api.get(f"/{path}")
    async def _list():
        docs = await db[collection].find().sort(sort_key, 1).to_list(500)
        return clean_list(docs)

    @api.get(f"/{path}/{{item_id}}")
    async def _get(item_id: str):
        doc = (
            await db[collection].find_one({"_id": item_id})
            or await db[collection].find_one({"slug": item_id})
        )
        if not doc:
            raise HTTPException(404, "Not found")
        return clean(doc)

    @api.post(f"/{path}")
    async def _create(body: Dict[str, Any], email: str = Depends(require_admin)):
        body.setdefault("_id", body.get("slug") or str(uuid.uuid4()))
        body.setdefault("order", 999)
        await db[collection].insert_one(body)
        return clean(body)

    @api.put(f"/{path}/{{item_id}}")
    async def _update(item_id: str, body: Dict[str, Any], email: str = Depends(require_admin)):
        body.pop("_id", None)
        res = await db[collection].update_one({"_id": item_id}, {"$set": body})
        if res.matched_count == 0:
            raise HTTPException(404, "Not found")
        doc = await db[collection].find_one({"_id": item_id})
        return clean(doc)

    @api.delete(f"/{path}/{{item_id}}")
    async def _delete(item_id: str, email: str = Depends(require_admin)):
        res = await db[collection].delete_one({"_id": item_id})
        if res.deleted_count == 0:
            raise HTTPException(404, "Not found")
        return {"ok": True}


collection_routes("programs", "programs")
collection_routes("cohorts", "cohorts")
collection_routes("testimonials", "testimonials")
collection_routes("lead-faculty", "lead_faculty")
collection_routes("guest-lecturers", "guest_lecturers")
collection_routes("insights", "insights")
collection_routes("events", "events")


# ==================================================================
# PUBLIC SUBMISSIONS + ADMIN INBOX
# ==================================================================
def make_submission_routes(path: str, collection: str, model):
    @api.post(f"/submissions/{path}")
    async def _submit(body: model):
        doc = body.dict()
        doc["_id"] = str(uuid.uuid4())
        doc["createdAt"] = datetime.now(tz=timezone.utc).isoformat()
        doc["status"] = "new"
        await db[collection].insert_one(doc)
        return {"ok": True, "id": doc["_id"]}

    @api.get(f"/submissions/{path}")
    async def _list(email: str = Depends(require_admin)):
        docs = await db[collection].find().sort("createdAt", -1).to_list(1000)
        return clean_list(docs)

    @api.delete(f"/submissions/{path}/{{sub_id}}")
    async def _delete(sub_id: str, email: str = Depends(require_admin)):
        await db[collection].delete_one({"_id": sub_id})
        return {"ok": True}

    @api.patch(f"/submissions/{path}/{{sub_id}}")
    async def _update_status(sub_id: str, body: Dict[str, Any], email: str = Depends(require_admin)):
        await db[collection].update_one({"_id": sub_id}, {"$set": {"status": body.get("status", "read")}})
        return {"ok": True}


make_submission_routes("apply", "sub_apply", ApplySubmission)
make_submission_routes("contact", "sub_contact", ContactSubmission)
make_submission_routes("brochure", "sub_brochure", BrochureSubmission)
make_submission_routes("subscribe", "sub_subscribe", SubscribeSubmission)
make_submission_routes("schedule", "sub_schedule", ScheduleSubmission)
make_submission_routes("corporate", "sub_corporate", CorporateSubmission)


# ==================================================================
# ADMIN DASHBOARD STATS
# ==================================================================
@api.get("/admin/stats")
async def admin_stats(email: str = Depends(require_admin)):
    return {
        "programs": await db.programs.count_documents({}),
        "testimonials": await db.testimonials.count_documents({}),
        "lead_faculty": await db.lead_faculty.count_documents({}),
        "guest_lecturers": await db.guest_lecturers.count_documents({}),
        "insights": await db.insights.count_documents({}),
        "events": await db.events.count_documents({}),
        "cohorts": await db.cohorts.count_documents({}),
        "submissions": {
            "apply": await db.sub_apply.count_documents({}),
            "contact": await db.sub_contact.count_documents({}),
            "brochure": await db.sub_brochure.count_documents({}),
            "subscribe": await db.sub_subscribe.count_documents({}),
            "schedule": await db.sub_schedule.count_documents({}),
            "corporate": await db.sub_corporate.count_documents({}),
        },
    }


# ==================================================================
# IMAGE UPLOAD (admin only)
# ==================================================================
@api.post("/admin/upload")
async def upload_image(file: UploadFile = File(...), email: str = Depends(require_admin)):
    ext = Path(file.filename or "").suffix.lower()
    if ext not in ALLOWED_IMAGE_EXT:
        raise HTTPException(400, f"Unsupported file type: {ext}")
    safe_name = f"{uuid.uuid4().hex}{ext}"
    dest = UPLOAD_DIR / safe_name
    with dest.open("wb") as out:
        shutil.copyfileobj(file.file, out)
    return {"url": f"/api/uploads/{safe_name}", "filename": safe_name, "size": dest.stat().st_size}


# ==================================================================
@api.get("/")
async def root():
    return {"service": "Epsilon CMS", "ok": True}


app.include_router(api)

# Serve uploaded images via /api/uploads/<filename>
app.mount("/api/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger("epsilon")


@app.on_event("startup")
async def on_startup():
    # Ensure admin exists
    existing = await db.admins.find_one({"email": ADMIN_EMAIL})
    if not existing:
        await db.admins.insert_one({
            "email": ADMIN_EMAIL,
            "password_hash": pwd_ctx.hash(ADMIN_PASSWORD),
            "createdAt": datetime.now(tz=timezone.utc).isoformat(),
        })
        logger.info("Seeded admin: %s", ADMIN_EMAIL)
    # Seed content
    await seed_if_empty(db)
    logger.info("Startup complete")


@app.on_event("shutdown")
async def on_shutdown():
    client.close()
