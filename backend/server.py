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
import smtplib
import ssl
import asyncio
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
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
ALLOWED_DOC_EXT = {".pdf"}
ALLOWED_UPLOAD_EXT = ALLOWED_IMAGE_EXT | ALLOWED_DOC_EXT

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

JWT_SECRET = os.environ.get("JWT_SECRET", "dev-secret")
JWT_ALGO = "HS256"
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "admin@epsilonexec.com")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "Welcome@123##2")

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
    program: Optional[str] = ""
    firstName: Optional[str] = ""
    lastName: Optional[str] = ""
    fullName: Optional[str] = ""
    email: EmailStr
    countryCode: Optional[str] = "+91"
    mobile: Optional[str] = ""
    phone: Optional[str] = ""
    country: Optional[str] = "India"
    state: Optional[str] = ""
    experience: Optional[str] = ""
    educationalGoal: Optional[str] = ""
    currentFunction: Optional[str] = ""
    role: Optional[str] = ""
    company: Optional[str] = ""
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
        # Fire-and-forget email notification (does not block response)
        asyncio.create_task(send_notification_email(
            subject=f"New {path.capitalize()} Submission · Epsilon",
            body_html=_format_submission_email(path.capitalize(), doc),
        ))
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
# EMAIL SETTINGS + SMTP HELPER
# ==================================================================
EMAIL_SETTINGS_KEY = "email_settings"
DEFAULT_EMAIL_SETTINGS = {
    "enabled": False,
    "smtpHost": "smtp.gmail.com",
    "smtpPort": 587,
    "senderEmail": "",
    "appPassword": "",
    "recipients": "",  # comma-separated
    "fromName": "Epsilon Executive Education",
}


class EmailSettingsIn(BaseModel):
    enabled: bool = False
    smtpHost: str = "smtp.gmail.com"
    smtpPort: int = 587
    senderEmail: str = ""
    appPassword: str = ""
    recipients: str = ""
    fromName: str = "Epsilon Executive Education"


async def get_email_settings() -> Dict[str, Any]:
    doc = await db.settings.find_one({"_id": EMAIL_SETTINGS_KEY})
    if not doc:
        return dict(DEFAULT_EMAIL_SETTINGS)
    doc.pop("_id", None)
    return {**DEFAULT_EMAIL_SETTINGS, **doc}


def _send_smtp_sync(cfg: Dict[str, Any], to_addrs: List[str], subject: str, body_html: str) -> None:
    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = f"{cfg.get('fromName', 'Epsilon')} <{cfg['senderEmail']}>"
    msg["To"] = ", ".join(to_addrs)
    msg.attach(MIMEText(body_html, "html"))

    port = int(cfg.get("smtpPort", 587))
    host = cfg.get("smtpHost", "smtp.gmail.com")
    context = ssl.create_default_context()
    if port == 465:
        with smtplib.SMTP_SSL(host, port, context=context, timeout=20) as server:
            server.login(cfg["senderEmail"], cfg["appPassword"])
            server.sendmail(cfg["senderEmail"], to_addrs, msg.as_string())
    else:
        with smtplib.SMTP(host, port, timeout=20) as server:
            server.ehlo()
            server.starttls(context=context)
            server.ehlo()
            server.login(cfg["senderEmail"], cfg["appPassword"])
            server.sendmail(cfg["senderEmail"], to_addrs, msg.as_string())


async def send_notification_email(subject: str, body_html: str) -> Dict[str, Any]:
    cfg = await get_email_settings()
    if not cfg.get("enabled"):
        return {"sent": False, "reason": "Notifications disabled"}
    if not cfg.get("senderEmail") or not cfg.get("appPassword"):
        return {"sent": False, "reason": "SMTP credentials missing"}
    to_addrs = [e.strip() for e in (cfg.get("recipients") or "").split(",") if e.strip()]
    if not to_addrs:
        return {"sent": False, "reason": "No recipients configured"}
    try:
        await asyncio.to_thread(_send_smtp_sync, cfg, to_addrs, subject, body_html)
        return {"sent": True, "to": to_addrs}
    except Exception as e:
        logging.getLogger("epsilon").exception("Email send failed")
        return {"sent": False, "reason": str(e)}


def _format_submission_email(form_type: str, doc: Dict[str, Any]) -> str:
    rows = "".join(
        f"<tr><td style='padding:6px 12px;border:1px solid #eee;background:#fafafa;font-family:Arial;font-size:13px;color:#555;text-transform:capitalize;'>{k}</td>"
        f"<td style='padding:6px 12px;border:1px solid #eee;font-family:Arial;font-size:13px;color:#111;'>{v}</td></tr>"
        for k, v in doc.items() if k not in ("_id", "status") and v not in (None, "")
    )
    return f"""
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px;background:#0b1733;color:#f5efe6;">
      <h2 style="margin:0 0 8px;font-family:Georgia,serif;color:#c9a227;">New {form_type} Submission</h2>
      <p style="margin:0 0 20px;color:#cfc6b4;font-size:13px;">Epsilon Executive Education · Admin Notification</p>
    </div>
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px;background:#fff;">
      <table style="border-collapse:collapse;width:100%;">{rows}</table>
      <p style="margin-top:24px;font-size:12px;color:#888;">View all submissions in your admin panel.</p>
    </div>
    """


@api.get("/admin/email-settings")
async def admin_get_email_settings(email: str = Depends(require_admin)):
    cfg = await get_email_settings()
    # Mask password on read
    if cfg.get("appPassword"):
        cfg["appPasswordSet"] = True
        cfg["appPassword"] = ""
    else:
        cfg["appPasswordSet"] = False
    return cfg


@api.put("/admin/email-settings")
async def admin_update_email_settings(body: EmailSettingsIn, email: str = Depends(require_admin)):
    existing = await db.settings.find_one({"_id": EMAIL_SETTINGS_KEY}) or {}
    payload = body.dict()
    # If appPassword blank, preserve existing one
    if not payload.get("appPassword"):
        payload["appPassword"] = existing.get("appPassword", "")
    payload["updatedAt"] = datetime.now(tz=timezone.utc).isoformat()
    await db.settings.update_one(
        {"_id": EMAIL_SETTINGS_KEY},
        {"$set": payload},
        upsert=True,
    )
    return {"ok": True}


@api.post("/admin/email-settings/test")
async def admin_test_email(email: str = Depends(require_admin)):
    result = await send_notification_email(
        subject="Epsilon Admin · Test Email",
        body_html=_format_submission_email("Test", {"message": "If you can read this, your SMTP setup is working.", "sentBy": email}),
    )
    if not result.get("sent"):
        raise HTTPException(400, result.get("reason", "Failed to send"))
    return result


# ==================================================================
# IMAGE UPLOAD (admin only)
# ==================================================================
@api.post("/admin/upload")
async def upload_image(file: UploadFile = File(...), email: str = Depends(require_admin)):
    ext = Path(file.filename or "").suffix.lower()
    if ext not in ALLOWED_UPLOAD_EXT:
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
    # Idempotent admin seed: create if missing, otherwise update password hash
    # whenever ADMIN_PASSWORD env var no longer matches the stored hash.
    existing = await db.admins.find_one({"email": ADMIN_EMAIL})
    if not existing:
        await db.admins.insert_one({
            "email": ADMIN_EMAIL,
            "password_hash": pwd_ctx.hash(ADMIN_PASSWORD),
            "createdAt": datetime.now(tz=timezone.utc).isoformat(),
        })
        logger.info("Seeded admin: %s", ADMIN_EMAIL)
    elif not pwd_ctx.verify(ADMIN_PASSWORD, existing.get("password_hash", "")):
        await db.admins.update_one(
            {"email": ADMIN_EMAIL},
            {"$set": {"password_hash": pwd_ctx.hash(ADMIN_PASSWORD)}},
        )
        logger.info("Updated admin password for: %s", ADMIN_EMAIL)
    # Remove any stale legacy admin accounts to avoid confusion
    await db.admins.delete_many({"email": {"$nin": [ADMIN_EMAIL]}})
    # Seed content
    await seed_if_empty(db)
    logger.info("Startup complete")


@app.on_event("shutdown")
async def on_shutdown():
    client.close()
