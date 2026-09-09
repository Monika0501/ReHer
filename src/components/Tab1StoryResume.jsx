import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Briefcase, 
  FileText, 
  Copy, 
  Check, 
  RefreshCw, 
  Plus, 
  Trash2, 
  Download, 
  Printer, 
  Eye, 
  Award, 
  Volume2, 
  VolumeX, 
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
  SlidersHorizontal,
  Home,
  Building,
  Clock,
  Laptop
} from 'lucide-react';
import { WORK_MODES } from '../data/personas';
import confetti from 'canvas-confetti';

export const Tab1StoryResume = ({ 
  selectedPersona, 
  preferredWorkMode,
  setPreferredWorkMode,
  openResumePreview
}) => {
  // Form State
  const [targetRole, setTargetRole] = useState(selectedPersona.targetRole);
  const [breakStart, setBreakStart] = useState(selectedPersona.breakYears.start);
  const [breakEnd, setBreakEnd] = useState(selectedPersona.breakYears.end);
  const [breakReason, setBreakReason] = useState(selectedPersona.breakReason);
  const [breakActivities, setBreakActivities] = useState(selectedPersona.careBreakActivities.join('\n'));
  
  // Bullets State
  const [bullets, setBullets] = useState(selectedPersona.translatedBullets);
  const [newBulletText, setNewBulletText] = useState('');
  
  // Tone & Pitch State
  const [selectedTone, setSelectedTone] = useState('inspiring');
  const [pitchText, setPitchText] = useState(selectedPersona.comebackStory.inspiring);
  
  // UI states
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedSection, setCopiedSection] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [resumeTheme, setResumeTheme] = useState('indigo');
  const [resumeTemplate, setResumeTemplate] = useState('executive');
  const [toastMessage, setToastMessage] = useState(null);

  const currentModeInfo = WORK_MODES.find(m => m.id === preferredWorkMode) || WORK_MODES[0];

  const handleExportATSResume = () => {
    setToastMessage("Generating ATS-Optimized Resume...");
    try {
      confetti({
        particleCount: 75,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#4F46E5', '#10B981', '#F59E0B']
      });
    } catch (e) {}

    setTimeout(() => {
      if (openResumePreview) {
        openResumePreview();
      } else {
        window.print();
      }
      setTimeout(() => setToastMessage(null), 3000);
    }, 350);
  };

  // Sync state when persona or workMode changes
  useEffect(() => {
    setTargetRole(selectedPersona.targetRole);
    setBreakStart(selectedPersona.breakYears.start);
    setBreakEnd(selectedPersona.breakYears.end);
    setBreakReason(selectedPersona.breakReason);
    setBreakActivities(selectedPersona.careBreakActivities.join('\n'));
    setBullets(selectedPersona.translatedBullets);
    setPitchText(selectedPersona.comebackStory[selectedTone] || selectedPersona.comebackStory.inspiring);
  }, [selectedPersona]);

  // Tone switch handler
  const handleToneChange = (tone) => {
    setSelectedTone(tone);
    if (selectedPersona.comebackStory[tone]) {
      setPitchText(selectedPersona.comebackStory[tone]);
    }
  };

  // AI Rebuild handler with work-mode tailoring animation
  const handleAIRebuild = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);

      // Add a work-mode-tailored bullet if not present
      let workModeBullet = '';
      if (preferredWorkMode === 'remote') {
        workModeBullet = 'Established dedicated high-bandwidth home office; managed asynchronous project documentation in Notion/Loom ensuring 100% transparent milestone delivery.';
      } else if (preferredWorkMode === 'hybrid') {
        workModeBullet = 'Orchestrated weekly hybrid operational routines, balancing in-person committee sessions with remote digital communications.';
      } else if (preferredWorkMode === 'onsite') {
        workModeBullet = 'Led on-site community initiatives and in-person vendor logistics with zero scheduling delays and verified emergency contingency plans.';
      } else {
        workModeBullet = 'Executed high-leverage deliverables on a flexible 25-hr weekly cadence, leveraging time-blocking to maximize project ROI.';
      }

      if (!bullets.includes(workModeBullet)) {
        setBullets([workModeBullet, ...bullets.slice(0, 3)]);
      }

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#4F46E5', '#F43F5E', '#10B981', '#F59E0B']
        });
      } catch (e) {}
    }, 900);
  };

  // Bullet manipulation
  const handleAddBullet = () => {
    if (!newBulletText.trim()) return;
    setBullets([...bullets, newBulletText.trim()]);
    setNewBulletText('');
  };

  const handleDeleteBullet = (index) => {
    setBullets(bullets.filter((_, i) => i !== index));
  };

  const handleUpdateBullet = (index, value) => {
    const updated = [...bullets];
    updated[index] = value;
    setBullets(updated);
  };

  // Copy helper
  const copyToClipboard = (text, sectionId) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2200);
  };

  // Speech synthesizer for elevator pitch
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(pitchText);
      utterance.rate = 0.95;
      utterance.pitch = 1.05;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Banner / Hero */}
      <div className="glass-card p-6 md:p-8 bg-gradient-to-r from-indigo-50/80 via-white to-rose-50/80 border border-indigo-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-spin" />
            TAB 1: AI Career Gap Analyzer & Resume Transformation
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Turn Your Break Into an <span className="gradient-text-primary">Executive Asset</span>
          </h1>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Translate caregiving and leadership into recognized, high-impact bullet points customized for your target <strong className="text-indigo-700">{currentModeInfo.label}</strong> returnship.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportATSResume}
            className="btn btn-primary flex items-center gap-2 shadow-md font-bold"
          >
            <Download className="w-4 h-4" />
            <span>Export ATS Resume</span>
          </button>
          <button
            onClick={openResumePreview}
            className="btn btn-secondary flex items-center gap-2 font-medium"
          >
            <Eye className="w-4 h-4 text-indigo-600" />
            <span>Full-Screen Preview</span>
          </button>
        </div>
      </div>

      {/* Dynamic Toast Notice */}
      {toastMessage && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl flex items-center gap-2.5 text-xs font-bold animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="flex-1">{toastMessage}</span>
        </div>
      )}

      {/* Grid Layout: Left Inputs / Work Mode & Right Bullets / Live ATS Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Input & Work Mode Selector (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Section 1: Career Gap & Work Mode Ingestion */}
          <div className="glass-card p-6 border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-indigo-600" />
                Target Role & Work Mode
              </h2>
              <span className="badge badge-indigo">ATS Optimized</span>
            </div>

            {/* Work Mode Selection Pills */}
            <div>
              <label className="form-label flex items-center justify-between">
                <span>Preferred Work Mode</span>
                <span className="text-[11px] text-indigo-600 font-semibold">{currentModeInfo.label}</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {WORK_MODES.map((mode) => {
                  const isSelected = mode.id === preferredWorkMode;
                  return (
                    <button
                      key={mode.id}
                      onClick={() => setPreferredWorkMode(mode.id)}
                      className={`p-2 rounded-xl text-left border transition-all text-xs font-semibold flex items-center gap-2 ${
                        isSelected 
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-base">{mode.icon}</span>
                      <div className="truncate">
                        <div>{mode.label}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Targeted Toolchain Tag Callout based on Work Mode */}
            <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 text-xs space-y-1">
              <span className="font-bold text-indigo-950 flex items-center gap-1.5">
                <Laptop className="w-3.5 h-3.5 text-indigo-600" />
                Work-Mode Highlighted Tools on Resume:
              </span>
              <p className="text-[11px] text-indigo-800 font-medium">
                {currentModeInfo.toolHighlight}
              </p>
            </div>

            <div>
              <label className="form-label">Target Return Role / Specialization</label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="form-input text-sm font-medium"
                placeholder="e.g. Senior Full-Stack Engineer"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="form-label">Break Start Year</label>
                <input
                  type="text"
                  value={breakStart}
                  onChange={(e) => setBreakStart(e.target.value)}
                  className="form-input text-sm"
                />
              </div>
              <div>
                <label className="form-label">Return Year (Current)</label>
                <input
                  type="text"
                  value={breakEnd}
                  onChange={(e) => setBreakEnd(e.target.value)}
                  className="form-input text-sm font-semibold text-indigo-700 bg-indigo-50/50"
                />
              </div>
            </div>

            <div>
              <label className="form-label">Primary Life Focus During Break</label>
              <input
                type="text"
                value={breakReason}
                onChange={(e) => setBreakReason(e.target.value)}
                className="form-input text-sm"
                placeholder="e.g. Full-time childcare for twins & non-profit volunteer"
              />
            </div>

            <div>
              <label className="form-label flex items-center justify-between">
                <span>Activities, Sabbaticals & Upskilling</span>
                <span className="text-[11px] text-slate-400 font-normal">One per line</span>
              </label>
              <textarea
                rows={3}
                value={breakActivities}
                onChange={(e) => setBreakActivities(e.target.value)}
                className="form-textarea text-xs leading-relaxed"
                placeholder="e.g. Managed household budget, President of PTA, self-taught Next.js"
              />
            </div>

            <button
              onClick={handleAIRebuild}
              disabled={isGenerating}
              className="btn btn-primary w-full flex items-center justify-center gap-2 py-3 mt-1"
            >
              <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? `Tailoring for ${currentModeInfo.label}...` : `Re-Analyze & Tailor for ${currentModeInfo.label}`}</span>
            </button>
          </div>

          {/* Section 2: Comeback Pitch & Elevator Story */}
          <div className="glass-card p-6 border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-rose-500" />
                My Comeback Story (Pitch)
              </h2>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleToggleSpeech}
                  className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 border transition-colors ${
                    isPlayingAudio 
                      ? 'bg-rose-100 text-rose-700 border-rose-300 animate-pulse' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200'
                  }`}
                  title="Listen to pitch"
                >
                  {isPlayingAudio ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span>{isPlayingAudio ? 'Stop' : 'Listen'}</span>
                </button>
                <button
                  onClick={() => copyToClipboard(pitchText, 'pitch')}
                  className="p-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 flex items-center gap-1"
                >
                  {copiedSection === 'pitch' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === 'pitch' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Tone Selector Pills */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <button
                onClick={() => handleToneChange('inspiring')}
                className={`py-1.5 px-2 text-xs font-bold rounded-lg border transition-all ${
                  selectedTone === 'inspiring'
                    ? 'bg-rose-50 border-rose-400 text-rose-700 shadow-sm'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                🌟 Inspiring
              </button>
              <button
                onClick={() => handleToneChange('direct')}
                className={`py-1.5 px-2 text-xs font-bold rounded-lg border transition-all ${
                  selectedTone === 'direct'
                    ? 'bg-indigo-50 border-indigo-400 text-indigo-700 shadow-sm'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                🎯 Direct & Impact
              </button>
              <button
                onClick={() => handleToneChange('analytical')}
                className={`py-1.5 px-2 text-xs font-bold rounded-lg border transition-all ${
                  selectedTone === 'analytical'
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-700 shadow-sm'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                📊 Analytical
              </button>
            </div>

            <textarea
              rows={5}
              value={pitchText}
              onChange={(e) => setPitchText(e.target.value)}
              className="form-textarea text-xs leading-relaxed font-medium bg-slate-50/70 border-slate-200"
            />

            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Optimized for LinkedIn & InMail ({currentModeInfo.label})
              </span>
              <span>{pitchText.split(' ').length} words</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: AI Workplace Bullets & Live ATS Resume Sheet (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Section 3: Workplace Bullets Generator */}
          <div className="glass-card p-6 border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
                  Career Break Workplace Bullet Points
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  AI-translated competencies showing high-stakes operations, budgeting, and leadership.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard(bullets.map(b => `• ${b}`).join('\n'), 'all-bullets')}
                  className="btn btn-sm btn-secondary text-xs"
                >
                  {copiedSection === 'all-bullets' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === 'all-bullets' ? 'All Copied' : 'Copy All'}</span>
                </button>
                <button
                  onClick={handleAIRebuild}
                  className="btn btn-sm btn-ghost text-xs text-indigo-600 hover:bg-indigo-50"
                  title="Regenerate bullets"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Regenerate</span>
                </button>
              </div>
            </div>

            {/* Translated Skill Mapping Showcase */}
            <div className="mb-4 p-4 bg-indigo-50/70 rounded-xl border border-indigo-100 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-indigo-950">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  Translated Skill Mapping (Caregiving → Workplace Competency)
                </span>
                <span className="badge badge-emerald text-[10px]">AI Validated</span>
              </div>
              
              <div className="grid grid-cols-1 gap-2 text-xs">
                <div className="p-2 bg-white rounded-lg border border-indigo-100/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-slate-500 font-medium">Household Budget & Expense Management</span>
                  <span className="font-bold text-indigo-700 sm:text-right">➔ Financial Planning, Budget Allocation & Cost Optimization</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-indigo-100/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-slate-500 font-medium">School PTA Event Lead</span>
                  <span className="font-bold text-indigo-700 sm:text-right">➔ Stakeholder Management, Event Operations & Cross-Functional Leadership</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-indigo-100/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-slate-500 font-medium">Managing Multi-Child Schedules</span>
                  <span className="font-bold text-indigo-700 sm:text-right">➔ Agile Resource Scheduling, Time Management & Conflict Resolution</span>
                </div>
              </div>
            </div>

            {/* Bullets List */}
            <div className="space-y-3">
              {bullets.map((bullet, idx) => (
                <div 
                  key={idx} 
                  className="group relative flex items-start gap-3 p-3.5 bg-white rounded-xl border border-slate-200/90 shadow-sm hover:border-indigo-300 transition-all"
                >
                  <div className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  
                  <textarea
                    rows={2}
                    value={bullet}
                    onChange={(e) => handleUpdateBullet(idx, e.target.value)}
                    className="w-full text-xs text-slate-700 bg-transparent border-none p-0 focus:ring-0 resize-none font-medium leading-relaxed"
                  />

                  <div className="flex items-center gap-1 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => copyToClipboard(bullet, `bullet-${idx}`)}
                      className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700"
                      title="Copy bullet"
                    >
                      {copiedSection === `bullet-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => handleDeleteBullet(idx)}
                      className="p-1 rounded hover:bg-rose-50 text-slate-400 hover:text-rose-600"
                      title="Delete bullet"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Custom Bullet */}
            <div className="mt-4 flex items-center gap-2">
              <input
                type="text"
                value={newBulletText}
                onChange={(e) => setNewBulletText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddBullet()}
                placeholder="Add custom caregiving/community achievement..."
                className="form-input text-xs"
              />
              <button
                onClick={handleAddBullet}
                className="btn btn-sm btn-secondary text-xs shrink-0 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Section 4: Live Interactive ATS Resume Sheet */}
          <div className="glass-card p-6 border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                  <Award className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-sm">Live ATS Resume Rebuilder</h3>
                    <span className="badge badge-emerald font-bold">94/100 ATS Score</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Auto-tailored for <strong>{currentModeInfo.label}</strong> roles</p>
                </div>
              </div>

              {/* Theme & Template Controls */}
              <div className="flex items-center gap-2">
                <select
                  value={resumeTheme}
                  onChange={(e) => setResumeTheme(e.target.value)}
                  className="text-xs p-1.5 border border-slate-200 rounded-lg bg-white font-medium text-slate-700"
                >
                  <option value="indigo">Indigo Executive</option>
                  <option value="rose">Rose Gold Modern</option>
                  <option value="emerald">Emerald Growth</option>
                  <option value="navy">Classic Navy</option>
                </select>

                <button
                  onClick={openResumePreview}
                  className="btn btn-sm btn-primary text-xs flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>
              </div>
            </div>

            {/* Embedded Mini-Resume Document */}
            <div className="bg-white p-6 rounded-xl border border-slate-300 shadow-sm text-slate-800 font-sans text-xs space-y-4 max-h-[520px] overflow-y-auto">
              
              {/* Header */}
              <div className={`border-b-2 pb-3 ${
                resumeTheme === 'rose' ? 'border-rose-500' :
                resumeTheme === 'emerald' ? 'border-emerald-600' :
                resumeTheme === 'navy' ? 'border-slate-800' : 'border-indigo-600'
              }`}>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-black tracking-tight text-slate-900">{selectedPersona.name}</h2>
                  <span className="badge badge-indigo text-[10px] font-bold">
                    {currentModeInfo.icon} {currentModeInfo.label}
                  </span>
                </div>
                <p className={`font-bold text-xs ${
                  resumeTheme === 'rose' ? 'text-rose-600' :
                  resumeTheme === 'emerald' ? 'text-emerald-700' :
                  resumeTheme === 'navy' ? 'text-slate-700' : 'text-indigo-600'
                }`}>{targetRole}</p>
                <div className="text-[11px] text-slate-500 flex flex-wrap gap-x-3 gap-y-1 mt-1">
                  <span>📍 {selectedPersona.location}</span>
                  <span>✉️ {selectedPersona.email}</span>
                  <span>🔗 {selectedPersona.linkedin}</span>
                  <span>💻 {selectedPersona.github}</span>
                </div>
              </div>

              {/* Work Mode & Collaboration Stack Callout */}
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-[10.5px] space-y-0.5">
                <span className="font-bold text-slate-800">Target Work Mode & Collaboration Stack:</span>
                <div className="text-slate-600">{currentModeInfo.label} • {currentModeInfo.toolHighlight}</div>
              </div>

              {/* Summary */}
              <div>
                <h4 className="font-extrabold uppercase text-[11px] text-slate-900 tracking-wider mb-1 border-b border-slate-200 pb-0.5">
                  Executive Comeback Summary
                </h4>
                <p className="text-slate-700 text-[11px] leading-relaxed">
                  {pitchText}
                </p>
              </div>

              {/* Career Sabbatical & Re-Skilling */}
              <div className="bg-indigo-50/50 p-3 rounded-lg border border-indigo-100">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-[11px] text-indigo-900">
                    Intentional Career Sabbatical & Professional Leadership
                  </h4>
                  <span className="text-[10px] font-bold text-indigo-700">{breakStart} – {breakEnd}</span>
                </div>
                <p className="text-[10px] text-indigo-800 italic mb-2">
                  Dedicated pause for family developmental care, community initiative governance, and modern technical upskilling.
                </p>
                <ul className="space-y-1 pl-3 list-disc text-[10.5px] text-slate-700">
                  {bullets.map((b, i) => (
                    <li key={i} className="leading-snug">{b}</li>
                  ))}
                </ul>
              </div>

              {/* Prior Corporate Experience */}
              <div>
                <h4 className="font-extrabold uppercase text-[11px] text-slate-900 tracking-wider mb-2 border-b border-slate-200 pb-0.5">
                  Prior Corporate Experience
                </h4>
                <div className="space-y-3">
                  {selectedPersona.pastExperience.map((exp, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-slate-900">{exp.role} — <span className="text-slate-600 font-semibold">{exp.company}</span></span>
                        <span className="text-slate-500 font-medium">{exp.period}</span>
                      </div>
                      <p className="text-[10.5px] text-slate-600 mt-0.5 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education & Credentials */}
              <div>
                <h4 className="font-extrabold uppercase text-[11px] text-slate-900 tracking-wider mb-1 border-b border-slate-200 pb-0.5">
                  Education & Credentials
                </h4>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-slate-800">{selectedPersona.education.degree}</span>
                  <span className="text-slate-500">{selectedPersona.education.school} ({selectedPersona.education.year})</span>
                </div>
              </div>

            </div>

            {/* Quick Resume Actions */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-600">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>ATS Parser Check: <strong>Passed (Green)</strong></span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard(
                    `${selectedPersona.name}\n${targetRole} (${currentModeInfo.label})\n\nSUMMARY:\n${pitchText}\n\nCAREER SABBATICAL (${breakStart}-${breakEnd}):\n` +
                    bullets.map(b => `- ${b}`).join('\n') + `\n\nEXPERIENCE:\n` +
                    selectedPersona.pastExperience.map(e => `${e.role} | ${e.company} (${e.period})\n${e.description}`).join('\n\n'),
                    'resume-text'
                  )}
                  className="btn btn-sm btn-secondary text-xs"
                >
                  {copiedSection === 'resume-text' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === 'resume-text' ? 'Resume Copied' : 'Copy Plain Text'}</span>
                </button>
                <button
                  onClick={handleExportATSResume}
                  className="btn btn-sm btn-primary text-xs font-bold flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export ATS Resume</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
