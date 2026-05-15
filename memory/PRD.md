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

### 2026-02-15 (current session — Live Editor persistence + Admissions process bug fixes)
- **FIX: Live Editor text changes now persist after refresh.** Root cause was a path mismatch — `<SectionHeader pathPrefix="sections.admissions">` saved edits to `sections.admissions.eyebrow` while `Home.jsx` read from `sections.admissionsEyebrow` (flat key). After refresh the page read the old value.
  - Added optional explicit path props to `SectionHeader.jsx`: `eyebrowPath`, `titlePath`, `subtitlePath`, `accentPath`, `chapterPath`.
  - Updated `Home.jsx` SectionHeader calls (Brochure, Admissions, Flagship, Testimonials) to save to the same paths the page reads from.
- **FIX: Admissions process steps on the homepage now read from `home.admissions.steps`.** They were previously hardcoded inline in `Home.jsx`, so admin backend edits never reflected. Each step's number/title/body now also has a `data-cms-path` for live editing.
- Files changed: `frontend/src/components/SectionHeader.jsx`, `frontend/src/pages/Home.jsx`.

### 2026-02-13 (Frontend Live Editor)
- **NEW: Squarespace-style live frontend editor.** Logged-in admins now see an "Edit Site" floating pill on every public page. Clicking it (or appending `?edit=true` to any URL) enables an inline editor:
  - Click any tagged element to open a floating toolbar with:
    - Inline text editing (textarea + Save text)
    - Image upload / URL replace for tagged `<img>` elements
    - Style controls: text color, background color, font size presets, font weight presets, text alignment
    - Per-element Save & Reset
  - Saved text edits PATCH the `site_content.home` document at the exact dot-path (e.g. `hero.titleLine1`), refreshing the site content cache live.
  - Saved styles are stored in `settings.element_styles` keyed by `data-cms-path`. A global `<style>` tag injects rules via `[data-cms-path="…"]` attribute selectors with `!important`, so they apply regardless of underlying tailwind classes.
  - Pages tagged with `data-cms-path` for Live Editor: Home (hero, brochure, about, CTA, contact details), About, Admissions, Contact, Programs, Events, Insights, Faculty, Apply, Corporate, Schedule.
  - New files:
    - `/app/frontend/src/liveEditor/EditModeContext.jsx`
    - `/app/frontend/src/liveEditor/LiveEditor.jsx`
    - `/app/frontend/src/liveEditor/EditToolbar.jsx`
    - `/app/frontend/src/liveEditor/EditModeButton.jsx`
    - `/app/frontend/src/liveEditor/StyleInjector.jsx`
  - Backend additions in `/app/backend/server.py`:
    - `PATCH /api/admin/content/home` — granular dot-path update for any home content field.
    - `GET /api/content/element-styles` — public read of saved per-element styles map.
    - `PUT /api/admin/element-styles` — upsert/clear a path's style (flat dict; dots in key are preserved via read-modify-write).
  - End-to-end tested: text edit persists across reload; style edits (color, weight) apply via injected CSS after reload.

### 2026-02-09 (Squarespace-style Admin Expansion)
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
