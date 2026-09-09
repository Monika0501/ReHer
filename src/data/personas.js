export const PERSONAS = [
  {
    id: 'priya',
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    title: 'Senior Marketing Coordinator → Marketing & Project Operations Lead',
    field: 'marketing',
    industryName: 'Marketing & Project Operations',
    yearsExp: '5.5 Years Prior Experience',
    breakDuration: '3.5 Years',
    breakYears: { start: '2022', end: '2026' },
    breakReason: 'Family caregiving, PTA event leadership & digital marketing upskilling',
    targetRole: 'Marketing & Project Operations Lead',
    preferredWorkMode: 'remote',
    workModeLabel: 'Fully Remote (Work from Home)',
    commutePreference: '0 min (Home Office Setup)',
    weeklyHours: '30-35 hrs/wk (Flexible Core Hours)',
    location: 'Bangalore / Remote',
    email: 'priya.sharma.reher@example.com',
    phone: '+91 98765 43210',
    linkedin: 'linkedin.com/in/priyasharma-mktg',
    github: 'portfolio.me/priya-sharma',
    bio: 'Experienced Senior Marketing Coordinator with 5.5+ years leading multi-channel campaigns. Returning after an intentional 3.5-year career break equipped with modern AI tools, Notion workflows, and agile project coordination.',
    pastExperience: [
      {
        company: 'Apex Brand Media',
        role: 'Senior Marketing Coordinator',
        period: '2017 – 2022',
        description: 'Led cross-channel digital marketing campaigns, managed $350K annual ad budgets, and coordinated creative deliverables with 12 cross-functional stakeholders.'
      },
      {
        company: 'Vanguard Digital Solutions',
        role: 'Marketing Associate',
        period: '2015 – 2017',
        description: 'Managed content calendars, coordinated email marketing workflows, and analyzed campaign ROI metrics.'
      }
    ],
    education: {
      degree: 'B.A. in Communications & Marketing',
      school: 'Delhi University',
      year: '2015'
    },
    careBreakActivities: [
      'Household Budget & Expense Management',
      'School PTA Event Lead',
      'Managing Multi-Child Schedules',
      'Self-directed upskilling in AI-driven workflows (Notion AI, ChatGPT for copywriting, Figma, Slack workflows)'
    ],
    translatedBullets: [
      'Financial Planning, Budget Allocation & Cost Optimization: Administered comprehensive household asset allocation and vendor procurement, reducing recurring operational costs by 18%.',
      'Stakeholder Management, Event Operations & Cross-Functional Leadership: Spearheaded school PTA gala committee of 35 volunteers, directing end-to-end event logistics and raising $45k in sponsorships.',
      'Agile Resource Scheduling, Time Management & Conflict Resolution: Orchestrated complex multi-child calendars and emergency contingencies with zero downtime using agile planning principles.',
      'Mastered modern AI workflow tools (Notion AI, ChatGPT content workflows, Slack async collaboration, Figma) to accelerate project execution velocity.'
    ],
    comebackStory: {
      inspiring: "Leveraged a 3.5-year career break to lead community initiatives, hone organizational systems, and upskill in digital tools while maintaining a keen pulse on marketing trends. Combining 5.5 years of corporate campaign coordination with enriched emotional intelligence and contemporary AI workflow proficiency, I am excited to drive high-impact results in this returnship.",
      direct: "Experienced Senior Marketing Coordinator returning after an intentional 3.5-year sabbatical. Refreshed with modern AI toolchains (ChatGPT, Notion AI, Figma, Slack workflows) and proven skills in financial budgeting, agile scheduling, and cross-functional event operations.",
      analytical: "Results-driven marketing and operations professional with 5.5 years of corporate experience managing $350K budgets, paired with 3.5 years of non-profit community governance and modern AI-augmented content operations."
    }
  },
  {
    id: 'elena',
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    title: 'Brand Marketing Lead → Growth & Product Marketing Director',
    field: 'marketing',
    industryName: 'Growth Marketing & GTM',
    yearsExp: '7 Years Prior Experience',
    breakDuration: '5-Year Break (2020 – 2025)',
    breakYears: { start: '2020', end: '2025' },
    breakReason: 'Family relocation & caregiving, Non-Profit School Board President',
    targetRole: 'Director of Growth Marketing / Product Marketing Lead',
    preferredWorkMode: 'hybrid',
    workModeLabel: 'Hybrid (1-3 Days In-Office)',
    commutePreference: '15-30 min commute radius',
    weeklyHours: '40 hrs/wk (Hybrid Flex Schedule)',
    location: 'Mumbai / Remote',
    email: 'elena.rostova.reher@example.com',
    phone: '+91 98111 22334',
    linkedin: 'linkedin.com/in/elena-rostova-growth',
    github: 'portfolio.me/elena-marketing',
    bio: 'Strategic marketing leader with 7 years driving multi-channel consumer acquisition and brand equity. Returning after a 5-year break with sharpened organizational leadership and contemporary expertise in AI-augmented content ops.',
    pastExperience: [
      {
        company: 'Lumina Consumer Brands',
        role: 'Senior Brand Marketing Manager',
        period: '2014 – 2020',
        description: 'Led 360-degree GTM product launches generating $8.5M incremental revenue. Managed $1.8M paid media budget.'
      }
    ],
    education: {
      degree: 'B.A. in Communications & Business Marketing',
      school: 'University of Texas at Austin',
      year: '2012'
    },
    careBreakActivities: [
      'President of District PTA & Non-Profit Endowment Board',
      'Orchestrated multi-state family cross-country relocation and renovation logistics',
      'Upskilling in AI copy generation, HubSpot Automation, and Product-Led Growth (PLG)'
    ],
    translatedBullets: [
      'Financial Planning & Budget Allocation: Managed $95k non-profit operating budget and increased community engagement by 180%.',
      'Stakeholder Management & Cross-Functional Leadership: Directed gala campaigns raising $62k (+28% over target).',
      'Agile Resource Scheduling: Negotiated 15+ vendor contracts cutting overhead by 22%.'
    ],
    comebackStory: {
      inspiring: "Leveraged a 5-year career break to lead non-profit governance and master contemporary generative AI toolchains. Ready for strategic growth marketing leadership.",
      direct: "Strategic Marketing Leader with 7 years of corporate brand leadership and 5 years of board governance.",
      analytical: "ROI-driven marketing strategist with verified track record of managing multi-million dollar budgets."
    }
  }
];

export const WORK_MODES = [
  {
    id: 'remote',
    label: 'Fully Remote',
    subLabel: 'Work from Home (100% Remote)',
    icon: '🏠',
    badgeClass: 'badge-indigo',
    description: 'Autonomous asynchronous delivery, home office setup, no commute.',
    toolHighlight: 'Slack, Notion AI, ChatGPT, Figma, Loom, Asana'
  },
  {
    id: 'hybrid',
    label: 'Hybrid',
    subLabel: '1-3 Days In-Office / Rest Remote',
    icon: '🏢',
    badgeClass: 'badge-rose',
    description: 'Blended in-person collaborative sprints with remote deep-focus days.',
    toolHighlight: 'In-Person Workshops, Whiteboard Design, Slack, Zoom'
  },
  {
    id: 'onsite',
    label: 'Onsite',
    subLabel: 'Full On-Campus Presence',
    icon: '🏛️',
    badgeClass: 'badge-amber',
    description: 'Direct face-to-face team immersion, physical whiteboard coordination.',
    toolHighlight: 'Executive On-Site Leadership, Real-Time Collaboration'
  },
  {
    id: 'flexible',
    label: 'Flexible Hours / Part-time',
    subLabel: '20-30 hrs / Custom Schedule',
    icon: '⏱️',
    badgeClass: 'badge-emerald',
    description: 'Output-based deliverables tailored around childcare & family routines.',
    toolHighlight: 'Time-Boxed Milestones, Asynchronous Status Dashboards'
  }
];
