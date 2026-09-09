import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  BookOpen, 
  Layers, 
  Calendar, 
  Plus, 
  Play, 
  Pause, 
  RotateCcw, 
  Zap, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  Users,
  Code,
  Megaphone
} from 'lucide-react';
import { INDUSTRY_EVOLUTION_DATA, SKILL_GAP_DATABASE, COMEBACK_ROADMAP_STEPS } from '../data/mockData';
import confetti from 'canvas-confetti';

export const Tab2IndustryRoadmap = ({ 
  selectedPersona, 
  preferredWorkMode = 'remote',
  onProgressUpdate 
}) => {
  // Industry Shift state (Tech, Marketing, HR)
  const initialField = selectedPersona.field === 'finance' ? 'hr' : (selectedPersona.field || 'tech');
  const [selectedField, setSelectedField] = useState(initialField);
  const [breakStartYear, setBreakStartYear] = useState(selectedPersona.breakYears.start || '2021');

  // Roadmap tasks state
  const [roadmapSteps, setRoadmapSteps] = useState(COMEBACK_ROADMAP_STEPS);
  const [weeklyCommitment, setWeeklyCommitment] = useState('8 hrs / week');
  const [addedSkills, setAddedSkills] = useState([]);
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  // Focus Timer state
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerIntervalId, setTimerIntervalId] = useState(null);

  // Sync when persona changes
  useEffect(() => {
    if (selectedPersona.field === 'finance') {
      setSelectedField('hr');
    } else if (selectedPersona.field) {
      setSelectedField(selectedPersona.field);
    }
    setBreakStartYear(selectedPersona.breakYears.start);
  }, [selectedPersona]);

  // Get active dataset
  const industryData = INDUSTRY_EVOLUTION_DATA[selectedField] || INDUSTRY_EVOLUTION_DATA.tech;
  const skillGaps = SKILL_GAP_DATABASE[selectedField] || SKILL_GAP_DATABASE.tech;

  // Toggle checklist item
  const toggleTask = (stepId, taskId) => {
    const updated = roadmapSteps.map(step => {
      if (step.id === stepId) {
        const updatedTasks = step.tasks.map(task => {
          if (task.id === taskId) {
            const nextState = !task.done;
            if (nextState) {
              try {
                confetti({
                  particleCount: 50,
                  spread: 60,
                  origin: { y: 0.7 },
                  colors: ['#10B981', '#4F46E5', '#F43F5E']
                });
              } catch (e) {}
            }
            return { ...task, done: nextState };
          }
          return task;
        });
        return { ...step, tasks: updatedTasks };
      }
      return step;
    });

    setRoadmapSteps(updated);
    if (onProgressUpdate) onProgressUpdate(updated);
  };

  // Add skill gap into roadmap
  const handleAddSkillToRoadmap = (skillName) => {
    if (addedSkills.includes(skillName)) return;
    setAddedSkills([...addedSkills, skillName]);

    // Add as custom task to Step 1 or 2
    const updated = roadmapSteps.map(step => {
      if (step.id === 1) {
        return {
          ...step,
          tasks: [
            ...step.tasks,
            { id: `custom-${Date.now()}`, text: `Complete refresher lab for: ${skillName}`, done: false }
          ]
        };
      }
      return step;
    });
    setRoadmapSteps(updated);

    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.5 }
      });
    } catch (e) {}
  };

  // Calculate Roadmap stats
  const totalTasks = roadmapSteps.reduce((acc, step) => acc + step.tasks.length, 0);
  const completedTasks = roadmapSteps.reduce((acc, step) => acc + step.tasks.filter(t => t.done).length, 0);
  const progressPercent = Math.round((completedTasks / totalTasks) * 100) || 0;

  // Timer controls
  const toggleTimer = () => {
    if (isTimerRunning) {
      clearInterval(timerIntervalId);
      setIsTimerRunning(false);
    } else {
      const interval = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsTimerRunning(false);
            alert('🎉 Great job! 25-minute focus session completed.');
            return 25 * 60;
          }
          return prev - 1;
        });
      }, 1000);
      setTimerIntervalId(interval);
      setIsTimerRunning(true);
    }
  };

  const resetTimer = () => {
    clearInterval(timerIntervalId);
    setIsTimerRunning(false);
    setTimerSeconds(25 * 60);
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Hero Header */}
      <div className="glass-card p-6 md:p-8 bg-gradient-to-r from-emerald-50/80 via-white to-indigo-50/80 border border-emerald-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <Compass className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
            TAB 2: Industry Upgrades & Action Roadmap
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Catch Up On <span className="gradient-text-emerald">What Changed</span> & Chart Your Roadmap
          </h1>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Compare 2020/2021 paradigms vs. 2026 industry standards across <strong className="text-indigo-700">Software Engineering</strong>, <strong className="text-rose-600">Marketing</strong>, and <strong className="text-emerald-700">HR & People Ops</strong>.
          </p>
        </div>

        {/* Roadmap Progress Pill */}
        <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-emerald-50 border-4 border-emerald-500 flex items-center justify-center font-extrabold text-emerald-700 text-lg">
            {progressPercent}%
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Roadmap Completion</div>
            <div className="text-sm font-extrabold text-slate-900">{completedTasks} of {totalTasks} Milestones Done</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">On track for 2026 Returnship!</div>
          </div>
        </div>
      </div>

      {/* Module 1: What Changed While I Was Away... */}
      <div className="glass-card p-6 md:p-8 border-slate-200 space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              What Changed While I Was Away...
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Comparative analysis of technologies, AI workflows, and modern tooling since your sabbatical began.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* 3 Common Career Tracks Selector */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setSelectedField('tech')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  selectedField === 'tech' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>Software Engineering</span>
              </button>
              <button
                onClick={() => setSelectedField('marketing')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  selectedField === 'marketing' ? 'bg-white text-rose-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Megaphone className="w-3.5 h-3.5" />
                <span>Marketing & Growth</span>
              </button>
              <button
                onClick={() => setSelectedField('hr')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  selectedField === 'hr' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>HR & People Ops</span>
              </button>
            </div>

            {/* Start Year Dropdown */}
            <select
              value={breakStartYear}
              onChange={(e) => setBreakStartYear(e.target.value)}
              className="text-xs font-semibold p-2 border border-slate-200 rounded-xl bg-white text-slate-700"
            >
              <option value="2018">Away Since 2018 (8 Yrs)</option>
              <option value="2020">Away Since 2020 (6 Yrs)</option>
              <option value="2021">Away Since 2021 (5 Yrs)</option>
              <option value="2022">Away Since 2022 (4 Yrs)</option>
              <option value="2023">Away Since 2023 (3 Yrs)</option>
            </select>
          </div>
        </div>

        {/* Timeline Era Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {industryData.keyChanges.map((era, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="badge badge-indigo text-[11px] font-bold">{era.year}</span>
                <span className="text-[11px] text-slate-400 font-mono">Phase {i+1}</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">{era.era}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{era.whatChanged}</p>
            </div>
          ))}
        </div>

        {/* Tool Replacements: "Then vs Now" Table */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
            Direct Tool & Workflow Replacements (Then vs. 2026 Now)
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {industryData.toolReplacements.map((item, idx) => (
              <div key={idx} className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-sm flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  #{idx+1}
                </div>
                <div className="space-y-1 w-full text-xs">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-slate-400 line-through font-medium">{item.before}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      {item.now}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">{item.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Buzzwords Decoded */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            Top Buzzwords & Concepts Decoded for Interviews ({industryData.title})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {industryData.buzzwordsDecoded.map((bw, i) => (
              <div key={i} className="p-3.5 bg-indigo-50/40 rounded-xl border border-indigo-100 space-y-1">
                <span className="font-bold text-xs text-indigo-950 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  {bw.term}
                </span>
                <p className="text-[11px] text-slate-600 leading-relaxed">{bw.meaning}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Module 2 & 3: Skill-Gap Scanner & Personalized Roadmap Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT: AI Skill-Gap Scanner (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card p-6 border-slate-200 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-600" />
                  AI Skill-Gap Scanner
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">Scanned against 4,500+ active returnship postings</p>
              </div>
              <span className="badge badge-emerald">Scan Complete</span>
            </div>

            {/* 1. Core Validated Strengths */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Validated Core Strengths (Ready to Highlight)
              </div>
              <div className="space-y-1.5">
                {skillGaps.coreStrengths.map((s, i) => (
                  <div key={i} className="p-2.5 bg-emerald-50/70 border border-emerald-200/80 rounded-lg flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-emerald-950">{s.name}</span>
                      <div className="text-[10px] text-emerald-700">{s.tip}</div>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-200">
                      {s.match}% Match
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Critical Modern Gaps */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold text-rose-700 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                Critical Modern Gaps (Highest 2026 ROI)
              </div>
              <div className="space-y-2">
                {skillGaps.criticalGaps.map((g, i) => {
                  const isAdded = addedSkills.includes(g.name);
                  return (
                    <div key={i} className="p-3 bg-rose-50/40 border border-rose-200/80 rounded-xl text-xs space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="font-bold text-slate-900">{g.name}</span>
                          <span className="ml-2 text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded font-semibold">
                            {g.priority}
                          </span>
                        </div>
                        <span className="text-[11px] font-semibold text-slate-500 shrink-0">{g.estHours}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-snug">{g.desc}</p>
                      
                      <button
                        onClick={() => handleAddSkillToRoadmap(g.name)}
                        disabled={isAdded}
                        className={`w-full py-1.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                          isAdded 
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                            : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Added to Roadmap Checklist</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>+ Add to My Roadmap</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Refreshers */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                Quick Refreshers (3-8 Hour Sprints)
              </div>
              <div className="space-y-1.5">
                {skillGaps.quickRefreshers.map((r, i) => (
                  <div key={i} className="p-2.5 bg-amber-50/50 border border-amber-200/80 rounded-lg flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold text-slate-900">{r.name}</span>
                      <div className="text-[10px] text-amber-800 font-medium">Recommended: {r.link}</div>
                    </div>
                    <span className="text-[11px] font-bold text-amber-700">{r.estHours}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Pomodoro Focus Study Timer Widget */}
          <div className="glass-card p-5 border-slate-200 bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="font-bold text-xs uppercase tracking-wider text-indigo-200">Study Sprint Timer</span>
              </div>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-semibold">25m Focus Block</span>
            </div>

            <div className="flex items-center justify-between py-1">
              <div className="text-4xl font-extrabold font-mono tracking-tight text-white">
                {formatTimer(timerSeconds)}
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTimer}
                  className={`p-2.5 rounded-xl font-bold flex items-center gap-1.5 shadow-lg transition-transform active:scale-95 ${
                    isTimerRunning ? 'bg-amber-500 hover:bg-amber-600 text-slate-950' : 'bg-emerald-500 hover:bg-emerald-600 text-slate-950'
                  }`}
                >
                  {isTimerRunning ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                  <span className="text-xs">{isTimerRunning ? 'Pause' : 'Start Focus'}</span>
                </button>
                <button
                  onClick={resetTimer}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-[11px] text-indigo-200/90 leading-snug">
              Dedicate 1 Pomodoro sprint daily while babies nap or school is in session to finish your 8-week roadmap effortlessly.
            </p>
          </div>
        </div>

        {/* RIGHT: Personalized Comeback Roadmap (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card p-6 md:p-7 border-slate-200 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                  Personalized 8-Week Comeback Roadmap
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Milestone checklist structured to fit parenting schedules with high impact.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={weeklyCommitment}
                  onChange={(e) => setWeeklyCommitment(e.target.value)}
                  className="text-xs font-semibold p-1.5 border border-slate-200 rounded-lg bg-white text-slate-700"
                >
                  <option value="5 hrs / week">5 hrs / week (Light Pace)</option>
                  <option value="8 hrs / week">8 hrs / week (Recommended)</option>
                  <option value="15 hrs / week">15 hrs / week (Accelerated)</option>
                </select>

                <button
                  onClick={() => setShowCalendarModal(true)}
                  className="btn btn-sm btn-secondary text-xs flex items-center gap-1"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Sync Calendar</span>
                </button>
              </div>
            </div>

            {/* Roadmap Steps */}
            <div className="space-y-6">
              {roadmapSteps.map((step) => {
                const stepTotal = step.tasks.length;
                const stepDone = step.tasks.filter(t => t.done).length;
                const isStepComplete = stepDone === stepTotal && stepTotal > 0;

                return (
                  <div 
                    key={step.id} 
                    className={`p-5 rounded-2xl border transition-all ${
                      isStepComplete 
                        ? 'bg-emerald-50/40 border-emerald-300' 
                        : 'bg-white border-slate-200/90 shadow-sm'
                    }`}
                  >
                    {/* Step Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="badge badge-indigo font-bold text-[11px]">{step.week}</span>
                          <span className={`badge text-[10px] font-bold ${
                            step.status === 'Completed' ? 'badge-emerald' :
                            step.status === 'In Progress' ? 'badge-amber' : 'badge-slate'
                          }`}>
                            {step.status === 'Completed' ? '✅ Completed' :
                             step.status === 'In Progress' ? '🟡 In Progress' : '⚪ Pending'}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-slate-900 mt-1">{step.title}</h3>
                        <p className="text-xs text-slate-600 mt-0.5">{step.description}</p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          isStepComplete ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {stepDone}/{stepTotal} Done
                        </span>
                        <div className="text-[10px] text-slate-400 mt-1">{step.estTime}</div>
                      </div>
                    </div>

                    {/* Step Tasks List */}
                    <div className="space-y-2 mt-4 pt-3 border-t border-slate-100">
                      {step.tasks.map((task) => (
                        <div
                          key={task.id}
                          onClick={() => toggleTask(step.id, task.id)}
                          className={`flex items-start gap-3 p-2.5 rounded-xl cursor-pointer transition-all ${
                            task.done 
                              ? 'bg-emerald-50/80 text-emerald-950 line-through opacity-80' 
                              : 'hover:bg-slate-50 text-slate-800'
                          }`}
                        >
                          <div className="mt-0.5 shrink-0">
                            {task.done ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                            ) : (
                              <Circle className="w-4 h-4 text-slate-400" />
                            )}
                          </div>
                          <span className="text-xs font-medium leading-relaxed select-none">
                            {task.text}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Step Resource Footer */}
                    <div className="mt-3 pt-2 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="flex items-center gap-1 font-medium text-indigo-700">
                        <BookOpen className="w-3.5 h-3.5" />
                        Resource: {step.resource}
                      </span>
                      <span className="text-slate-400">Weekly Target: {step.estTime}</span>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        </div>

      </div>

      {/* Calendar Sync Modal */}
      {showCalendarModal && (
        <div className="modal-backdrop" onClick={() => setShowCalendarModal(false)}>
          <div className="modal-content p-6 sm:p-8 max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-100 text-indigo-700">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Sync Comeback Schedule</h3>
              </div>
              <button 
                onClick={() => setShowCalendarModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              ReHer automatically creates recurring 45-minute focus blocks tailored around your family routine (e.g. morning calm hours or school pickup blocks).
            </p>

            <div className="space-y-3 mb-6">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <span className="font-bold text-slate-800">📅 Recommended Frequency:</span>
                <div className="text-slate-600 mt-1">4 sessions/week × 45 mins = 3 hours weekly dedicated focus.</div>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 font-medium">
                ✅ Pre-populated with Week 1-8 milestones & practice links.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  alert('📅 Google Calendar events (.ics) downloaded! Check your downloads folder.');
                  setShowCalendarModal(false);
                }}
                className="btn btn-primary w-full text-xs py-2.5"
              >
                Export to Google / Apple Calendar (.ics)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
