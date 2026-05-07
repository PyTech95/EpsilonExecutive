// Mock data for Epsilon Executive Education

export const programs = [
  {
    slug: 'applied-ai-ml',
    title: 'Professional Certificate in Applied AI & Machine Learning',
    tagline: 'Turning Technical Fluency into Strategic Value',
    subtitle: 'Applied AI & Machine Learning',
    level: 'mid',
    levelLabel: 'Mid Career',
    weeks: 12,
    audience: '5–15 yrs experience',
    fee: '₹1,25,000',
    nextCohort: 'Cohort 04 · 15 March 2026',
    image: '/generated/online-class-male-student.png',
    short: 'Build evidence-based AI capability, from first principles to production judgement.',
    long: 'A twelve-week live online cohort that builds the judgement to lead AI initiatives — reading models critically, designing disciplined workflows, and defending recommendations to the people who decide.',
    outcomes: [
      'Read and critique AI reports like a senior operator',
      'Design LLM workflows that survive production',
      'Defend a capstone project to faculty and senior peers',
      'Build a portfolio artefact that travels with you'
    ],
    curriculum: [
      { week: '01–02', topic: 'Foundations — How models actually work' },
      { week: '03–04', topic: 'Data, evaluation, and the evidence bar' },
      { week: '05–06', topic: 'LLMs, prompting, and disciplined workflows' },
      { week: '07–08', topic: 'Decision science — from model to memo' },
      { week: '09–10', topic: 'Deployment, governance, and failure modes' },
      { week: '11–12', topic: 'Capstone build + faculty defence' }
    ]
  },
  {
    slug: 'strategic-leadership',
    title: 'Advanced Program in Strategic Leadership',
    tagline: 'Lead with Clarity. Decide with Conviction.',
    subtitle: 'Strategic Leadership',
    level: 'senior',
    levelLabel: 'Senior Leadership',
    weeks: 10,
    audience: '10–20 yrs experience',
    fee: '₹1,45,000',
    nextCohort: 'Cohort 03 · 22 April 2026',
    image: '/generated/strategic-leadership.png',
    short: 'Lead with Clarity. Decide with Conviction.',
    long: 'A ten-week program for senior professionals who must set direction under ambiguity — combining decision science, executive communication, and frameworks that survive the boardroom.',
    outcomes: [
      'Translate analysis into boardroom recommendations',
      'Use decision frameworks that scale with ambiguity',
      'Communicate with precision and restraint',
      'Defend strategy with evidence, not enthusiasm'
    ],
    curriculum: [
      { week: '01–02', topic: 'The posture of senior judgement' },
      { week: '03–04', topic: 'Decision frameworks under ambiguity' },
      { week: '05–06', topic: 'Executive communication & the one-page memo' },
      { week: '07–08', topic: 'Strategy, evidence, and the boardroom' },
      { week: '09–10', topic: 'Capstone — a defended strategic memo' }
    ]
  },
  {
    slug: 'finance-non-finance',
    title: 'Finance for Non-Finance Executives',
    tagline: 'Read the Numbers. Lead the Business.',
    subtitle: 'Finance for Non-Finance Executives',
    level: 'mid',
    levelLabel: 'Mid Career',
    weeks: 8,
    audience: '5–12 yrs experience',
    fee: '₹85,000',
    nextCohort: 'Cohort 02 · 10 May 2026',
    image: '/generated/finance-non-finance.png',
    short: 'Read the Numbers. Lead the Business.',
    long: 'An eight-week program that gives non-finance leaders the vocabulary and judgement to read statements, interrogate assumptions, and lead commercial conversations with confidence.',
    outcomes: [
      'Read P&L, balance sheet, and cash flow with fluency',
      'Interrogate business cases and financial models',
      'Translate strategy into unit economics',
      'Speak credibly with CFOs and finance partners'
    ],
    curriculum: [
      { week: '01–02', topic: 'The three statements — as a leader reads them' },
      { week: '03–04', topic: 'Unit economics and the business model' },
      { week: '05–06', topic: 'Valuation, capital, and the investor view' },
      { week: '07–08', topic: 'Capstone — a defended commercial memo' }
    ]
  },
  {
    slug: 'digital-transformation',
    title: 'Program in Digital Transformation',
    tagline: 'From Strategy to Shipped Reality.',
    subtitle: 'Digital Transformation',
    level: 'senior',
    levelLabel: 'Mid to Senior Career',
    weeks: 10,
    audience: '8–18 yrs experience',
    fee: '₹1,20,000',
    nextCohort: 'Cohort 02 · 05 June 2026',
    image: '/generated/digital-transformation.png',
    short: 'From Strategy to Shipped Reality.',
    long: 'A ten-week program that bridges the gap between transformation slideware and shipped change — operating models, technology choice, and the craft of leading delivery.',
    outcomes: [
      'Design a transformation roadmap that survives contact',
      'Make credible technology and vendor choices',
      'Lead delivery through ambiguity and politics',
      'Measure change with evidence, not theatre'
    ],
    curriculum: [
      { week: '01–02', topic: 'What transformation actually is (and isn’t)' },
      { week: '03–04', topic: 'Operating models & the org design question' },
      { week: '05–06', topic: 'Technology, vendors, and build-vs-buy' },
      { week: '07–08', topic: 'Delivery, measurement, and change' },
      { week: '09–10', topic: 'Capstone — a defended transformation plan' }
    ]
  }
];

export const cohorts = [
  { id: 'cohort-04', label: 'Cohort 04', date: '15 March 2026', status: 'applications open' },
  { id: 'cohort-05', label: 'Cohort 05', date: '12 July 2026', status: 'waitlist' },
  { id: 'cohort-06', label: 'Cohort 06', date: '18 October 2026', status: 'coming soon' }
];

export const testimonials = [
  {
    quote: 'It rewired how I evaluate AI proposals at the executive table. I came for the tools — I left with judgement.',
    name: 'Aarav Sharma',
    role: 'VP Strategy · Mumbai-based BFSI',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    quote: 'The capstone is the closest thing I have to a second CV. It has opened doors my degree never did.',
    name: 'Meera Ramaswamy',
    role: 'Director, Product · Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
  },
  {
    quote: 'Faculty who actually ship. Peers who challenge you. Nothing theatrical about it.',
    name: 'Kunal Desai',
    role: 'Head of Data · Delhi NCR',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  }
];

export const leadFaculty = [
  {
    slug: 'kent-oliver-bhupathi',
    name: 'Kent Oliver Bhupathi',
    role: 'Founder and Instructor, Epsilon Executive Education',
    badge: 'Lead Instructor',
    heroHeading: 'Academic Excellence',
    heroBlurb: 'Kent Oliver Bhupathi, Founder and lead instructor, brings a rare blend of ivory-league rigor and modern economic application. With credentials from NYU and Columbia, he is an economist focused on the interface of human judgment and algorithmic efficiency.',
    credentials: [
      { institution: 'NYU', detail: 'Graduate Studies' },
      { institution: 'Columbia', detail: 'Visiting Faculty' }
    ],
    affiliations: [
      'Co-Founder and Chief Economist, Market Theory AI',
      'ex-Interpublic Group, ex-Publicis Group, ex-Horizon Media',
      'Former Adjunct Faculty, NYU, Columbia University and ISPP'
    ],
    image: 'https://customer-assets.emergentagent.com/job_logos-11/artifacts/oimw09re_image.png',
    bio: 'Kent Bhupathi is an economist, data science leader and educator with more than 15 years of experience leading applied research and analytics work across marketing sciences, healthcare analytics, supply chain, business intelligence, litigation and professional services. He has worked at the intersection of economics, statistics, machine learning and decision support, helping organisations turn complex analysis into practical business action and return on investment (ROI).',
    bio2: 'He holds a dual degree in Economics and Architecture from the University of Texas at Austin and a Master\u2019s in Applied Econometrics from New York University. Across his teaching career, he has led curriculum design and lectured on applied statistics, data science, machine learning, quantitative business methods, data visualisation and technical communication. His prior teaching appointments include New York University (NYU), Columbia University and the Indian School of Public Policy (ISPP).',
    tags: ['Economics', 'Data Science', 'Machine Learning', 'Decision Support']
  }
];

export const guestLecturers = [
  {
    slug: 'philip-wiseman',
    name: 'Philip Wiseman',
    expertise: 'Legal & Compliance',
    role: 'Vice President of Legal Affairs & Assistant General Counsel, JPMorganChase',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=80',
    bio: 'Philip Wiseman is a business attorney with experience across banking, private equity, fund formation, securities regulation and cross-border transactions. At JPMorganChase, he advises on securities, corporate and regulatory legal matters tied to investment activity across the Americas, Europe and Asia. Earlier in his career, he worked at Winston & Strawn, Simpson Thacher and Bracewell, where he advised clients on fundraising, compliance, M&A and international investment structures. He earned his J.D. from the University of California, Berkeley School of Law and his B.A. from the University of Texas at Austin.',
    tags: ['Securities Law', 'M&A', 'Compliance', 'Banking']
  },
  {
    slug: 'jayprakash-mistry',
    name: 'Jayprakash Mistry',
    expertise: 'Capital & AI',
    role: 'Founder, Remarkables Capital and UnnichedHQ',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=900&q=80',
    bio: 'Jayprakash Mistry is an investor, advisor and strategist working across venture capital, private equity, credit and growth strategy. Through Remarkables Capital and UnnichedHQ, he works at the intersection of capital, technology and global systems, with a focus on AI, deeptech, life sciences, fintech and defense-adjacent sectors. His experience includes investing, portfolio management, go-to-market strategy and cross-border advisory work across the US, UK and India. He has also held roles at M&G Investments, Credit Suisse, BNY Mellon and Santander. His academic background spans finance, law and technology, including studies at the University of Oxford.',
    tags: ['Venture Capital', 'AI', 'Deeptech', 'Cross-Border Strategy']
  },
  {
    slug: 'alena-savera',
    name: 'Alena Savera',
    expertise: 'Development Strategy',
    role: 'Vice President of Development, The NRP Group',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=80',
    bio: 'Alena Savera is a real estate development leader based in Dallas-Fort Worth. At The NRP Group, she leads multifamily land acquisition and development across market-rate and PFC projects in the DFW region. Since joining the firm in 2020, she has helped originate multiple projects totaling more than 2,350 units and has led work through entitlement and zoning processes. Before NRP, she worked at Perkins&Will and StreetLights Residential, where she supported planning and feasibility work across large multifamily projects. She holds a Bachelor of Architecture from the University of Texas at Austin.',
    tags: ['Real Estate', 'Development', 'Acquisition', 'Planning']
  },
  {
    slug: 'mardoqueo-arteaga',
    name: 'Mardoqueo Arteaga',
    expertise: 'Marketing Science',
    role: 'Marketing Science Strategist, LinkedIn',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80',
    bio: 'Mardoqueo Arteaga is an economist working at the intersection of marketing science, technology and applied research. At LinkedIn Marketing Solutions, he builds frameworks to measure B2B advertising effectiveness and develops research on the broader B2B economy. Before LinkedIn, he worked at KPMG on economic consulting and at the Central Bank of Chile on macro-financial forecasting and monetary policy research. He holds a Ph.D. in Economics from Fordham University, with specialisation in information economics, monetary economics and econometrics. His work brings a strong perspective on causal inference, measurement and business decision-making.',
    tags: ['Marketing Science', 'Econometrics', 'Causal Inference', 'B2B Research']
  }
];

// Combined for backwards-compat (e.g. dropdown menus etc.)
export const faculty = [...leadFaculty, ...guestLecturers];

export const insights = [
  {
    slug: 'evidence-over-enthusiasm',
    title: 'Evidence Over Enthusiasm: How Executives Should Read AI Reports',
    category: 'Decision Science',
    featured: true,
    author: 'Kent Oliver Bhupathi',
    date: '12 February 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80',
    excerpt: 'A practical framework for separating durable AI capability from the sugar-rush of every new model release — and the questions to ask before approving an AI initiative.',
    body: [
      'The headline model benchmarks you read this morning are not a business case. They are, at best, a weak prior on capability — and at worst, a distraction dressed as evidence.',
      'A disciplined executive reads an AI report the way a senior analyst reads a research note: with a standing list of questions about method, sample, baseline, and cost of error. This essay assembles that list.',
      'The framework has three moves. First, isolate the claim from the demonstration. Second, interrogate the evaluation — who wrote the test, and who would lose if the model failed it honestly? Third, stress the economics — not the flashy per-query cost, but the loaded cost of oversight, review, and recovery when the model is wrong in the ways that matter.',
      'Do this consistently, and you will find your meetings shorter, your approvals rarer, and your initiatives meaningfully more likely to ship.'
    ]
  },
  {
    slug: 'the-executive-prompt',
    title: 'The Executive Prompt: Designing AI Workflows That Actually Ship',
    category: 'Applied AI',
    author: 'Rohan Mathur',
    date: '04 February 2026',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80',
    excerpt: 'Most LLM workflows fail not because the models are weak, but because the workflow is undisciplined. Here is the discipline.',
    body: [
      'Teams that ship LLM workflows in production look strangely similar. They share a discipline that has almost nothing to do with the model and almost everything to do with the scaffolding around it.',
      'We walk through four decisions: the unit of work, the evaluation harness, the human-in-the-loop pattern, and the failure budget. Each decision is small. Together they separate a demo from a system.'
    ]
  },
  {
    slug: 'one-page-memo',
    title: 'The One-Page Memo: How Senior Leaders Translate Models into Decisions',
    category: 'Executive Communication',
    author: 'Priya Krishnan',
    date: '27 January 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1600&q=80',
    excerpt: 'A structured method for turning a technical analysis into a single page that moves a board — borrowed from the consulting craft and adapted for AI-era decisions.',
    body: [
      'The one-page memo is the senior leader’s sharpest tool. It forces the writer to decide what matters — and to own the decision in public.',
      'We teach a fixed rhythm: context, decision, evidence, risks, recommendation. Everything else is stripped.'
    ]
  },
  {
    slug: 'judgement-not-tools',
    title: 'Judgement, Not Tools: What Executive Education Actually Buys You',
    category: 'Philosophy',
    author: 'Dr. Anaya Iyer',
    date: '18 January 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
    excerpt: 'Tools change every year. Judgement compounds for a career. Here is why we design every Epsilon program around the latter.',
    body: [
      'The half-life of a tool in our industry is shrinking. The half-life of judgement is not. That asymmetry should shape how you choose where to spend a learning budget.',
      'We close with three tests you can run on any executive program before you apply.'
    ]
  },
  {
    slug: 'capstone-portfolio',
    title: 'Why a Capstone Beats a Certificate: Portfolio Outcomes That Travel',
    category: 'Program Design',
    author: 'Kent Oliver Bhupathi',
    date: '09 January 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80',
    excerpt: 'A certificate signals attendance. A defended capstone signals capability. We dissect what makes a portfolio artefact worth carrying.',
    body: [
      'A defended capstone is the closest thing a working professional has to a public demonstration of judgement. It travels with you in a way that no grade sheet does.'
    ]
  }
];

export const events = [
  {
    id: 'info-ai-ml-04',
    type: 'Live Webinar',
    title: 'Info Session: Applied AI & Machine Learning Cohort 04',
    description: 'Meet faculty, see the curriculum walk-through, and ask anything about the upcoming Cohort 04 starting 15 March 2026.',
    date: '20 February 2026',
    time: '6:30 PM IST',
    duration: '60 min',
    platform: 'Zoom',
    cta: 'Reserve a Seat',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: 'open-house-ds',
    type: 'Live Webinar',
    title: 'Open House: How We Teach Decision Science',
    description: 'A working session led by Dr. Anaya Iyer on how we teach disciplined reasoning in our cohorts. Bring questions.',
    date: '06 March 2026',
    time: '7:00 PM IST',
    duration: '75 min',
    platform: 'Zoom',
    cta: 'Register',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: 'alumni-panel',
    type: 'Panel',
    title: 'Alumni Panel: One Year After Epsilon',
    description: 'Hear from three Cohort 02 alumni on what changed in their work after the program — and what they would do differently.',
    date: '28 March 2026',
    time: '6:00 PM IST',
    duration: '90 min',
    platform: 'Zoom',
    cta: 'Reserve a Seat',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: 'memo-workshop',
    type: 'Hands-On Workshop',
    title: 'Workshop: Writing the Executive Memo',
    description: 'A free open workshop with Priya Krishnan on the structure, rhythm, and discipline of the one-page executive memo.',
    date: '12 April 2026',
    time: '5:00 PM IST',
    duration: '2 hrs',
    platform: 'Zoom',
    cta: 'Register',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80'
  }
];

export const beliefs = [
  { n: '01', title: 'Evidence over enthusiasm', body: 'We teach disciplined reasoning, not the sugar-rush of every new model release.' },
  { n: '02', title: 'Decisions over diagrams', body: 'Every framework we teach must survive contact with a real business decision.' },
  { n: '03', title: 'Craft over content', body: 'Mastery is built by doing the work, with feedback, in front of senior peers.' }
];

export const LOGO_URL = 'https://customer-assets.emergentagent.com/job_logos-11/artifacts/0r3ksglp_EPSILON%20LOGO2.png';
