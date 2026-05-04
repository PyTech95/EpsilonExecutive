# Epsilon Executive Education — PRD

## Original Problem Statement
Build a pixel-perfect clone of the Epsilon Executive Education website matching its
design, layout, colors, fonts, images, animations, and structure. The site must be fully
dynamic with a WordPress-style admin panel to edit content and view submissions.

## Architecture
- Frontend: React (CRA) + Tailwind + shadcn/ui + react-router. Global content via Context API.
- Backend: FastAPI + Motor (async MongoDB) + JWT auth (python-jose) + bcrypt (passlib).
- DB: MongoDB collections — site_content, beliefs, programs, cohorts, testimonials,
  lead_faculty, guest_lecturers, insights, events, sub_* (6 submission types), admins.
- Routing: All backend APIs under `/api`. Frontend uses `REACT_APP_BACKEND_URL`.

## Implemented (Changelog)

### 2026-02-XX (current session)
- Hidden the "More Programmes" 3-card grid on the Home page (Chapter I → flagship now
  flows directly into the Brochure section).
- Guest faculty cards on Home (FacultyShowcase) and Faculty page now open a shadcn
  Dialog modal showing portrait, name, role, expertise, full bio, and tag chips —
  instead of routing to a separate detail page.
- Removed the duplicate "Guest Lecturers · Full Bios" section on `/faculty`; replaced
  with a small instructional banner directing users to click the visiting faculty above.
- Verified seeded guest_lecturers in DB: Philip Wiseman, Jayprakash Mistry, Alena Savera,
  Mardoqueo Arteaga (with bios and Unsplash professional headshots).

### Previous sessions
- Pixel-perfect frontend clone with 9 pages (Home, Programs, Program Detail, Faculty,
  About, Contact, Admissions, Apply, Corporate, Schedule, Insights, Events).
- Interactive canvas spider-net background (`NetworkBackground.jsx`).
- Full-stack WordPress-style Admin Dashboard at `/admin/login` (JWT-protected) with
  editors for Home, Programs, Faculty, Insights, Events, Beliefs, Testimonials, Footer.
- Admin Inbox surfacing 6 form submission types (Apply, Contact, Brochure, Schedule,
  Corporate, Subscribe).
- Migrated all static content to dynamic Context (`SiteContent.jsx`) → MongoDB.
- Course pages now include modules + FAQ accordions.
- Corporate Education and Schedule a Call pages built with their own forms.
- Lead Faculty (Kent Oliver Bhupathi) full bio rendered on `/faculty`.

## Roadmap / Backlog
- P1: Admin editor UI for guest_lecturers (currently editable via API/seed only).
- P1: Image upload pipeline for admin instead of pasting URLs.
- P2: SEO meta-tags / Open Graph per page.
- P2: Email notification on new submissions (e.g., Resend integration).
- P2: Refactor `server.py` (363 lines) and `Home.jsx` (large) into focused modules.
- P2: Add backend tests under `/app/backend/tests`.

## Test Credentials
See `/app/memory/test_credentials.md`.

## Key Files
- Frontend: `src/App.js`, `src/context/SiteContent.jsx`, `src/components/FacultyShowcase.jsx`,
  `src/pages/Home.jsx`, `src/pages/Faculty.jsx`, `src/admin/*`.
- Backend: `backend/server.py`, `backend/seed_data.py`.

## Key API Endpoints
- `POST /api/auth/login`, `GET /api/auth/me`, `POST /api/auth/change-password`
- `GET/PUT /api/content/home`, `GET/PUT /api/content/beliefs`
- CRUD: `/api/programs`, `/api/cohorts`, `/api/testimonials`, `/api/lead-faculty`,
  `/api/guest-lecturers`, `/api/insights`, `/api/events`
- Submissions: `/api/submissions/{apply|contact|brochure|subscribe|schedule|corporate}`
- `GET /api/admin/stats`
