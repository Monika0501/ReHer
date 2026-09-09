// src/components/Navbar.jsx
import React, { useState } from 'react';
import { 
  Briefcase, 
  Sparkles, 
  Compass, 
  LayoutDashboard, 
  Flame, 
  Award, 
  UserCheck, 
  CheckCircle2,
  ChevronDown,
  SlidersHorizontal,
  Bot
} from 'lucide-react';
import { WORK_MODES } from '../data/personas';

export const Navbar = ({ 
  activeTab, 
  setActiveTab, 
  personas, 
  selectedPersona, 
  setSelectedPersona,
  preferredWorkMode,
  setPreferredWorkMode,
  readinessScore,
  streakDays,
  openResumePreview
}) => {
  const [showWorkModeMenu, setShowWorkModeMenu] = useState(false);

  const currentWorkModeObj = WORK_MODES.find(m => m.id === preferredWorkMode) || WORK_MODES[0];

  const handleSelectWorkMode = (modeId) => {
    setPreferredWorkMode(modeId);
    setShowWorkModeMenu(false);
  };

  return (
    <header className="navbar sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 py-2.5 flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Left: Brand Logo & Tagline */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div 
            onClick={() => setActiveTab('tab4')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-rose-500 to-amber-400 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-700 via-rose-600 to-amber-600 bg-clip-text text-transparent">
                  ReHer
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full">
                  Returnship AI
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Career Comebacks for Mothers
              </p>
            </div>
          </div>

          {/* Mobile Quick Work Mode Pill */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setShowWorkModeMenu(!showWorkModeMenu)}
              className="flex items-center gap-1 bg-slate-100 text-slate-800 px-2.5 py-1 rounded-full text-xs font-bold border border-slate-200"
            >
              <span>{currentWorkModeObj.icon}</span>
              <span>{currentWorkModeObj.label.split(' ')[0]}</span>
            </button>
            <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-1 rounded-full text-xs font-bold border border-amber-200">
              <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>{streakDays}d</span>
            </div>
          </div>
        </div>

        {/* Center: Persona Switcher & Global Work Mode Filter */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-center md:justify-start">
          
          {/* Persona Switcher */}
          <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl border border-slate-200 text-xs overflow-x-auto">
            <span className="text-slate-500 font-semibold px-2 flex items-center gap-1 whitespace-nowrap">
              <UserCheck className="w-3.5 h-3.5 text-indigo-600" /> Persona:
            </span>
            {personas.map((p) => {
              const isSelected = p.id === selectedPersona.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPersona(p)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-semibold transition-all whitespace-nowrap ${
                    isSelected 
                      ? 'bg-white text-indigo-700 shadow-sm border border-indigo-100' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <img 
                    src={p.avatar} 
                    alt={p.name} 
                    className="w-4 h-4 rounded-full object-cover border border-slate-300"
                  />
                  <span>{p.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Global Work Mode Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowWorkModeMenu(!showWorkModeMenu)}
              className="flex items-center gap-1.5 bg-indigo-50/80 hover:bg-indigo-100 text-indigo-900 px-3 py-1.5 rounded-xl text-xs font-bold border border-indigo-200 shadow-xs transition-all"
            >
              <SlidersHorizontal className="w-3 h-3 text-indigo-600" />
              <span className="text-slate-500 font-normal">Mode:</span>
              <span>{currentWorkModeObj.icon} {currentWorkModeObj.label}</span>
              <ChevronDown className="w-3 h-3 text-indigo-500 ml-0.5" />
            </button>

            {/* Work Mode Dropdown Menu */}
            {showWorkModeMenu && (
              <div 
                className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 space-y-1 animate-slideUp"
                onMouseLeave={() => setShowWorkModeMenu(false)}
              >
                <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                  Select Preferred Work Mode
                </div>
                {WORK_MODES.map((mode) => {
                  const isActive = mode.id === preferredWorkMode;
                  return (
                    <div
                      key={mode.id}
                      onClick={() => handleSelectWorkMode(mode.id)}
                      className={`p-2.5 rounded-xl cursor-pointer transition-all flex items-start gap-2.5 ${
                        isActive ? 'bg-indigo-50 border border-indigo-200 text-indigo-950' : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span className="text-lg shrink-0 mt-0.5">{mode.icon}</span>
                      <div className="space-y-0.5">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span>{mode.label}</span>
                          {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
                        </div>
                        <div className="text-[10.5px] text-slate-500 leading-snug">{mode.subLabel}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

        {/* Right Badges & Actions */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-amber-50 text-amber-800 px-3 py-1.5 rounded-full text-xs font-bold border border-amber-200 shadow-xs">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{streakDays}d Streak</span>
          </div>

          <div className="flex items-center gap-1.5 bg-indigo-50 text-indigo-800 px-3 py-1.5 rounded-full text-xs font-bold border border-indigo-200 shadow-xs">
            <Award className="w-3.5 h-3.5 text-indigo-600" />
            <span>Score: <strong>{readinessScore}%</strong></span>
          </div>

          <button
            onClick={openResumePreview}
            className="btn btn-sm btn-primary text-xs flex items-center gap-1.5 shadow-sm font-bold"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Live ATS Resume</span>
          </button>
        </div>

      </div>

      {/* Main 4 Clean Consolidated Navigation Tabs */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6">
        <nav className="flex items-center gap-2 overflow-x-auto border-t border-slate-100 pt-1.5 pb-1.5">
          
          {/* Tab 1: 1. Resume & Story Builder */}
          <button
            id="tab-story-resume"
            onClick={() => setActiveTab('tab1')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all shadow-xs ${
              activeTab === 'tab1'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-4 h-4 shrink-0" />
            <span className="truncate">1. Resume & Story Builder</span>
          </button>

          {/* Tab 2: 2. Career Roadmap & Skills */}
          <button
            id="tab-industry-roadmap"
            onClick={() => setActiveTab('tab2')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all shadow-xs ${
              activeTab === 'tab2'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Compass className="w-4 h-4 shrink-0" />
            <span className="truncate">2. Career Roadmap & Skills</span>
          </button>

          {/* Tab 3: 3. AI Interview & Pitch Coach */}
          <button
            id="tab-ai-interview-coach"
            onClick={() => setActiveTab('tab3')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all shadow-xs ${
              activeTab === 'tab3'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Bot className="w-4 h-4 shrink-0" />
            <span className="truncate">3. AI Interview & Pitch Coach</span>
          </button>

          {/* Tab 4: 4. Job Matches & Returnships */}
          <button
            id="tab-dashboard-matches"
            onClick={() => setActiveTab('tab4')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all shadow-xs ${
              activeTab === 'tab4'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            <span className="truncate">4. Job Matches & Returnships</span>
          </button>

        </nav>
      </div>
    </header>
  );
};
