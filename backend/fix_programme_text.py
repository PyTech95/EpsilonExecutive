"""Replace 'programme(s)' → 'program(s)' in all live MongoDB documents."""
import asyncio, os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

load_dotenv("/app/backend/.env")

REPLACEMENTS = [
    ('Programmes', 'Programs'), ('PROGRAMMES', 'PROGRAMS'), ('programmes', 'programs'),
    ('Programme', 'Program'), ('PROGRAMME', 'PROGRAM'), ('programme', 'program'),
]

def fix(v):
    if isinstance(v, str):
        for a, b in REPLACEMENTS:
            v = v.replace(a, b)
        return v
    if isinstance(v, list):
        return [fix(x) for x in v]
    if isinstance(v, dict):
        return {k: fix(val) for k, val in v.items()}
    return v


async def main():
    c = AsyncIOMotorClient(os.environ['MONGO_URL'])
    db = c[os.environ['DB_NAME']]
    cols = ['site_content', 'programs', 'cohorts', 'testimonials', 'lead_faculty',
            'guest_lecturers', 'insights', 'events', 'beliefs']
    total = 0
    for col in cols:
        docs = await db[col].find().to_list(2000)
        for d in docs:
            new = fix(d)
            if new != d:
                await db[col].replace_one({'_id': new['_id']}, new)
                total += 1
        print(f"{col}: {len(docs)} docs scanned")
    print(f"Total updated: {total}")


if __name__ == "__main__":
    asyncio.run(main())
