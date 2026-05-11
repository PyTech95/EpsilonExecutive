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

### 2026-02-09 (current session — Squarespace-style Admin Expansion)
- **NEW: Dedicated Corporate Page Editor** (`/admin/corporate`). Full visual editor
  for `/corporate` with collapsible sections: Hero (eyebrow, title, subtitle,
  primary/secondary CTA text, hero background image), Intro (eyebrow, title, body),
  Why-cards array (add/edit/delete/reorder), Audiences array
  (add/edit/delete/reorder; titles auto-populate the inquiry form's
  "Cohort Interest" dropdown), and CTA copy. New file:
  `/app/frontend/src/admin/CorporateEditor.jsx`.
- **NEW: Tabbed Pages Editor** (`/admin/pages`). Single screen with 5 tabs covering
  About / Admissions / Schedule / Contact / Apply. Each tab edits hero text,
  body copy, images, and key arrays (admissions process steps, fees, schedule
  "What to Expect" items, contact form topics). New file:
  `/app/frontend/src/admin/PagesEditor.jsx`.
- **Reorganized AdminLayout sidebar** into 4 grouped sections — Overview, Pages
  (Home / About-Admissions-Apply / Corporate / Header & Footer / SEO),
  Content (Programs, Faculty, Testimonials, Cohorts, Insights, Events),
  Operations (Submissions, Password). Each item now has a `data-testid` for
  test reliability.
- **Public pages now consume editable content** with sensible fallbacks:
  `About.jsx`, `Admissions.jsx`, `Schedule.jsx`, `Contact.jsx`, `Apply.jsx`, and
  `Corporate.jsx` were updated to read from `home.<page>` namespaces in the
  site_content singleton. Corporate hero now supports a background image.
- **HomeEditor** Corporate section replaced with a link to the new dedicated
  editor (no functionality lost — `whyItems`/`audiences` are now fully editable
  via the UI instead of requiring DB access).
- All new editors use module-scope `F` and `Section`/`Block` components to
  prevent the cursor-jump bug previously fixed in HomeEditor/HeaderFooterEditor.

### 2026-02-09 (earlier — Admin Credentials, SEO, Favicon, Mobile UI)
- Mobile menu drawer: Removed redundant `bg-cream` classes that caused visible "white
  boxes" against the `#EDE5D2` (bone) wrapper. Drawer wrapper unified to `#F5EFE0`
  (cream) so all inner items render as a single uniform tile.
- SectionHeader: Reduced chapter-eyebrow→title spacing on mobile (`mb-2 → mb-1`,
  `mb-4 → mb-2`, `mt-6 → mt-3`) so the chapter line ("— Chapter II —") sits closer to
  its title; desktop spacing preserved via `md:` breakpoints.
- Faculty photos: Added `object-top` on Lead and Guest portraits (Faculty.jsx and
  FacultyShowcase.jsx) so faces aren't cropped at the top of `aspect-[4/5]` frames.
- Global mobile padding reduced ~50% across pages: About, Contact, Corporate,
  Admissions, ProgramDetail, Apply, Programs, Schedule, Insights, Events,
  InsightDetail. Pattern: `py-24 → py-12 md:py-24`, `py-28 → py-14 md:py-28`,
  `py-20 → py-10 md:py-20`. ProgramDetail module/grid top margins reduced
  (`mt-16 → mt-8 md:mt-16`, `mt-14 → mt-8 md:mt-14`, `mt-12 → mt-8 md:mt-12`).
- Verified via mobile screenshots: home, mobile menu (open + Programs accordion),
  Faculty (lead photo full head visible), ProgramDetail modules, home Chapter II.

### 2026-02-XX (previous in-session)
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
