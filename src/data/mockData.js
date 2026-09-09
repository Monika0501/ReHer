// Realistic, production-ready mock dataset for ReHer Platform

export const INDUSTRY_EVOLUTION_DATA = {
  marketing: {
    title: 'Marketing & Digital Workflow Trends',
    summary: 'The rapid transition to AI-driven productivity workflows (Notion AI, ChatGPT for copywriting, Figma, and Slack workflows).',
    keyChanges: [
      {
        year: '2022 – 2023',
        era: 'Generative AI & Copywriting Tools',
        whatChanged: 'AI tools like ChatGPT and Notion AI became standard for rapid copywriting, content briefs, and ideation, saving 10+ hours per week in drafting.'
      },
      {
        year: '2024 – 2025',
        era: 'Collaborative Cloud Design & Figma Workflows',
        whatChanged: 'Figma and Canva Magic standardisation replaced isolated design handoffs, allowing marketers to directly iterate on social banners and landing page prototypes.'
      },
      {
        year: '2025 – 2026',
        era: 'Asynchronous Slack Workflows & Smart Automations',
        whatChanged: 'Slack workflow canvas bots, automated Jira/Asana status syncing, and Loom video updates reduced synchronous status meetings by 60%.'
      }
    ],
    toolReplacements: [
      { before: 'Manual Copywriting Drafting', now: 'ChatGPT & Notion AI', reason: 'Generates 10+ tailored marketing variants and campaign briefs in seconds' },
      { before: 'Static Design PSD / Email Attachments', now: 'Figma & Canva Magic Studio', reason: 'Real-time collaborative asset iteration and responsive layouts' },
      { before: 'Lengthy Daily Standup Meetings', now: 'Slack Workflows & Loom Video Demos', reason: 'Asynchronous updates that respect flexible working hours' },
      { before: 'Manual Spreadsheet Task Lists', now: 'Asana & Notion Project Management', reason: 'Automated milestone dependency tracking and visual Kanban boards' }
    ],
    buzzwordsDecoded: [
      { term: 'Notion AI & Smart Workspaces', meaning: 'AI-augmented project wikis that summarize meeting notes, generate action items, and maintain live campaign documentation.' },
      { term: 'Prompt Engineering for Copywriting', meaning: 'Crafting precise contextual prompts in ChatGPT/Claude to generate brand-aligned ad copy, email sequences, and blog frameworks.' },
      { term: 'Slack Workflows & Canvas', meaning: 'Automated trigger-based forms and interactive dashboards inside Slack channels for intake requests and approvals.' },
      { term: 'Figma Collaborative Design', meaning: 'Web-based design tool where cross-functional teams brainstorm, review UI mocks, and leave inline visual feedback.' }
    ]
  },

  tech: {
    title: 'Software Engineering & Cloud Architecture',
    summary: 'The shift from manual boilerplate to AI-assisted workflows (Cursor/Copilot), serverless edge computing, and strict TypeScript ecosystems.',
    keyChanges: [
      {
        year: '2022 – 2023',
        era: 'AI Pair Programming Standard',
        whatChanged: 'GitHub Copilot and ChatGPT became baseline developer assistants, increasing scaffolding speed.'
      },
      {
        year: '2024 – 2026',
        era: 'Serverless Edge & Agentic Workflows',
        whatChanged: 'Vite and Next.js 15 App Router replaced legacy Webpack configurations with sub-second reload.'
      }
    ],
    toolReplacements: [
      { before: 'Create-React-App (Webpack)', now: 'Vite / Next.js 15 (Turbopack)', reason: 'Sub-second builds, server components, automated SSR' },
      { before: 'Manual Redux Boilerplate', now: 'Zustand / TanStack Query', reason: 'Zero-boilerplate reactive cache and global state' }
    ],
    buzzwordsDecoded: [
      { term: 'RAG (Retrieval-Augmented Generation)', meaning: 'Connecting LLMs to private documents for grounded, factual AI responses.' },
      { term: 'Async-First Engineering', meaning: 'Documenting decisions in Notion and GitHub so distributed teams stay aligned without live calls.' }
    ]
  },

  hr: {
    title: 'People Operations, HR & Talent Management',
    summary: 'The transformation to AI talent intelligence, continuous pulse sentiment, and flexible hybrid workplace policies.',
    keyChanges: [
      {
        year: '2022 – 2024',
        era: 'AI Talent Intelligence & Skill-Based Hiring',
        whatChanged: 'Modern ATS platforms (Greenhouse, Ashby) evaluate demonstrated skills rather than penalizing career gaps.'
      },
      {
        year: '2025 – 2026',
        era: 'Continuous Feedback & Returnship Culture',
        whatChanged: 'Formalized return-to-work pipelines and parent-friendly ERG policies are standard.'
      }
    ],
    toolReplacements: [
      { before: 'Paper Onboarding & Spreadsheets', now: 'Rippling / BambooHR / Notion People Wiki', reason: '1-click digital compliance and self-serve onboarding' },
      { before: 'Annual Static Performance Reviews', now: 'Lattice / 15Five / Culture Amp', reason: 'Continuous weekly check-ins and pulse sentiment' }
    ],
    buzzwordsDecoded: [
      { term: 'Skill-Based Hiring', meaning: 'Evaluating candidates on demonstrated competencies and transferable leadership rather than linear resumes.' },
      { term: 'Parent ERG', meaning: 'Company-sponsored communities providing return-to-work mentorship and backup childcare advocacy.' }
    ]
  }
};

export const SKILL_GAP_DATABASE = {
  marketing: {
    coreStrengths: [
      { name: 'Financial Planning & Budget Allocation', level: 'Mastery', match: 96, tip: 'Refined through household asset & campaign budgeting' },
      { name: 'Stakeholder Management & Event Operations', level: 'Mastery', match: 95, tip: 'Proven in school PTA & corporate marketing gala leadership' },
      { name: 'Agile Resource Scheduling & Time Management', level: 'Mastery', match: 94, tip: 'Honed through multi-schedule calendar logistics' }
    ],
    quickRefreshers: [
      { name: 'Modern Product Marketing', estHours: '4 Hours', priority: 'Recommended Mini-Course', link: 'GTM Positioning & Messaging Frameworks 2026' },
      { name: 'Generative AI for Content', estHours: '5 Hours', priority: 'Recommended Mini-Course', link: 'ChatGPT & Notion AI Copywriting Sprint' },
      { name: 'Asana Project Management', estHours: '3 Hours', priority: 'Recommended Mini-Course', link: 'Asana Agile Milestone & Workflow Certification' }
    ],
    criticalGaps: [
      { name: 'AI Copywriting & Workflow Tools (Notion AI, ChatGPT)', estHours: '6 Hours', priority: 'Must-Have in 2026', desc: 'Harnessing generative AI tools for multi-variant creative pipelines and automated briefs.' },
      { name: 'Figma Collaborative Marketing Assets', estHours: '5 Hours', priority: 'High Demand', desc: 'Designing responsive social collateral and reviewing visual layouts directly with design teams.' },
      { name: 'Slack Workflows & Async Team Collaboration', estHours: '3 Hours', priority: 'Work Mode Essential', desc: 'Building automated channel notifications and asynchronous project check-ins.' }
    ]
  },
  tech: {
    coreStrengths: [
      { name: 'JavaScript & Web Fundamentals', level: 'Mastery', match: 96, tip: 'Highlight in core resume header' },
      { name: 'Database Design & Relational SQL', level: 'Mastery', match: 92, tip: 'Strong foundational asset' }
    ],
    quickRefreshers: [
      { name: 'TypeScript Advanced Types & Generics', estHours: '6 Hours', priority: 'Recommended Mini-Course', link: 'TypeScript Handbook 2026' },
      { name: 'Asana & Jira Project Management', estHours: '4 Hours', priority: 'Recommended Mini-Course', link: 'Agile Sprint Coordination' }
    ],
    criticalGaps: [
      { name: 'AI Developer Tooling (Cursor, Copilot, LangChain)', estHours: '10 Hours', priority: 'Must-Have in 2026', desc: 'Modern engineering workflows with AI pair programming.' }
    ]
  },
  hr: {
    coreStrengths: [
      { name: 'Employee Relations & Conflict Resolution', level: 'Mastery', match: 97, tip: 'Sharpened through caregiving & community leadership' }
    ],
    quickRefreshers: [
      { name: 'Modern HRIS (Rippling / BambooHR)', estHours: '5 Hours', priority: 'Recommended Mini-Course', link: 'Rippling Certified Training' }
    ],
    criticalGaps: [
      { name: 'AI Talent Intelligence (Ashby / Greenhouse AI)', estHours: '8 Hours', priority: 'Must-Have in 2026', desc: 'AI-assisted resume screening and de-biased candidate sourcing.' }
    ]
  }
};

// Exact 3-Step Comeback Roadmap requested by user
export const COMEBACK_ROADMAP_STEPS = [
  {
    id: 1,
    week: 'Step 1 (Week 1 – 2)',
    phase: 'Orientation & Tool Mastery',
    title: 'Complete AI Tools Refresher',
    status: 'Completed',
    statusBadge: 'completed',
    description: 'Mastered modern AI workflow tools (Notion AI, ChatGPT for copywriting, Figma, and Slack workflows).',
    tasks: [
      { id: '1a', text: 'Complete Notion AI & ChatGPT copywriting workflow sprint', done: true },
      { id: '1b', text: 'Configure modern workspace & Slack async notification rules', done: true },
      { id: '1c', text: 'Review Figma marketing templates and collaborative asset sharing', done: true }
    ],
    resource: 'Industry Shifts Guide & AI Workflow Cheat-Sheet',
    estTime: 'Completed'
  },
  {
    id: 2,
    week: 'Step 2 (Week 3 – 4)',
    phase: 'Portfolio & Branding',
    title: 'Update Portfolio & Pitch Deck',
    status: 'In Progress',
    statusBadge: 'in-progress',
    description: 'Structure 3.5-year sabbatical achievements into professional case studies and polish live ATS resume.',
    tasks: [
      { id: '2a', text: 'Reframe household budgeting and PTA event leadership into quantified bullet points', done: true },
      { id: '2b', text: 'Build a modern 1-page digital portfolio deck with sample AI campaign briefs', done: false },
      { id: '2c', text: 'Export ATS-compliant resume with work mode preference and target toolchain', done: false }
    ],
    resource: 'ReHer Comeback Story Pitch Generator & Resume Builder',
    estTime: 'In Progress (4 hrs left)'
  },
  {
    id: 3,
    week: 'Step 3 (Week 5 – 6)',
    phase: 'Interview & Application',
    title: 'Mock Interview Prep',
    status: 'Pending',
    statusBadge: 'pending',
    description: 'Practice high-stakes mock interview questions on the career gap and submit tailored returnship applications.',
    tasks: [
      { id: '3a', text: 'Practice 3-year gap explanation with AI Coach and achieve 90%+ rubric score', done: false },
      { id: '3b', text: 'Drill remote asynchronous communication and boundary management questions', done: false },
      { id: '3c', text: 'Submit 3 customized Returnship applications with ReHer Tailored Pitch Notes', done: false }
    ],
    resource: 'AI Mock Interview Coach & Returnship Matcher',
    estTime: 'Pending (Starts next week)'
  }
];

// Interactive mock interview questions & model answers matching user requirements
export const MOCK_INTERVIEW_QUESTIONS = [
  {
    id: 'q1',
    category: 'Explaining Career Gap',
    workModeTag: 'all',
    difficulty: 'Core Question',
    question: 'How do you account for the 3-year gap on your resume?',
    context: 'The interviewer wants to see you address the gap with dignity, highlighting continuous learning, community projects, and renewed career focus.',
    sampleIdealAnswer: "I took an intentional 3.5-year career break to focus on family caregiving and lead community initiatives. During this period, I operated with high organizational rigor—managing $45k event budgets, coordinating cross-functional volunteer committees, and actively upskilling in modern digital tools like Notion AI and ChatGPT. Having established a solid support structure at home, I am returning to the workforce with refreshed skills, enhanced emotional intelligence, and 100% dedicated focus to drive impact in this role.",
    rubricPoints: [
      'Active upskilling and continuous learning in modern tools',
      'Community project coordination, budgeting, and stakeholder leadership',
      'Renewed, unapologetic focus and immediate value proposition'
    ]
  },
  {
    id: 'q2',
    category: 'Remote Work & Household Responsibilities',
    workModeTag: 'remote',
    difficulty: 'Work Mode Essential',
    question: 'How do you manage remote collaboration alongside household responsibilities?',
    context: 'Assesses your ability to set dedicated focus blocks, maintain boundaries, and leverage async tools like Slack and Loom.',
    sampleIdealAnswer: "I manage remote collaboration through structured time-blocking and asynchronous discipline. I operate from a dedicated quiet workspace during established focus hours and rely on async-first communication tools like Slack and Loom to keep cross-functional teammates updated without constant meetings. With reliable childcare systems in place, I maintain clear boundaries that enable uninterrupted deep work and dependable sprint delivery.",
    rubricPoints: [
      'Setting dedicated focus blocks and quiet workspace discipline',
      'Leveraging asynchronous communication tools like Slack and Loom',
      'Clear boundaries and reliable family support structures'
    ]
  },
  {
    id: 'q3',
    category: 'Technology & AI Tooling',
    workModeTag: 'all',
    difficulty: 'Modern Tooling',
    question: 'How have you adapted to modern AI tools like Notion AI, ChatGPT, and Figma for marketing workflows?',
    context: 'Evaluates your practical familiarity with modern generative AI and collaborative design tools.',
    sampleIdealAnswer: "Over the past 8 months, I have deeply integrated tools like ChatGPT and Notion AI into my daily workflow for rapid content ideation, audience research, and automated brief generation. I also use Figma and Canva Magic to directly collaborate with design teams on responsive assets, and Slack canvas workflows for asynchronous updates. These modern tools allow me to deliver marketing campaigns with twice the speed and precision.",
    rubricPoints: [
      'Concrete hands-on application of ChatGPT and Notion AI',
      'Cross-functional asset collaboration in Figma',
      'Focus on double delivery velocity and workflow automation'
    ]
  },
  {
    id: 'q4',
    category: 'Crisis & Stakeholder Leadership',
    workModeTag: 'all',
    difficulty: 'Behavioral Leadership',
    question: 'Tell me about a time you handled competing high-stakes priorities under pressure during your break.',
    context: 'Translates parenting/volunteer crisis management into workplace composure and multi-stakeholder execution.',
    sampleIdealAnswer: "While serving as the event lead for a 450-member school gala, our primary venue cancelled 72 hours before the event, putting $45k in fundraising at risk. I organized our 35-person committee into rapid response pods, negotiated an emergency contract with a partner facility, and communicated updates via Slack and digital channels within 4 hours. We executed the event on schedule and exceeded our goal by 18%. This experience honed my calm composure, risk mitigation, and agile leadership under pressure.",
    rubricPoints: [
      'Structured STAR delivery with quantified results',
      'Multi-stakeholder team pod delegation and contract negotiation',
      'Calm composure under ambiguous emergency conditions'
    ]
  }
];

export const CONFIDENCE_COACH_DATA = {
  dailyAffirmations: [
    {
      id: 1,
      quote: "Your caregiving break built high-stress emotional intelligence and adaptability—traits top managers value most.",
      author: "Confidence Booster Tip of the Day"
    },
    {
      id: 2,
      quote: "Experience does not expire. My foundational marketing expertise is rock-solid, and I master modern AI tools faster than ever.",
      author: "Daily Returner Anchor"
    },
    {
      id: 3,
      quote: "I am not starting from scratch; I am starting from years of proven resilience, maturity, and perspective.",
      author: "Leadership Anchor"
    }
  ],
  imposterBusters: [
    {
      doubt: "I’ve been out of the workforce for 3.5 years; employers will think I lost my touch.",
      reframe: "You managed household budgets, directed community gala operations, and mastered modern AI tools. You bring seasoned maturity and 2026 tech fluency."
    },
    {
      doubt: "I feel guilty asking for flexible hours or remote focus blocks.",
      reframe: "Flexibility and high output are proven partners. Setting structured async boundaries shows senior operational leadership."
    },
    {
      doubt: "What if I get asked about a tool I haven't used yet?",
      reframe: "Anchor on your core domain instincts and say: 'I haven't used that specific tool yet, but I ramp up on new software in days, as demonstrated by my mastery of Notion AI and ChatGPT.'"
    }
  ],
  negotiationTips: [
    {
      title: "Never Accept the 'Gap Discount'",
      tip: "Your years of pre-break experience do not depreciate. Benchmark your compensation against current market rates for your total years of experience, not your pre-break salary."
    },
    {
      title: "Anchor on Return-on-Investment",
      tip: "Frame your compensation around the business impact and cross-functional leadership you will deliver, rather than treating the offer as a 'favor'."
    },
    {
      title: "Get Work Mode & Core Hours Written in Offer",
      tip: "Ensure remote stipends, hybrid in-office day expectations, and core working hours (e.g. 10am-3pm) are documented formally in your returnship agreement."
    }
  ]
};

// Exact 6 Realistic Returnship Job Cards requested by user
export const RETURNSHIP_JOB_LISTINGS = [
  {
    id: 'ret-1',
    company: 'TechFlow Inc.',
    logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=100',
    title: 'Returnship - Project Operations Lead',
    field: 'operations',
    workMode: 'remote',
    workModeTitle: 'Fully Remote',
    location: '100% Remote / Pan-India',
    commuteInfo: '🚗 0 min commute (Home Office Setup)',
    hourFlexibility: '⏱️ 30 hrs/wk (Flexible Core Hours)',
    type: '16-Week Returnship Program',
    stipend: '₹70,000 / month stipend',
    salaryRange: '₹8,00,000 - ₹11,00,000 / yr',
    matchScore: 96,
    matchedSkills: ['Agile Resource Scheduling', 'Budget Allocation', 'Notion Workflows', 'Slack'],
    gapToRefresh: ['Asana Project Management'],
    cultureTags: ['Parent ERG', 'Dedicated Mentor', 'Gradual Ramp-Up (30-60-90)', 'Flexible Hours'],
    description: 'TechFlow Inc. is offering a supported 30 hr/wk remote returnship for experienced professionals to lead operational planning, cross-functional sprints, and milestone delivery.',
    hiringManager: 'Ananya Deshmukh, VP of Operations'
  },
  {
    id: 'ret-2',
    company: 'GrowthScale',
    logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=100',
    title: 'Marketing Content Specialist',
    field: 'marketing',
    workMode: 'hybrid',
    workModeTitle: 'Hybrid (2 days/wk)',
    location: 'Bangalore / Hybrid',
    commuteInfo: '📍 Outer Ring Road Hub (20 min commute)',
    hourFlexibility: '⏱️ 40 hrs/wk (Tue/Thu in office)',
    type: '20-Week Returnship Track',
    stipend: '₹60,000 / month stipend',
    salaryRange: '₹6,50,000 - ₹9,00,000 / yr',
    matchScore: 95,
    matchedSkills: ['Copywriting', 'Notion AI', 'ChatGPT for Content', 'Figma Basics'],
    gapToRefresh: ['Modern Product Marketing'],
    cultureTags: ['Hybrid Flex', 'Parent Support Network', 'Executive Mentorship', 'Flexible Hours'],
    description: 'Join GrowthScale’s marketing team to orchestrate multi-channel campaign copy, email funnels, and AI-driven content operations with structured hybrid flexibility.',
    hiringManager: 'Rohan Mehta, Head of Brand Marketing'
  },
  {
    id: 'ret-3',
    company: 'PeopleFirst',
    logo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100',
    title: 'HR & Onboarding Coordinator',
    field: 'hr',
    workMode: 'remote',
    workModeTitle: 'Fully Remote',
    location: '100% Remote',
    commuteInfo: '🚗 0 min commute (Home Office)',
    hourFlexibility: '⏱️ Flexible Hours (Parent-Friendly Cadence)',
    type: '14-Week Return-to-Work Program',
    stipend: '₹50,000 / month stipend',
    salaryRange: '₹5,50,000 - ₹7,50,000 / yr',
    matchScore: 93,
    matchedSkills: ['Stakeholder Management', 'Event Operations', 'Conflict Resolution', 'People Wikis'],
    gapToRefresh: ['Modern HRIS Tools'],
    cultureTags: ['100% Remote', 'Parent ERG', 'Output Over Hours', 'Flexible Hours'],
    description: 'PeopleFirst invites returning professionals to coordinate seamless digital onboarding experiences, employee engagement rituals, and flexible HR operations.',
    hiringManager: 'Kavita Menon, Director of People Operations'
  },
  {
    id: 'ret-4',
    company: 'Innovate Labs',
    logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=100',
    title: 'Agile Scrum Support',
    field: 'tech',
    workMode: 'hybrid',
    workModeTitle: 'Hybrid (1 day/wk)',
    location: 'Hyderabad / Hybrid',
    commuteInfo: '🚇 Metro Accessible (15 min transit)',
    hourFlexibility: '⏱️ 35 hrs/wk (1 Day in-office sprint)',
    type: '16-Week Returnship with Offer Track',
    stipend: '₹80,000 / month stipend',
    salaryRange: '₹9,00,000 - ₹12,00,000 / yr',
    matchScore: 94,
    matchedSkills: ['Agile Resource Scheduling', 'Time Management', 'Slack Workflows', 'Jira'],
    gapToRefresh: ['Asana Project Management'],
    cultureTags: ['Hybrid Flex Days', 'Dedicated Coach', 'Childcare Support', 'Flexible Hours'],
    description: 'Facilitate agile sprint planning, daily standup coordination, and cross-functional team blockers with 1 day of in-person collaboration per week.',
    hiringManager: 'Vikram Seth, Lead Agile Coach'
  },
  {
    id: 'ret-5',
    company: 'CloudServ',
    logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&q=80&w=100',
    title: 'Customer Success Returnship',
    field: 'operations',
    workMode: 'remote',
    workModeTitle: 'Fully Remote',
    location: '100% Remote',
    commuteInfo: '🚗 0 min commute',
    hourFlexibility: '⏱️ 25 hrs/wk (Part-Time Morning Shift)',
    type: '12-Week Returnship Track',
    stipend: '₹45,000 / month stipend',
    salaryRange: '₹5,00,000 - ₹7,00,000 / yr',
    matchScore: 92,
    matchedSkills: ['Conflict Resolution', 'Stakeholder Communication', 'Notion', 'Slack'],
    gapToRefresh: ['Modern CRM Workflows'],
    cultureTags: ['Part-Time Flex', 'Gradual Ramp-Up', 'Mentorship Cohort', 'Flexible Hours'],
    description: 'Manage enterprise client onboarding inquiries, relationship nurturing, and account satisfaction on a flexible 25 hour weekly schedule.',
    hiringManager: 'Sneha Roy, VP of Customer Experience'
  },
  {
    id: 'ret-6',
    company: 'Metro Hub',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=100',
    title: 'Community & Events Manager',
    field: 'marketing',
    workMode: 'onsite',
    workModeTitle: 'Onsite',
    location: 'Delhi NCR (Downtown Campus)',
    commuteInfo: '🚇 Metro Station Adjacent (25 min radius)',
    hourFlexibility: '⏱️ 40 hrs/wk (Core Event Hours)',
    type: '16-Week Exploratory Program',
    stipend: '₹65,000 / month stipend',
    salaryRange: '₹7,00,000 - ₹9,50,000 / yr',
    matchScore: 94,
    matchedSkills: ['Event Operations', 'Cross-Functional Leadership', 'Budget Allocation', 'Vendor Management'],
    gapToRefresh: ['Figma Event Asset Prep'],
    cultureTags: ['On-Site Leadership', 'Event Stipend', 'Executive Network', 'Flexible Hours'],
    description: 'Lead physical and hybrid corporate summit experiences, vendor negotiations, and multi-stakeholder event lifecycles on-campus.',
    hiringManager: 'Aditya Kapoor, Managing Director'
  }
];
