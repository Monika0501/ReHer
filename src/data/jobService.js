// src/data/jobService.js
// ReHer Returnship & Live Job Database Service

export const REHER_JOBS_DATABASE = [
  {
    id: 'job-1',
    title: 'Software Engineer (Returnship Program)',
    company: 'Path Forward / Tech Partners',
    location: 'Remote (US/Canada)',
    type: 'Remote',
    category: 'Returnship',
    tags: ['React', 'Node.js', 'Mentorship', 'Flexible Hours'],
    description: 'A structured paid returnship designed for professionals returning to tech after a 1+ year career break. Includes dedicated onboarding and peer mentorship.',
    applyUrl: 'https://pathforward.org/returnships/',
    posted: 'Active Program',
    workMode: 'remote',
    workModeTitle: 'Fully Remote',
    stipend: '$85,000 - $110,000 / yr (Paid Returnship)',
    salaryRange: '$85,000 - $110,000 / yr',
    matchScore: 98,
    commuteInfo: '🚗 0 min (Home Office Setup)',
    hourFlexibility: '⏱️ 30-35 hrs/wk (Flexible Core Hours)',
    matchedSkills: ['React', 'Node.js', 'Mentorship', 'Flexible Hours'],
    gapToRefresh: ['Cloud Native Architecture & CI/CD'],
    cultureTags: ['Peer Mentorship', 'Paid Returnship', 'Gradual Ramp-Up (30-60-90)', 'Parent Friendly'],
    hiringManager: 'Path Forward Cohort Lead',
    logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 'job-2',
    title: 'Salesforce Return to Work Program',
    company: 'Salesforce',
    location: 'Hybrid / Remote',
    type: 'Full-Time Flex',
    category: 'Returnship',
    tags: ['Salesforce', 'Tech & Product', 'Customer Success', 'Mentorship'],
    description: '6-month on-the-job training program providing resources, tailored mentorship, and real business impact for women restarting their professional journey.',
    applyUrl: 'https://www.salesforce.com/company/careers/talent-programs/india-return-work/',
    posted: 'Active Cohort',
    workMode: 'hybrid',
    workModeTitle: 'Hybrid (Flex)',
    stipend: '$90,000 - $125,000 / yr (6-Month Paid Program)',
    salaryRange: '$90,000 - $125,000 / yr',
    matchScore: 96,
    commuteInfo: '📍 Salesforce Tower / Hub (1-2 days/wk)',
    hourFlexibility: '⏱️ 35-40 hrs/wk (Flexible Core Hours)',
    matchedSkills: ['Salesforce', 'Tech & Product', 'Customer Success', 'Mentorship'],
    gapToRefresh: ['Modern SaaS & Cloud Tools'],
    cultureTags: ['6-Month Paid Training', 'Tailored Mentorship', 'Women Returner Cohort', 'High Impact'],
    hiringManager: 'Salesforce Talent Programs Team',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 'job-3',
    title: 'Amazon Rekindle Program',
    company: 'Amazon',
    location: 'Remote & Onsite Options',
    type: 'Full-Time',
    category: 'Returnship',
    tags: ['Software Development', 'Marketing', 'Operations', 'Flexible Shift'],
    description: 'An initiative to encourage women on a professional break to resume their corporate careers with structured onboarding, mentorship, and on-the-job learning.',
    applyUrl: 'https://www.irelaunch.com/returnships',
    posted: 'Featured Partner',
    workMode: 'remote',
    workModeTitle: 'Remote / Flexible',
    stipend: '$95,000 - $130,000 / yr',
    salaryRange: '$95,000 - $130,000 / yr',
    matchScore: 97,
    commuteInfo: '🚗 0 min (Remote or Local Tech Hub)',
    hourFlexibility: '⏱️ Flexible Shift & Ramp-Up Cadence',
    matchedSkills: ['Software Development', 'Marketing', 'Operations', 'Flexible Shift'],
    gapToRefresh: ['Generative AI Developer Tools'],
    cultureTags: ['Structured Onboarding', 'Executive Sponsor', 'Women in Tech Network', 'Career Relaunch'],
    hiringManager: 'Amazon Rekindle Leadership Team',
    logo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 'job-4',
    title: 'Persistent Systems Women Returnship',
    company: 'Persistent Systems',
    location: 'Remote / Flexible',
    type: 'Part-Time / Full-Time',
    category: 'Gradual Ramp-Up',
    tags: ['Software Engineering', 'Data Analysis', 'Self-Paced Training'],
    description: 'Structured, self-paced, and flexible training plan and mentorship to ease the transition back into professional tech and business roles.',
    applyUrl: 'https://www.persistent.com/careers/women-returnship-program/',
    posted: 'Newly Updated',
    workMode: 'remote',
    workModeTitle: 'Fully Remote',
    stipend: '$75,000 - $105,000 / yr (Flexible)',
    salaryRange: '$75,000 - $105,000 / yr',
    matchScore: 95,
    commuteInfo: '🚗 0 min (Home Office Setup)',
    hourFlexibility: '⏱️ Self-Paced Part-Time or Full-Time Flex',
    matchedSkills: ['Software Engineering', 'Data Analysis', 'Self-Paced Training'],
    gapToRefresh: ['Data Pipelines & Modern BI'],
    cultureTags: ['Self-Paced Training', 'Gradual Ramp-Up', '1-on-1 Mentorship', 'Flexible Pace'],
    hiringManager: 'Persistent Inclusion & Talent Lead',
    logo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 'job-5',
    title: 'iRelaunch Global Returnship Directory',
    company: 'iRelaunch Employer Network',
    location: 'Global / Remote',
    type: 'Remote',
    category: 'Returnship',
    tags: ['Multi-Industry', 'Finance', 'Tech', 'Healthcare'],
    description: 'Direct directory connecting relaunchers with top employers actively offering career returner programs.',
    applyUrl: 'https://www.irelaunch.com/returnships',
    posted: 'Ongoing',
    workMode: 'remote',
    workModeTitle: 'Global Remote',
    stipend: '$80,000 - $140,000 / yr',
    salaryRange: '$80,000 - $140,000 / yr',
    matchScore: 99,
    commuteInfo: '🚗 0 min (Global Remote / Multi-Hub)',
    hourFlexibility: '⏱️ Flexible Programs across 100+ Employers',
    matchedSkills: ['Multi-Industry', 'Finance', 'Tech', 'Healthcare'],
    gapToRefresh: ['Modern Resume & Interview Mastery'],
    cultureTags: ['Global Returner Network', 'Verified Returnships', 'Multi-Track Mentorship', 'Top 100 Employers'],
    hiringManager: 'iRelaunch Global Employer Network',
    logo: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&q=80&w=100'
  }
];

// Fallback alias for backward compatibility
export const FALLBACK_JOBS = REHER_JOBS_DATABASE;

/**
 * Utility function to strip HTML tags and decode common HTML entities
 */
export function cleanHtmlDescription(htmlString) {
  if (!htmlString) return '';
  let cleaned = htmlString.replace(/<[^>]*>?/gm, ' ');
  cleaned = cleaned
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#x26;/g, '&')
    .replace(/&#x27;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
  return cleaned;
}

/**
 * Live Job & Returnship Search
 * Returns distinct filtered list based on title, company, description, type, category, or tags
 */
export async function fetchPublicJobs(keyword = '') {
  const query = (keyword || '').toLowerCase().trim();
  
  if (!query || query === 'all' || query === 'returnship') {
    return REHER_JOBS_DATABASE;
  }

  return REHER_JOBS_DATABASE.filter(job => {
    const matchesTitle = job.title?.toLowerCase().includes(query);
    const matchesCompany = job.company?.toLowerCase().includes(query);
    const matchesDesc = job.description?.toLowerCase().includes(query);
    const matchesType = job.type?.toLowerCase().includes(query);
    const matchesCategory = job.category?.toLowerCase().includes(query);
    const matchesTags = Array.isArray(job.tags) && job.tags.some(t => t.toLowerCase().includes(query));
    
    return matchesTitle || matchesCompany || matchesDesc || matchesType || matchesCategory || matchesTags;
  });
}
