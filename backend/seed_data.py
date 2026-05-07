"""Initial seed content for Epsilon Executive Education."""
from datetime import datetime

LOGO_URL = "https://customer-assets.emergentagent.com/job_logos-11/artifacts/0r3ksglp_EPSILON%20LOGO2.png"

HOME_CONTENT = {
    "_id": "home",
    "hero": {
        "eyebrow": "The AI Era of Executive Education",
        "titleLine1": "Turning technical fluency",
        "titleLine2": "into strategic value.",
        "subtitle": "Live online cohorts for working professionals who want to translate AI, data, and modern decision systems into evidence-based action — not theatre.",
        "primaryCtaText": "Apply Now",
        "primaryCtaHref": "/apply",
        "secondaryCtaText": "Sign In to Learn",
        "secondaryCtaHref": "https://moodle.org/login/index.php",
        "heroImage": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=2400&q=80",
        "stats": [
            {"value": "12 weeks", "label": "Cohort duration"},
            {"value": "Live online", "label": "Executive-friendly"},
            {"value": "15–20 hrs", "label": "Per-week commitment"},
            {"value": "Capstone", "label": "Portfolio outcome"},
        ],
    },
    "brochure": {
        "eyebrow": "Program Brochure",
        "title": "Everything you need to decide.",
        "description": "28-page PDF · Program overview, modules, fees, capstone, faculty and admissions.",
        "pdfUrl": "https://customer-assets.emergentagent.com/job_logos-11/artifacts/pjvgovi6_brochure%203e%20sample.pdf",
    },
    "about": {
        "eyebrow": "About Epsilon",
        "title": "A school for the people who decide.",
        "paragraph1": "Knowing about AI is not the same as deciding with it. Reading a model report is not the same as defending a recommendation to a board. Our programs are built around that gap — the difference between knowing and deciding.",
        "paragraph2": "We pair practitioner-educators with senior cohorts, hold them to a high bar of evidence, and end every program with a portfolio-grade capstone — an artefact that proves capability, not attendance.",
    },
    "cta": {
        "eyebrow": "Take the next step",
        "title": "Build the judgement your next decade demands.",
        "subtitle": "Apply, talk to admissions, or sign in to your learning environment.",
    },
    "contact": {
        "email": "admissions@epsilon-edu.in",
        "phone": "+91 · on request",
        "address": "Live online · cohorts based in India",
        "subtext": "Questions about a program, fit, fees, or partnerships? Drop us a line and a member of the team will write back personally.",
    },
    "footer": {
        "tagline": "Turning technical fluency into strategic value — executive education for the AI era.",
        "copyright": "© 2026 Epsilon Executive Education · All rights reserved",
        "subscribeHeading": "Stay in the Loop",
        "signInUrl": "https://moodle.org/login/index.php",
    },
    "sections": {
        "flagshipEyebrow": "Flagship Program",
        "testimonialsEyebrow": "In Their Words",
        "testimonialsTitle": "The judgement shows up in their work.",
        "admissionsEyebrow": "Admissions",
        "admissionsTitle": "A personal conversation. Not a funnel.",
        "admissionsSubtitle": "Every applicant speaks with an admissions lead before a seat is offered. Start with a message — we will write back personally.",
    },
    "corporate": {
        "eyebrow": "Corporate Education",
        "heroTitle": "Built for your team. Run for your business.",
        "heroSubtitle": "Custom cohorts that turn your senior team into evidence-based decision-makers — built around your operating reality, not a generic syllabus.",
        "intro": "We design and deliver private cohorts for companies that want their senior leadership to think clearly about AI, data, and modern decision systems. Programs are bespoke, evidence-anchored, and led by practitioner-educators.",
        "whyTitle": "Why companies partner with Epsilon",
        "whyItems": [
            {"title": "Bespoke curriculum", "body": "Programs designed around your sector, your data, and the decisions your leaders are actually making."},
            {"title": "Practitioner faculty", "body": "Educators who have built and shipped — not consultants reading slides."},
            {"title": "Defended capstones", "body": "Each participant builds and defends a portfolio artefact tied to a real business problem."},
            {"title": "Measurement built-in", "body": "Pre/post diagnostics, faculty assessments, and a cohort report at the end."},
        ],
        "audiencesTitle": "Who we run cohorts for",
        "audiences": [
            {"title": "C-Suite & Boards", "body": "Two-to-four-week intensives on AI judgement, governance, and capital allocation under technological change."},
            {"title": "Senior Leadership", "body": "Eight-to-twelve-week programs on applied AI, decision science, and executive communication."},
            {"title": "Functional Teams", "body": "Custom modules for product, finance, risk, marketing, and operations teams."},
        ],
        "ctaTitle": "Talk to us about a private cohort.",
        "ctaSubtitle": "Tell us about your team and what you want them to be able to do. We will design a program around it.",
    },
    "logoUrl": LOGO_URL,
}

BELIEFS = [
    {"_id": "b01", "n": "01", "title": "Evidence over enthusiasm", "body": "We teach disciplined reasoning, not the sugar-rush of every new model release.", "order": 1},
    {"_id": "b02", "n": "02", "title": "Decisions over diagrams", "body": "Every framework we teach must survive contact with a real business decision.", "order": 2},
    {"_id": "b03", "n": "03", "title": "Craft over content", "body": "Mastery is built by doing the work, with feedback, in front of senior peers.", "order": 3},
]

PROGRAMS = [
    {
        "_id": "applied-ai-ml",
        "slug": "applied-ai-ml",
        "title": "Professional Certificate in Applied AI & Machine Learning",
        "subtitle": "Applied AI & Machine Learning",
        "tagline": "Turning Technical Fluency into Strategic Value",
        "level": "mid",
        "levelLabel": "Mid Career",
        "weeks": 12,
        "audience": "5–15 yrs experience",
        "fee": "₹1,25,000",
        "nextCohort": "Cohort 04 · 15 March 2026",
        "image": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1600&q=80",
        "short": "Build evidence-based AI capability, from first principles to production judgement.",
        "long": "A twelve-week live online cohort that builds the judgement to lead AI initiatives — reading models critically, designing disciplined workflows, and defending recommendations to the people who decide.",
        "outcomes": [
            "Read and critique AI reports like a senior operator",
            "Design LLM workflows that survive production",
            "Defend a capstone project to faculty and senior peers",
            "Build a portfolio artefact that travels with you",
        ],
        "curriculum": [
            {"week": "01–02", "topic": "Foundations — How models actually work"},
            {"week": "03–04", "topic": "Data, evaluation, and the evidence bar"},
            {"week": "05–06", "topic": "LLMs, prompting, and disciplined workflows"},
            {"week": "07–08", "topic": "Decision science — from model to memo"},
            {"week": "09–10", "topic": "Deployment, governance, and failure modes"},
            {"week": "11–12", "topic": "Capstone build + faculty defence"},
        ],
        "modules": [
            {
                "n": "01",
                "title": "Foundations",
                "description": "How models actually work — the mathematical and statistical scaffolding behind modern ML, demystified for senior leaders.",
                "topics": ["Linear models & calibration", "Probability and uncertainty", "Loss functions & training dynamics", "When ML is the wrong tool"],
            },
            {
                "n": "02",
                "title": "Data & Evaluation",
                "description": "Reading datasets like an analyst. The difference between a benchmark, a test, and a business case.",
                "topics": ["Sampling and bias", "Train/validate/test discipline", "Evaluation harnesses", "Cost of error analysis"],
            },
            {
                "n": "03",
                "title": "Applied LLMs",
                "description": "Prompting, retrieval, agents — and the workflow discipline that separates demos from systems.",
                "topics": ["Prompt design patterns", "Retrieval & grounding", "Tool-using agents", "Failure budgets & guardrails"],
            },
            {
                "n": "04",
                "title": "Decision Science",
                "description": "Translating model outputs into recommendations a board will defend.",
                "topics": ["The one-page memo", "Decision frameworks under ambiguity", "Communicating risk", "Boardroom recommendation patterns"],
            },
            {
                "n": "05",
                "title": "Deployment & Governance",
                "description": "Production, oversight, and the failure modes that matter.",
                "topics": ["MLOps essentials for leaders", "Model risk management", "Governance & audit trails", "Recovery & rollback"],
            },
            {
                "n": "06",
                "title": "Capstone",
                "description": "A defended, portfolio-grade artefact built with faculty critique throughout.",
                "topics": ["Problem framing", "Build sprints", "Faculty critique cycles", "Final defence"],
            },
        ],
        "faqs": [
            {"q": "Who is this program for?", "a": "Working professionals with 5–15 years of experience who lead, evaluate, or fund AI initiatives — and want to build the judgement to do it well."},
            {"q": "How much time per week should I budget?", "a": "Plan for 15–20 hours per week — three live evening sessions plus reading, exercises, and capstone work."},
            {"q": "Do I need to code?", "a": "Comfort reading code helps but is not required. We focus on the judgement to lead AI work, not the syntax to ship it."},
            {"q": "What does the capstone look like?", "a": "A portfolio-grade artefact you build through the program — defended in front of faculty and senior peers in the final week."},
            {"q": "Are there scholarships or payment plans?", "a": "Yes — we offer needs-based partial scholarships and a three-instalment payment plan. Mention it in your application."},
            {"q": "Will I get a certificate?", "a": "Yes — a Professional Certificate in Applied AI & Machine Learning, signed by faculty, on successful defence of your capstone."},
        ],
        "featured": True,
        "order": 1,
    },
    {
        "_id": "strategic-leadership",
        "slug": "strategic-leadership",
        "title": "Advanced Program in Strategic Leadership",
        "subtitle": "Strategic Leadership",
        "tagline": "Lead with Clarity. Decide with Conviction.",
        "level": "senior",
        "levelLabel": "Senior Leadership",
        "weeks": 10,
        "audience": "10–20 yrs experience",
        "fee": "₹1,45,000",
        "nextCohort": "Cohort 03 · 22 April 2026",
        "image": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80",
        "short": "Lead with Clarity. Decide with Conviction.",
        "long": "A ten-week program for senior professionals who must set direction under ambiguity — combining decision science, executive communication, and frameworks that survive the boardroom.",
        "outcomes": [
            "Translate analysis into boardroom recommendations",
            "Use decision frameworks that scale with ambiguity",
            "Communicate with precision and restraint",
            "Defend strategy with evidence, not enthusiasm",
        ],
        "curriculum": [
            {"week": "01–02", "topic": "The posture of senior judgement"},
            {"week": "03–04", "topic": "Decision frameworks under ambiguity"},
            {"week": "05–06", "topic": "Executive communication & the one-page memo"},
            {"week": "07–08", "topic": "Strategy, evidence, and the boardroom"},
            {"week": "09–10", "topic": "Capstone — a defended strategic memo"},
        ],
        "featured": False,
        "order": 2,
    },
    {
        "_id": "finance-non-finance",
        "slug": "finance-non-finance",
        "title": "Finance for Non-Finance Executives",
        "subtitle": "Finance for Non-Finance Executives",
        "tagline": "Read the Numbers. Lead the Business.",
        "level": "mid",
        "levelLabel": "Mid Career",
        "weeks": 8,
        "audience": "5–12 yrs experience",
        "fee": "₹85,000",
        "nextCohort": "Cohort 02 · 10 May 2026",
        "image": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80",
        "short": "Read the Numbers. Lead the Business.",
        "long": "An eight-week program that gives non-finance leaders the vocabulary and judgement to read statements, interrogate assumptions, and lead commercial conversations with confidence.",
        "outcomes": [
            "Read P&L, balance sheet, and cash flow with fluency",
            "Interrogate business cases and financial models",
            "Translate strategy into unit economics",
            "Speak credibly with CFOs and finance partners",
        ],
        "curriculum": [
            {"week": "01–02", "topic": "The three statements — as a leader reads them"},
            {"week": "03–04", "topic": "Unit economics and the business model"},
            {"week": "05–06", "topic": "Valuation, capital, and the investor view"},
            {"week": "07–08", "topic": "Capstone — a defended commercial memo"},
        ],
        "featured": False,
        "order": 3,
    },
    {
        "_id": "digital-transformation",
        "slug": "digital-transformation",
        "title": "Program in Digital Transformation",
        "subtitle": "Digital Transformation",
        "tagline": "From Strategy to Shipped Reality.",
        "level": "senior",
        "levelLabel": "Mid to Senior Career",
        "weeks": 10,
        "audience": "8–18 yrs experience",
        "fee": "₹1,20,000",
        "nextCohort": "Cohort 02 · 05 June 2026",
        "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
        "short": "From Strategy to Shipped Reality.",
        "long": "A ten-week program that bridges the gap between transformation slideware and shipped change — operating models, technology choice, and the craft of leading delivery.",
        "outcomes": [
            "Design a transformation roadmap that survives contact",
            "Make credible technology and vendor choices",
            "Lead delivery through ambiguity and politics",
            "Measure change with evidence, not theatre",
        ],
        "curriculum": [
            {"week": "01–02", "topic": "What transformation actually is (and isn't)"},
            {"week": "03–04", "topic": "Operating models & the org design question"},
            {"week": "05–06", "topic": "Technology, vendors, and build-vs-buy"},
            {"week": "07–08", "topic": "Delivery, measurement, and change"},
            {"week": "09–10", "topic": "Capstone — a defended transformation plan"},
        ],
        "featured": False,
        "order": 4,
    },
]

COHORTS = [
    {"_id": "cohort-04", "label": "Cohort 04", "date": "15 March 2026", "status": "applications open", "order": 1},
    {"_id": "cohort-05", "label": "Cohort 05", "date": "12 July 2026", "status": "waitlist", "order": 2},
    {"_id": "cohort-06", "label": "Cohort 06", "date": "18 October 2026", "status": "coming soon", "order": 3},
]

TESTIMONIALS = [
    {"_id": "t1", "quote": "It rewired how I evaluate AI proposals at the executive table. I came for the tools — I left with judgement.", "name": "Aarav Sharma", "role": "VP Strategy · Mumbai-based BFSI", "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80", "order": 1},
    {"_id": "t2", "quote": "The capstone is the closest thing I have to a second CV. It has opened doors my degree never did.", "name": "Meera Ramaswamy", "role": "Director, Product · Bengaluru", "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80", "order": 2},
    {"_id": "t3", "quote": "Faculty who actually ship. Peers who challenge you. Nothing theatrical about it.", "name": "Kunal Desai", "role": "Head of Data · Delhi NCR", "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80", "order": 3},
]

LEAD_FACULTY = [
    {
        "_id": "kent-oliver-bhupathi",
        "slug": "kent-oliver-bhupathi",
        "name": "Kent Oliver Bhupathi",
        "role": "Founder and Instructor, Epsilon Executive Education",
        "badge": "Lead Instructor",
        "heroHeading": "Academic Excellence",
        "heroBlurb": "Kent Oliver Bhupathi, Founder and lead instructor, brings a rare blend of ivory-league rigor and modern economic application. With credentials from NYU and Columbia, he is an economist focused on the interface of human judgment and algorithmic efficiency.",
        "credentials": [
            {"institution": "NYU", "detail": "Graduate Studies"},
            {"institution": "Columbia", "detail": "Visiting Faculty"},
        ],
        "affiliations": [
            "Co-Founder and Chief Economist, Market Theory AI",
            "ex-Interpublic Group, ex-Publicis Group, ex-Horizon Media",
            "Former Adjunct Faculty, NYU, Columbia University and ISPP",
        ],
        "image": "https://customer-assets.emergentagent.com/job_logos-11/artifacts/oimw09re_image.png",
        "bio": "Kent Bhupathi is an economist, data science leader and educator with more than 15 years of experience leading applied research and analytics work across marketing sciences, healthcare analytics, supply chain, business intelligence, litigation and professional services. He has worked at the intersection of economics, statistics, machine learning and decision support, helping organisations turn complex analysis into practical business action and return on investment (ROI).",
        "bio2": "He holds a dual degree in Economics and Architecture from the University of Texas at Austin and a Master's in Applied Econometrics from New York University. Across his teaching career, he has led curriculum design and lectured on applied statistics, data science, machine learning, quantitative business methods, data visualisation and technical communication. His prior teaching appointments include New York University (NYU), Columbia University and the Indian School of Public Policy (ISPP).",
        "bio3": "At Epsilon, Kent leads the academic design and teaching of the program with a strong focus on practical rigour. His approach is built around helping working professionals read data more critically, question AI outputs more confidently, and turn technical work into stronger business judgement, clearer communication and more credible decision-making.",
        "tags": ["Economics", "Data Science", "Machine Learning", "Decision Support"],
        "order": 1,
    }
]

GUEST_LECTURERS = [
    {"_id": "philip-wiseman", "slug": "philip-wiseman", "name": "Philip Wiseman", "expertise": "Legal & Compliance", "role": "Vice President of Legal Affairs & Assistant General Counsel, JPMorganChase", "image": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=80", "bio": "Philip Wiseman is a business attorney with experience across banking, private equity, fund formation, securities regulation and cross-border transactions. At JPMorganChase, he advises on securities, corporate and regulatory legal matters tied to investment activity across the Americas, Europe and Asia. Earlier in his career, he worked at Winston & Strawn, Simpson Thacher and Bracewell. He earned his J.D. from the University of California, Berkeley School of Law and his B.A. from the University of Texas at Austin.", "tags": ["Securities Law", "M&A", "Compliance", "Banking"], "order": 1},
    {"_id": "jayprakash-mistry", "slug": "jayprakash-mistry", "name": "Jayprakash Mistry", "expertise": "Capital & AI", "role": "Founder, Remarkables Capital and UnnichedHQ", "image": "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=900&q=80", "bio": "Jayprakash Mistry is an investor, advisor and strategist working across venture capital, private equity, credit and growth strategy. Through Remarkables Capital and UnnichedHQ, he works at the intersection of capital, technology and global systems, with a focus on AI, deeptech, life sciences, fintech and defense-adjacent sectors. He has also held roles at M&G Investments, Credit Suisse, BNY Mellon and Santander. His academic background includes studies at the University of Oxford.", "tags": ["Venture Capital", "AI", "Deeptech", "Cross-Border Strategy"], "order": 2},
    {"_id": "alena-savera", "slug": "alena-savera", "name": "Alena Savera", "expertise": "Development Strategy", "role": "Vice President of Development, The NRP Group", "image": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=80", "bio": "Alena Savera is a real estate development leader based in Dallas-Fort Worth. At The NRP Group, she leads multifamily land acquisition and development across market-rate and PFC projects in the DFW region. Since joining the firm in 2020, she has helped originate multiple projects totaling more than 2,350 units. She holds a Bachelor of Architecture from the University of Texas at Austin.", "tags": ["Real Estate", "Development", "Acquisition", "Planning"], "order": 3},
    {"_id": "mardoqueo-arteaga", "slug": "mardoqueo-arteaga", "name": "Mardoqueo Arteaga", "expertise": "Marketing Science", "role": "Marketing Science Strategist, LinkedIn", "image": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80", "bio": "Mardoqueo Arteaga is an economist working at the intersection of marketing science, technology and applied research. At LinkedIn Marketing Solutions, he builds frameworks to measure B2B advertising effectiveness. Before LinkedIn, he worked at KPMG on economic consulting and at the Central Bank of Chile. He holds a Ph.D. in Economics from Fordham University.", "tags": ["Marketing Science", "Econometrics", "Causal Inference", "B2B Research"], "order": 4},
]

INSIGHTS = [
    {"_id": "evidence-over-enthusiasm", "slug": "evidence-over-enthusiasm", "title": "Evidence Over Enthusiasm: How Executives Should Read AI Reports", "category": "Decision Science", "featured": True, "author": "Kent Oliver Bhupathi", "date": "12 February 2026", "readTime": "7 min read", "image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80", "excerpt": "A practical framework for separating durable AI capability from the sugar-rush of every new model release — and the questions to ask before approving an AI initiative.", "body": ["The headline model benchmarks you read this morning are not a business case.", "A disciplined executive reads an AI report the way a senior analyst reads a research note: with a standing list of questions about method, sample, baseline, and cost of error.", "The framework has three moves. First, isolate the claim from the demonstration. Second, interrogate the evaluation. Third, stress the economics.", "Do this consistently, and you will find your meetings shorter, your approvals rarer, and your initiatives meaningfully more likely to ship."], "order": 1},
    {"_id": "the-executive-prompt", "slug": "the-executive-prompt", "title": "The Executive Prompt: Designing AI Workflows That Actually Ship", "category": "Applied AI", "featured": False, "author": "Rohan Mathur", "date": "04 February 2026", "readTime": "9 min read", "image": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80", "excerpt": "Most LLM workflows fail not because the models are weak, but because the workflow is undisciplined. Here is the discipline.", "body": ["Teams that ship LLM workflows in production look strangely similar.", "We walk through four decisions: the unit of work, the evaluation harness, the human-in-the-loop pattern, and the failure budget."], "order": 2},
    {"_id": "one-page-memo", "slug": "one-page-memo", "title": "The One-Page Memo: How Senior Leaders Translate Models into Decisions", "category": "Executive Communication", "featured": False, "author": "Priya Krishnan", "date": "27 January 2026", "readTime": "6 min read", "image": "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1600&q=80", "excerpt": "A structured method for turning a technical analysis into a single page that moves a board.", "body": ["The one-page memo is the senior leader's sharpest tool.", "We teach a fixed rhythm: context, decision, evidence, risks, recommendation."], "order": 3},
    {"_id": "judgement-not-tools", "slug": "judgement-not-tools", "title": "Judgement, Not Tools: What Executive Education Actually Buys You", "category": "Philosophy", "featured": False, "author": "Dr. Anaya Iyer", "date": "18 January 2026", "readTime": "8 min read", "image": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80", "excerpt": "Tools change every year. Judgement compounds for a career.", "body": ["The half-life of a tool in our industry is shrinking.", "We close with three tests you can run on any executive program before you apply."], "order": 4},
    {"_id": "capstone-portfolio", "slug": "capstone-portfolio", "title": "Why a Capstone Beats a Certificate: Portfolio Outcomes That Travel", "category": "Program Design", "featured": False, "author": "Kent Oliver Bhupathi", "date": "09 January 2026", "readTime": "5 min read", "image": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80", "excerpt": "A certificate signals attendance. A defended capstone signals capability.", "body": ["A defended capstone is the closest thing a working professional has to a public demonstration of judgement."], "order": 5},
]

EVENTS = [
    {"_id": "info-ai-ml-04", "type": "Live Webinar", "title": "Info Session: Applied AI & Machine Learning Cohort 04", "description": "Meet faculty, see the curriculum walk-through, and ask anything about the upcoming Cohort 04 starting 15 March 2026.", "date": "20 February 2026", "time": "6:30 PM IST", "duration": "60 min", "platform": "Zoom", "cta": "Reserve a Seat", "image": "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80", "order": 1},
    {"_id": "open-house-ds", "type": "Live Webinar", "title": "Open House: How We Teach Decision Science", "description": "A working session led by Dr. Anaya Iyer on how we teach disciplined reasoning in our cohorts. Bring questions.", "date": "06 March 2026", "time": "7:00 PM IST", "duration": "75 min", "platform": "Zoom", "cta": "Register", "image": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80", "order": 2},
    {"_id": "alumni-panel", "type": "Panel", "title": "Alumni Panel: One Year After Epsilon", "description": "Hear from three Cohort 02 alumni on what changed in their work after the program — and what they would do differently.", "date": "28 March 2026", "time": "6:00 PM IST", "duration": "90 min", "platform": "Zoom", "cta": "Reserve a Seat", "image": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80", "order": 3},
    {"_id": "memo-workshop", "type": "Hands-On Workshop", "title": "Workshop: Writing the Executive Memo", "description": "A free open workshop with Priya Krishnan on the structure, rhythm, and discipline of the one-page executive memo.", "date": "12 April 2026", "time": "5:00 PM IST", "duration": "2 hrs", "platform": "Zoom", "cta": "Register", "image": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80", "order": 4},
]


async def seed_if_empty(db):
    """Populate DB with initial content if collections are empty."""
    if await db.site_content.count_documents({}) == 0:
        await db.site_content.insert_one(HOME_CONTENT)
    else:
        # Ensure any NEW top-level sections (contact, footer, sections) are present
        # without overwriting admin-edited content.
        existing = await db.site_content.find_one({"_id": "home"}) or {}
        patch = {}
        for key in ("contact", "footer", "sections", "corporate"):
            if key not in existing and key in HOME_CONTENT:
                patch[key] = HOME_CONTENT[key]
        if patch:
            await db.site_content.update_one({"_id": "home"}, {"$set": patch})
    if await db.beliefs.count_documents({}) == 0:
        await db.beliefs.insert_many(BELIEFS)
    if await db.programs.count_documents({}) == 0:
        await db.programs.insert_many(PROGRAMS)
    if await db.cohorts.count_documents({}) == 0:
        await db.cohorts.insert_many(COHORTS)
    if await db.testimonials.count_documents({}) == 0:
        await db.testimonials.insert_many(TESTIMONIALS)
    if await db.lead_faculty.count_documents({}) == 0:
        await db.lead_faculty.insert_many(LEAD_FACULTY)
    if await db.guest_lecturers.count_documents({}) == 0:
        await db.guest_lecturers.insert_many(GUEST_LECTURERS)
    if await db.insights.count_documents({}) == 0:
        await db.insights.insert_many(INSIGHTS)
    if await db.events.count_documents({}) == 0:
        await db.events.insert_many(EVENTS)
