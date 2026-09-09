// src/components/Tab4DashboardMatches.jsx
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Sparkles, 
  Flame, 
  Award, 
  CheckCircle2, 
  Filter, 
  Building2, 
  MapPin, 
  DollarSign, 
  Send, 
  ExternalLink, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  Heart,
  Bookmark,
  ChevronRight,
  TrendingUp,
  Home,
  Building,
  SlidersHorizontal,
  Laptop,
  Check,
  Search,
  Loader2,
  RefreshCw,
  Globe,
  Tag
} from 'lucide-react';
import { fetchPublicJobs } from '../data/jobService';
import { WORK_MODES } from '../data/personas';

/**
 * Helper function to calculate dynamic candidate match score
 * Compares job tags against user skills and scales to a compelling 75%-98% range
 */
export function calculateMatchScore(jobTags = [], userSkills = []) {
  const defaultSkills = [
    'React', 'Node.js', 'Web Development', 'JavaScript', 
    'Python', 'Marketing', 'Salesforce', 'Software Engineering', 
    'Operations', 'Finance', 'UI/UX', 'Design', 'Agile', 'Product Management'
  ];
  
  const candidateSkills = (Array.isArray(userSkills) && userSkills.length > 0)
    ? userSkills
    : defaultSkills;

  const validTags = Array.isArray(jobTags) ? jobTags : [];
  if (validTags.length === 0) return 92;

  // Count overlapping/matching tags (case-insensitive substring or exact match)
  const matchingCount = validTags.filter((tag) => {
    const cleanTag = tag.toLowerCase().trim();
    return candidateSkills.some((skill) => {
      const cleanSkill = skill.toLowerCase().trim();
      return cleanTag.includes(cleanSkill) || cleanSkill.includes(cleanTag);
    });
  }).length;

  const overlapRatio = matchingCount / validTags.length;
  // Scale between 75% and 98%
  const score = Math.round(75 + overlapRatio * 23);
  return Math.max(75, Math.min(98, score));
}

export const Tab4DashboardMatches = ({ 
  selectedPersona, 
  preferredWorkMode = 'remote',
  setPreferredWorkMode,
  readinessScore, 
  streakDays, 
  setActiveTab,
  openApplyModal,
  onApplyClick
}) => {
  // Live Job Search API State
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('returnship');
  const [filterType, setFilterType] = useState('All'); // 'All' | 'Remote' | 'Returnship' | 'Saved'
  const [appliedJobIds, setAppliedJobIds] = useState(['ret-fb-1', 'ret-1']);

  // Candidate skills array for dynamic match calculation
  const candidateSkills = selectedPersona?.skills || [
    'React', 'Node.js', 'Web Development', 'JavaScript', 
    'Marketing', 'Salesforce', 'Software Engineering', 'Operations', 
    'Mentorship', 'Flexible Hours', 'Agile', 'Product Management'
  ];

  // Saved / Favorited Jobs State with localStorage persistence
  const [savedJobIds, setSavedJobIds] = useState(() => {
    try {
      const saved = localStorage.getItem('reher_saved_jobs');
      return saved ? JSON.parse(saved) : ['job-1'];
    } catch (e) {
      console.warn('Failed to parse saved jobs from localStorage', e);
      return ['job-1'];
    }
  });

  // Toggle saving/favoriting a job in localStorage
  const toggleSaveJob = (jobId) => {
    setSavedJobIds((prev) => {
      const isSaved = prev.includes(jobId);
      const updated = isSaved 
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId];
      try {
        localStorage.setItem('reher_saved_jobs', JSON.stringify(updated));
      } catch (err) {
        console.warn('Failed to save to localStorage', err);
      }
      return updated;
    });
  };

  // Fetch jobs function
  const loadJobs = async (query) => {
    setLoading(true);
    try {
      const results = await fetchPublicJobs(query);
      setJobs(results || []);
    } catch (err) {
      console.error('Failed to fetch public jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch jobs on component mount
  useEffect(() => {
    loadJobs(searchQuery);
  }, []);

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    loadJobs(searchQuery);
  };

  const handleApplyClick = (job) => {
    if (onApplyClick) {
      onApplyClick(job);
    } else if (openApplyModal) {
      openApplyModal(job);
    }
  };

  const currentModeInfo = WORK_MODES.find(m => m.id === preferredWorkMode) || WORK_MODES[0];

  // Filter jobs based on filterType pill (All, Remote, Returnship, Saved)
  const filteredJobs = jobs.filter((job) => {
    if (filterType === 'Saved') {
      return savedJobIds.includes(job.id);
    }
    if (filterType === 'Remote') {
      const isRemote = job.workMode === 'remote' || 
        (job.location && job.location.toLowerCase().includes('remote')) ||
        (Array.isArray(job.tags) && job.tags.some(t => t.toLowerCase().includes('remote')));
      if (!isRemote) return false;
    } else if (filterType === 'Returnship') {
      const isReturnship = (job.title && job.title.toLowerCase().includes('returnship')) ||
        (job.type && jobTypeIsReturnship(job)) ||
        (Array.isArray(job.tags) && job.tags.some(t => t.toLowerCase().includes('returnship'))) ||
        (job.description && job.description.toLowerCase().includes('returnship'));
      if (!isReturnship) return false;
    }
    return true;
  });

  // Streak Calendar Heatmap (Last 14 days)
  const streakDaysData = [
    { day: 'M', active: true, date: 'Aug 11' },
    { day: 'T', active: true, date: 'Aug 12' },
    { day: 'W', active: true, date: 'Aug 13' },
    { day: 'T', active: true, date: 'Aug 14' },
    { day: 'F', active: true, date: 'Aug 15' },
    { day: 'S', active: true, date: 'Aug 16' },
    { day: 'S', active: true, date: 'Aug 17' },
    { day: 'M', active: true, date: 'Aug 18' },
    { day: 'T', active: true, date: 'Aug 19' },
    { day: 'W', active: true, date: 'Aug 20' },
    { day: 'T', active: true, date: 'Aug 21' },
    { day: 'F', active: true, date: 'Aug 22' },
    { day: 'S', active: true, date: 'Aug 23' },
    { day: 'S', active: true, date: 'Today' }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Hero / Readiness Scorecard */}
      <div className="glass-card p-6 md:p-8 bg-gradient-to-r from-indigo-50/80 via-white to-amber-50/80 border border-indigo-100 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold">
            <LayoutDashboard className="w-3.5 h-3.5 text-indigo-600" />
            TAB 4: Central Comeback Dashboard & Returnship Matcher
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome Back, <span className="gradient-text-primary">{selectedPersona.name.split(' ')[0]}</span>!
          </h1>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Your return-to-work profile is matched for <strong className="text-indigo-700">{currentModeInfo.label}</strong> roles. Explore live returnships and flexible positions with verified mentorship and supportive onboarding.
          </p>
        </div>

        {/* Big Readiness Score Circle */}
        <div className="bg-white p-5 rounded-2xl border border-indigo-200 shadow-sm flex items-center gap-5 shrink-0">
          <div className="relative w-20 h-20 flex items-center justify-center">
            <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-indigo-600 transition-all duration-1000"
                strokeDasharray={`${readinessScore}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute text-xl font-black text-slate-900">
              {readinessScore}%
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Comeback Readiness</div>
            <div className="text-base font-extrabold text-indigo-700">{currentModeInfo.icon} {currentModeInfo.label}</div>
            <div className="text-[11px] text-emerald-600 font-bold mt-0.5">✅ ATS 94% • Live Job Match Active</div>
          </div>
        </div>
      </div>

      {/* 4 Central Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div 
          onClick={() => setActiveTab('tab1')}
          className="glass-card p-4 sm:p-5 border-slate-200 cursor-pointer hover:border-indigo-300 transition-all space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">ATS Resume Score</span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">94 / 100</div>
          <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> {currentModeInfo.label} Tools
          </div>
        </div>

        <div 
          onClick={() => setActiveTab('tab2')}
          className="glass-card p-4 sm:p-5 border-slate-200 cursor-pointer hover:border-indigo-300 transition-all space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Skills Refreshed</span>
            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">8 of 10</div>
          <div className="text-[11px] text-indigo-700 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Tech, Mktg & HR
          </div>
        </div>

        <div 
          onClick={() => setActiveTab('tab3')}
          className="glass-card p-4 sm:p-5 border-slate-200 cursor-pointer hover:border-indigo-300 transition-all space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Mock Drills Passed</span>
            <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">4 of 4</div>
          <div className="text-[11px] text-rose-700 font-semibold flex items-center gap-1">
            <Award className="w-3 h-3" /> 94% Avg Rubric
          </div>
        </div>

        <div 
          onClick={() => setFilterType('Saved')}
          className="glass-card p-4 sm:p-5 border-slate-200 cursor-pointer hover:border-rose-300 transition-all space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Saved Positions</span>
            <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{savedJobIds.length} Saved</div>
          <div className="text-[11px] text-rose-700 font-semibold flex items-center gap-1">
            <Bookmark className="w-3 h-3" /> Click to view shortlisted
          </div>
        </div>

      </div>

      {/* Streak Heatmap & Quick Action Launchpad */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Streak Heatmap (5 Cols) */}
        <div className="lg:col-span-5 glass-card p-6 border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
                <Flame className="w-5 h-5 fill-amber-500 text-amber-500 animate-bounce" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">14-Day Comeback Streak</h3>
                <p className="text-[11px] text-slate-500">Consistent daily micro-actions win offers</p>
              </div>
            </div>
            <span className="badge badge-amber font-bold">Level 3 Returner</span>
          </div>

          <div className="grid grid-cols-7 gap-2 pt-2">
            {streakDaysData.map((st, i) => (
              <div key={i} className="text-center space-y-1">
                <div className={`w-8 h-8 mx-auto rounded-lg flex items-center justify-center font-bold text-xs shadow-xs ${
                  st.active ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 text-slate-400'
                }`}>
                  {st.day}
                </div>
                <div className="text-[9px] text-slate-400 font-medium">{st.date}</div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <span>🔥 Today's Goal: Review 1 Returnship role</span>
            <span className="font-bold text-emerald-600">Complete</span>
          </div>
        </div>

        {/* Quick Action Launchpad (7 Cols) */}
        <div className="lg:col-span-7 glass-card p-6 border-slate-200 space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            Quick Action Launchpad ({currentModeInfo.label})
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div 
              onClick={() => setActiveTab('tab3')}
              className="p-4 bg-indigo-50/70 hover:bg-indigo-100/80 border border-indigo-200 rounded-xl cursor-pointer transition-all space-y-1"
            >
              <div className="font-bold text-xs text-indigo-900">1. Practice 3-Yr Gap Drill</div>
              <p className="text-[11px] text-indigo-700/80">Audio test on caregiving sabbatical.</p>
            </div>

            <div 
              onClick={() => setActiveTab('tab2')}
              className="p-4 bg-emerald-50/70 hover:bg-emerald-100/80 border border-emerald-200 rounded-xl cursor-pointer transition-all space-y-1"
            >
              <div className="font-bold text-xs text-emerald-900">2. Review 2026 Tech</div>
              <p className="text-[11px] text-emerald-700/80">Explore AI Copilots, Notion & Slack shifts.</p>
            </div>

            <div 
              onClick={() => setActiveTab('tab1')}
              className="p-4 bg-rose-50/70 hover:bg-rose-100/80 border border-rose-200 rounded-xl cursor-pointer transition-all space-y-1"
            >
              <div className="font-bold text-xs text-rose-900">3. Work Mode Resume</div>
              <p className="text-[11px] text-rose-700/80">Export ATS PDF with {currentModeInfo.label} tags.</p>
            </div>
          </div>
        </div>

      </div>

      {/* Module: Live Returnship & Job Matcher */}
      <div className="glass-card p-6 md:p-8 border-slate-200 space-y-6">
        
        {/* Header with Title & API Badge */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-extrabold text-slate-900">
                Live Returnship & Job Matcher
              </h2>
              <span className="badge badge-emerald font-bold flex items-center gap-1">
                <Globe className="w-3 h-3" /> Live Job Board API
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Search real-time returnships, flexible remote positions, and relaunch opportunities across global tech and business ecosystems.
            </p>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Showing <strong className="text-indigo-700 font-bold">{filteredJobs.length}</strong> matching roles
          </div>
        </div>

        {/* Search Input + Button Header */}
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword (e.g., software, salesforce, amazon, persistent, remote)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium text-slate-800"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  loadJobs('');
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                Clear
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary text-xs py-2.5 px-6 shrink-0 flex items-center gap-2 w-full sm:w-auto justify-center shadow-sm"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            <span>Search Jobs</span>
          </button>
        </form>

        {/* Filter Pills Header (All, Remote, Returnship, Saved Jobs) */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1 shrink-0 mr-1">
            <Filter className="w-3.5 h-3.5 text-indigo-600" /> Filter:
          </span>

          {[
            { id: 'All', label: '🌐 All' },
            { id: 'Remote', label: '🏠 Remote' },
            { id: 'Returnship', label: '⚡ Returnship' },
            { id: 'Saved', label: '❤️ Saved Jobs' }
          ].map(({ id, label }) => {
            const isSelected = filterType === id;
            let count = jobs.length;
            if (id === 'Saved') {
              count = jobs.filter(j => savedJobIds.includes(j.id)).length;
            } else if (id === 'Remote') {
              count = jobs.filter(j => 
                j.workMode === 'remote' || 
                (j.location && j.location.toLowerCase().includes('remote')) ||
                (Array.isArray(job.tags) && j.tags.some(t => t.toLowerCase().includes('remote')))
              ).length;
            } else if (id === 'Returnship') {
              count = jobs.filter(j => 
                (j.title && j.title.toLowerCase().includes('returnship')) ||
                (j.type && jobTypeIsReturnship(j)) ||
                (Array.isArray(j.tags) && j.tags.some(t => t.toLowerCase().includes('returnship'))) ||
                (j.description && j.description.toLowerCase().includes('returnship'))
              ).length;
            }

            return (
              <button
                key={id}
                onClick={() => setFilterType(id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? id === 'Saved' 
                      ? 'bg-rose-600 text-white shadow-sm border border-rose-600'
                      : 'bg-indigo-600 text-white shadow-sm border border-indigo-600'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>{label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected 
                    ? id === 'Saved' ? 'bg-rose-700 text-white' : 'bg-indigo-700 text-white' 
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}

          {/* Quick Keyword Suggestions */}
          <div className="hidden lg:flex items-center gap-1.5 ml-auto text-xs text-slate-400">
            <span>Popular:</span>
            {['software', 'salesforce', 'amazon', 'persistent', 'remote'].map((term) => (
              <button
                key={term}
                onClick={() => {
                  setSearchQuery(term);
                  loadJobs(term);
                }}
                className="text-[11px] text-indigo-600 hover:underline bg-indigo-50/60 px-2 py-0.5 rounded-md"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="p-12 text-center bg-indigo-50/40 rounded-2xl border border-indigo-100 space-y-3 animate-pulse">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-indigo-950">Fetching live job listings...</h3>
              <p className="text-xs text-slate-500">Querying database for "{searchQuery || 'all positions'}"</p>
            </div>
          </div>
        )}

        {/* Job Listings Grid */}
        {!loading && (
          <div className="space-y-4">
            {filteredJobs.length === 0 ? (
              filterType === 'Saved' ? (
                <div className="p-10 text-center bg-slate-50/70 rounded-2xl border border-dashed border-slate-300 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto shadow-xs">
                    <Heart className="w-6 h-6 fill-rose-500 text-rose-500" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-800">No saved jobs yet</h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Click the heart icon on any returnship or flexible role card to save it for quick reference later.
                    </p>
                  </div>
                  <button
                    onClick={() => setFilterType('All')}
                    className="btn btn-sm btn-primary text-xs font-semibold"
                  >
                    Browse All Returnships
                  </button>
                </div>
              ) : (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <p className="text-sm font-bold text-slate-700">No jobs found matching "{searchQuery}" with filter "{filterType}".</p>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => {
                        setFilterType('All');
                        setSearchQuery('returnship');
                        loadJobs('returnship');
                      }}
                      className="btn btn-sm btn-secondary text-xs flex items-center gap-1"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Reset Search & Filters
                    </button>
                  </div>
                </div>
              )
            ) : (
              filteredJobs.map((job) => {
                const hasApplied = appliedJobIds.includes(job.id);
                const isSaved = savedJobIds.includes(job.id);
                const isModeMatch = job.workMode === preferredWorkMode;
                const dynamicScore = calculateMatchScore(job.tags, candidateSkills);

                return (
                  <div 
                    key={job.id} 
                    className="p-5 md:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all space-y-4 relative group"
                  >
                    {/* Job Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      
                      <div className="flex items-start gap-3.5 flex-1 min-w-0">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
                          {job.logo ? (
                            <img 
                              src={job.logo} 
                              alt={job.company} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=100';
                              }}
                            />
                          ) : (
                            <Building2 className="w-6 h-6 text-indigo-600" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-extrabold text-sm text-slate-900">{job.company}</span>
                            <span className="badge badge-indigo text-[10px] font-bold">
                              {job.workModeTitle || (job.location?.toLowerCase().includes('remote') ? 'Fully Remote' : 'Hybrid / Flex')}
                            </span>
                            <span className="badge badge-amber text-[10px] font-bold">
                              {job.type || 'Verified Position'}
                            </span>
                            {job.category && (
                              <span className="badge badge-indigo text-[10px] font-bold">
                                {job.category}
                              </span>
                            )}
                            {/* Dynamic Match Score Badge */}
                            <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                              <Award className="w-3 h-3 text-emerald-600" />
                              <span>{dynamicScore}% Match</span>
                            </span>
                            {isModeMatch && (
                              <span className="badge badge-emerald text-[10px] font-bold">
                                ✨ Matches Your Mode
                              </span>
                            )}
                          </div>
                          <h3 className="text-base font-extrabold text-indigo-900 mt-0.5 truncate">{job.title}</h3>
                          
                          {/* Commute & Hour Flexibility Bar */}
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 mt-1.5 font-medium">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" />
                              {job.location || 'Remote / Flexible'}
                            </span>
                            <span className="flex items-center gap-1 text-indigo-700 font-semibold bg-indigo-50/70 px-2 py-0.5 rounded-md">
                              {job.commuteInfo || '🚗 Flexible Setup'}
                            </span>
                            <span className="flex items-center gap-1 text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                              {job.hourFlexibility || '⏱️ Flexible Core Hours'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Top-Right Header Metadata & Interactive Save/Heart Button */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2.5 shrink-0">
                        <div className="flex items-center gap-2">
                          
                          {/* Interactive Save / Favorite Button */}
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSaveJob(job.id);
                            }}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            aria-label="Save job"
                          >
                            <Heart 
                              className={`w-5 h-5 ${savedJobIds.includes(job.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                            />
                          </button>

                          {/* Dynamic Match Score Badge in top right */}
                          <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                            <Award className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{dynamicScore}% Match</span>
                          </span>
                        </div>

                        {/* Salary & Rate Display */}
                        <div className="text-right">
                          <div className="font-extrabold text-sm text-slate-900">
                            {(job.stipend || job.salaryRange || 'Competitive Rate').split('(')[0]}
                          </div>
                          <div className="text-[11px] text-emerald-700 font-semibold">
                            {job.salaryRange || 'Flexible Returner Compensation'}
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Job Description */}
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 hover:line-clamp-none transition-all">
                      {job.description}
                    </p>

                    {/* Tags & Culture Section */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      
                      {/* Standard Tags */}
                      {Array.isArray(job.tags) && job.tags.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[11px] text-slate-400 font-semibold mr-1 flex items-center gap-1">
                            <Tag className="w-3 h-3 text-slate-400" /> Tags:
                          </span>
                          {job.tags.slice(0, 6).map((tag, i) => (
                            <span key={i} className="badge badge-indigo text-[10px]">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Culture and matched skills if available */}
                      {Array.isArray(job.cultureTags) && job.cultureTags.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                          <span className="text-slate-400 font-semibold mr-1">Culture:</span>
                          {job.cultureTags.map((tag, i) => (
                            <span key={i} className="badge badge-emerald text-[10px]">
                              ❤️ {tag}
                            </span>
                          ))}
                        </div>
                      )}

                    </div>

                    {/* Action Footer */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                      <div className="text-[11px] text-slate-500 flex items-center gap-2">
                        <span>Hiring Team: <strong className="text-slate-700">{job.hiringManager || 'Talent Acquisition'}</strong></span>
                        {job.applyUrl && (
                          <a 
                            href={job.applyUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-semibold text-[11px]"
                          >
                            <span>Live Posting</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleApplyClick(job)}
                          className={`btn btn-sm text-xs flex items-center gap-1.5 shadow-sm font-semibold ${
                            hasApplied ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'btn-primary'
                          }`}
                        >
                          {hasApplied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> : <Send className="w-3.5 h-3.5" />}
                          <span>{hasApplied ? 'Application Submitted (Tracked)' : 'Apply with ReHer Story'}</span>
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })
            )}
          </div>
        )}

      </div>

    </div>
  );
};

// Helper function to check returnship type safely
function jobTypeIsReturnship(job) {
  return typeof job.type === 'string' && job.type.toLowerCase().includes('returnship');
}
