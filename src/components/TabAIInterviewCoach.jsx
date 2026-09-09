// src/components/TabAIInterviewCoach.jsx
import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  Send, 
  Copy, 
  Check, 
  Volume2, 
  VolumeX, 
  RefreshCw, 
  AlertCircle, 
  ArrowRight, 
  Bot, 
  ShieldCheck, 
  Lightbulb, 
  SlidersHorizontal,
  FileText,
  Clock,
  Play,
  Pause,
  MessageSquare,
  HelpCircle,
  TrendingUp,
  UserCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { WORK_MODES } from '../data/personas';

export const PRESET_PRACTICE_SCENARIOS = [
  {
    id: 'break-explanation',
    title: 'Explain Career Sabbatical',
    question: 'How do you explain your 3-year caregiving break to an executive hiring panel?',
    category: 'Career Sabbatical',
    difficulty: 'Crucial for Relaunch',
    suggestedKeywords: ['Intentional Sabbatical', 'Leadership', 'Resource Allocation', 'Upskilling', 'Active Fluency'],
    idealAnswerOutline: '1. Own the break with confidence in 1 sentence. 2. Highlight competencies gained (agility, budgeting, stakeholder management). 3. Transition to 2026 tech readiness and enthusiasm for the returnship.'
  },
  {
    id: 'adapt-technology',
    title: 'Adapting to 2026 Tech',
    question: 'Tell me about a time you adapted quickly to modern technology and AI developer tools.',
    category: 'Technical Adaptability',
    difficulty: 'Core Competency',
    suggestedKeywords: ['Generative AI', 'Notion AI', 'Continuous Learning', 'Hands-on Projects', 'Velocity'],
    idealAnswerOutline: '1. State the challenge and need to upskill. 2. Detail specific toolchains mastered (ChatGPT, Notion AI, Figma, Modern JS). 3. Share a concrete outcome or workflow improvement.'
  },
  {
    id: 'returning-now',
    title: 'Why Returning Now?',
    question: 'Why are you interested in returning to your career field at this specific moment?',
    category: 'Motivation & Focus',
    difficulty: 'Standard Behavioral',
    suggestedKeywords: ['Strategic Timing', 'Family Logistics In Place', 'Eager for Impact', 'Dedicated Focus'],
    idealAnswerOutline: '1. Reiterate that family care infrastructure is structured and reliable. 2. Emphasize excitement to solve business challenges with renewed energy.'
  },
  {
    id: 'async-collaboration',
    title: 'Async & Remote Delivery',
    question: 'How do you manage asynchronous communication and avoid blockers in remote or hybrid teams?',
    category: 'Work-Mode Mastery',
    difficulty: 'Modern Workplace',
    suggestedKeywords: ['Over-communication', 'Loom Demos', 'Documentation First', 'Time-blocking'],
    idealAnswerOutline: '1. Share personal documentation philosophy. 2. Mention tools used (Slack async, Notion wikis, Loom). 3. Give an example of proactive contingency management.'
  },
  {
    id: 'conflict-prioritization',
    title: 'Prioritization & Conflict',
    question: 'Describe a complex scenario where competing priorities collided and how you resolved them.',
    category: 'Leadership & EQ',
    difficulty: 'Executive',
    suggestedKeywords: ['Empathy', 'Data-backed Tradeoffs', 'Stakeholder Alignment', 'Calm De-escalation'],
    idealAnswerOutline: '1. Situation & Task context. 2. Structured Action taken to align priorities. 3. Result and measurable positive outcome.'
  }
];

export const TabAIInterviewCoach = ({ 
  selectedPersona, 
  preferredWorkMode = 'remote',
  onDrillComplete 
}) => {
  // Scenario Selection State
  const [selectedScenario, setSelectedScenario] = useState(PRESET_PRACTICE_SCENARIOS[0]);
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedbackResult, setFeedbackResult] = useState(null);
  const [copiedPitch, setCopiedPitch] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioTargetText, setAudioTargetText] = useState('');

  // 30-Second Relaunch Pitch Generator State
  const [pastRole, setPastRole] = useState(selectedPersona?.title?.split('→')[0]?.trim() || 'Senior Marketing Coordinator');
  const [breakLength, setBreakLength] = useState(selectedPersona?.breakDuration || '3.5 Years');
  const [targetRole, setTargetRole] = useState(selectedPersona?.targetRole || 'Marketing & Project Operations Lead');
  const [generatedPitch, setGeneratedPitch] = useState('');

  const currentModeInfo = WORK_MODES.find(m => m.id === preferredWorkMode) || WORK_MODES[0];

  // Auto-generate initial pitch when persona changes
  useEffect(() => {
    const pRole = selectedPersona?.title?.split('→')[0]?.trim() || 'Senior Professional';
    const bLen = selectedPersona?.breakDuration || '3-year break';
    const tRole = selectedPersona?.targetRole || 'Lead Contributor';
    setPastRole(pRole);
    setBreakLength(bLen);
    setTargetRole(tRole);
    build30SecPitch(pRole, bLen, tRole);
    setUserAnswer('');
    setFeedbackResult(null);
  }, [selectedPersona]);

  // Pitch Builder Helper
  const build30SecPitch = (past, bLen, target) => {
    const pitch = `With ${selectedPersona?.yearsExp || 'prior solid experience'} as a ${past}, I stepped away for an intentional ${bLen} dedicated to caregiving and community leadership—where I honed rapid resource scheduling, high-stakes budget allocation, and mastered modern tools like ${currentModeInfo.toolHighlight}. I am now returning with energized focus to drive high-impact results as your next ${target} in your ${currentModeInfo.label} environment.`;
    setGeneratedPitch(pitch);
    return pitch;
  };

  // Populate sample response for quick practice
  const handleLoadSampleAnswer = () => {
    if (selectedScenario.id === 'break-explanation') {
      setUserAnswer(`During my intentional 3.5-year career sabbatical, I dedicated myself to family caregiving while actively serving as President of our school's community initiative, where I managed 35 volunteers and a $45K budget. Throughout this pause, I maintained strict operational rigor and upskilled in 2026 AI toolchains including Notion AI and ChatGPT workflows. With family systems fully organized, I am eager to apply this enriched emotional intelligence and execution velocity to your team.`);
    } else if (selectedScenario.id === 'adapt-technology') {
      setUserAnswer(`When returning to tech, I recognized that workflows had evolved toward generative AI copilots and asynchronous documentation. I designed a self-directed curriculum mastering Notion AI, Figma component architectures, and Slack async workflows to accelerate deliverable velocity. In a recent mock sprint, I used AI pair-programming to reduce sprint documentation overhead by 30%.`);
    } else {
      setUserAnswer(`I am returning with complete intentionality. Having organized resilient family logistics and completed rigorous technical refreshers in modern cloud and agile tooling, I bring both 6+ years of core corporate architecture experience and fresh perspective to solve high-impact problems.`);
    }
  };

  // Intelligent Response Evaluation Function
  const handleAnalyzeResponse = () => {
    if (!userAnswer.trim()) return;

    setIsAnalyzing(true);
    setFeedbackResult(null);

    setTimeout(() => {
      setIsAnalyzing(false);

      const text = userAnswer.toLowerCase();
      const wordCount = userAnswer.trim().split(/\s+/).length;

      // 1. Evaluate Clarity & Tone (Checks for confidence vs. apologetic language)
      const apologeticKeywords = ['sorry', 'just a mom', 'just stayed home', 'fell behind', 'out of the loop', 'unfortunately', 'lost my skills', 'only'];
      const confidentKeywords = ['intentional', 'sabbatical', 'spearheaded', 'managed', 'upskilled', 'leadership', 'delivered', 'rigor', 'agility', 'orchestrated', 'mastered'];

      const detectedApologetic = apologeticKeywords.filter(w => text.includes(w));
      const detectedConfident = confidentKeywords.filter(w => text.includes(w));

      let toneScore = 90;
      let toneFeedback = 'Excellent executive presence! You framed your sabbatical as an active leadership choice without unnecessary apologies.';
      let toneStatus = 'Confident & Executive';

      if (detectedApologetic.length > 0) {
        toneScore -= detectedApologetic.length * 8;
        toneFeedback = `Watch out for apologetic phrases like "${detectedApologetic.join(', ')}". Replace them with confident ownership terms like "intentional sabbatical" or "strategic pause".`;
        toneStatus = 'Needs Confidence Reframing';
      } else if (detectedConfident.length >= 2) {
        toneScore = 96;
        toneFeedback = `Outstanding framing! Terms like "${detectedConfident.slice(0, 3).join(', ')}" convey commanding leadership and proactive self-direction.`;
        toneStatus = 'Strong Executive Tone';
      }

      // 2. Evaluate Key Strengths & Keywords
      const foundKeywords = selectedScenario.suggestedKeywords.filter(k => 
        text.includes(k.toLowerCase()) || text.includes(k.split(' ')[0].toLowerCase())
      );

      const keyStrengthsList = [
        wordCount >= 40 ? 'Well-structured response length providing concrete depth without rambling.' : 'Concise and direct response delivery.',
        foundKeywords.length > 0 ? `Effectively highlighted domain themes: ${foundKeywords.join(', ')}.` : 'Highlighted adaptability and professional commitment.',
        text.includes('upskill') || text.includes('modern') || text.includes('ai') || text.includes('notion') ? 'Emphasized contemporary 2026 toolchain proficiency.' : 'Showcased problem-solving and operational focus.'
      ];

      // 3. Improvement Tip (STAR Alignment)
      let starTip = '';
      const hasAction = text.includes('i led') || text.includes('i managed') || text.includes('i designed') || text.includes('i upskilled') || text.includes('i orchestrated') || text.includes('i served');
      const hasResult = text.includes('%') || text.includes('$') || text.includes('reduced') || text.includes('delivered') || text.includes('result') || text.includes('successfully') || text.includes('outcome');

      if (!hasAction) {
        starTip = 'STAR Action Tip: Be more specific about YOUR exact actions rather than passive verbs (use: "I orchestrated...", "I architected...", "I directed...").';
      } else if (!hasResult) {
        starTip = 'STAR Result Tip: Strengthen the ending by quantifying outcomes (e.g., "resulting in a 30% reduction in prep time", or "delivering 100% on-time milestone delivery").';
      } else {
        starTip = 'STAR Alignment: Strong balance of Situation, Action, and measurable Result. To make it unforgettable, connect the result to the specific employer returnship.';
      }

      const overallScore = Math.min(98, Math.max(78, Math.round((toneScore + (foundKeywords.length * 3) + (hasResult ? 5 : 0)))));

      const result = {
        score: overallScore,
        wordCount,
        tone: {
          status: toneStatus,
          feedback: toneFeedback,
          score: toneScore
        },
        strengths: keyStrengthsList,
        starTip,
        suggestedRewrite: `"${selectedScenario.idealAnswerOutline.replace(/1\. /g, '').replace(/2\. /g, ' Furthermore, ').replace(/3\. /g, ' Ultimately, ')}"`
      };

      setFeedbackResult(result);

      // Trigger celebration
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#4F46E5', '#10B981', '#F59E0B']
        });
      } catch (e) {}

      if (onDrillComplete) {
        onDrillComplete();
      }
    }, 900);
  };

  // Text-to-Speech audio reader
  const handleToggleSpeech = (textToRead) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isPlayingAudio && audioTargetText === textToRead) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      setAudioTargetText('');
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.95;
      utterance.pitch = 1.05;
      utterance.onend = () => {
        setIsPlayingAudio(false);
        setAudioTargetText('');
      };
      utterance.onerror = () => {
        setIsPlayingAudio(false);
        setAudioTargetText('');
      };
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
      setAudioTargetText(textToRead);
    }
  };

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(generatedPitch);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Hero Header */}
      <div className="glass-card p-6 md:p-8 bg-gradient-to-r from-indigo-50/80 via-white to-rose-50/80 border border-indigo-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold">
            <Bot className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
            AI Interview Coach & Sabbatical Reframing
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Master Your <span className="gradient-text-primary">Comeback Interview</span>
          </h1>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Practice answering pivotal returnship interview questions with instant AI feedback on <strong>Clarity & Tone</strong>, <strong>Key Strengths</strong>, and <strong>STAR Method</strong> alignment.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-indigo-200 shadow-sm shrink-0">
          <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-black text-lg">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Coach Status</div>
            <div className="text-sm font-extrabold text-slate-900">Active Rubric Evaluation</div>
            <div className="text-[11px] text-emerald-600 font-bold">✅ STAR & Confidence Checkers Enabled</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Practice Scenarios & Instant AI Analyzer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Preset Practice Scenarios (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-card p-5 border-slate-200 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h2 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-600" />
                Practice Scenarios
              </h2>
              <span className="badge badge-indigo text-[10px] font-bold">5 Scenarios</span>
            </div>

            <p className="text-xs text-slate-500">
              Select a scenario tailored for career relaunchers to practice your response:
            </p>

            <div className="space-y-2 pt-1">
              {PRESET_PRACTICE_SCENARIOS.map((scenario) => {
                const isSelected = selectedScenario.id === scenario.id;
                return (
                  <button
                    key={scenario.id}
                    onClick={() => {
                      setSelectedScenario(scenario);
                      setFeedbackResult(null);
                    }}
                    className={`w-full p-3 rounded-xl text-left border transition-all text-xs flex flex-col gap-1 ${
                      isSelected
                        ? 'bg-indigo-50/90 border-indigo-500 text-indigo-950 shadow-sm'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span>{scenario.title}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-md ${
                        isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {scenario.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                      "{scenario.question}"
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tips Callout Card */}
          <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 text-xs space-y-2">
            <div className="flex items-center gap-2 font-extrabold text-emerald-900">
              <Lightbulb className="w-4 h-4 text-emerald-600" />
              <span>Coach's Gold Standard: STAR Structure</span>
            </div>
            <p className="text-emerald-800 text-[11px] leading-relaxed">
              <strong>S</strong>ituation: Set the context briefly.<br />
              <strong>T</strong>ask: State the objective or problem.<br />
              <strong>A</strong>ction: Detail what <em>you</em> specifically orchestrated.<br />
              <strong>R</strong>esult: Quantify the outcome with metrics & confidence.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Response Area & Instant AI Feedback (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Active Question Box */}
          <div className="glass-card p-6 border-slate-200 space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="badge badge-indigo text-xs font-bold">{selectedScenario.category}</span>
                <span className="badge badge-emerald text-xs font-bold">{selectedScenario.difficulty}</span>
              </div>
              
              <button
                type="button"
                onClick={handleLoadSampleAnswer}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 self-start sm:self-auto"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Insert Sample Response</span>
              </button>
            </div>

            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                "{selectedScenario.question}"
              </h2>
              <div className="flex flex-wrap items-center gap-1.5 mt-2">
                <span className="text-[11px] text-slate-400 font-semibold">Suggested Power Keywords:</span>
                {selectedScenario.suggestedKeywords.map((kw, i) => (
                  <span key={i} className="badge badge-slate text-[10px] font-medium">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Answer Textarea */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Your Practice Response:</span>
                <span>{userAnswer.trim() ? `${userAnswer.trim().split(/\s+/).length} words` : '0 words'}</span>
              </div>
              <textarea
                rows={6}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type or speak your answer here... Focus on framing your break with confidence and highlighting your continuous technical upskilling."
                className="form-textarea text-xs sm:text-sm leading-relaxed bg-white border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 font-sans"
              />
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleSpeech(userAnswer || selectedScenario.question)}
                  disabled={!userAnswer.trim() && !selectedScenario.question}
                  className="btn btn-sm btn-secondary text-xs flex items-center gap-1.5"
                  title="Listen with Speech Synthesis"
                >
                  {isPlayingAudio ? (
                    <>
                      <Pause className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Pause Audio</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Listen to Audio</span>
                    </>
                  )}
                </button>
              </div>

              <button
                type="button"
                onClick={handleAnalyzeResponse}
                disabled={isAnalyzing || !userAnswer.trim()}
                className="btn btn-primary text-xs sm:text-sm py-2.5 px-6 flex items-center gap-2 font-bold shadow-md"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing Response...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Analyze Response with AI</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Instant AI Feedback Breakdown Card */}
          {feedbackResult && (
            <div className="glass-card p-6 border-indigo-200 bg-gradient-to-b from-indigo-50/40 via-white to-white space-y-5 animate-slideUp shadow-md">
              
              {/* Feedback Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-indigo-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-sm">
                    {feedbackResult.score}%
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-extrabold text-slate-900">AI Response Evaluation</h3>
                      <span className="badge badge-emerald font-bold">Rubric Verified</span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Evaluated across Tone, Professional Strengths, and STAR methodology
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                    {feedbackResult.tone.status}
                  </span>
                </div>
              </div>

              {/* 3 Clear Category Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* 1. Clarity & Tone */}
                <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-indigo-600" />
                      1. Clarity & Tone
                    </span>
                    <span className="text-xs font-bold text-emerald-700">{feedbackResult.tone.score}%</span>
                  </div>
                  <p className="text-[11.5px] text-slate-600 leading-relaxed">
                    {feedbackResult.tone.feedback}
                  </p>
                </div>

                {/* 2. Key Strengths */}
                <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      2. Key Strengths
                    </span>
                    <span className="text-xs font-bold text-emerald-700">Verified</span>
                  </div>
                  <ul className="space-y-1 text-[11px] text-slate-600 list-disc pl-3.5 leading-snug">
                    {feedbackResult.strengths.map((str, idx) => (
                      <li key={idx}>{str}</li>
                    ))}
                  </ul>
                </div>

                {/* 3. Improvement Tip (STAR) */}
                <div className="p-4 bg-white rounded-xl border border-amber-200 bg-amber-50/30 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4 text-amber-600" />
                      3. STAR Improvement Tip
                    </span>
                    <span className="text-xs font-bold text-amber-700">Actionable</span>
                  </div>
                  <p className="text-[11.5px] text-amber-950 leading-relaxed font-medium">
                    {feedbackResult.starTip}
                  </p>
                </div>

              </div>

              {/* Model STAR Outline Callout */}
              <div className="p-4 bg-indigo-50/70 rounded-xl border border-indigo-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                    <Bot className="w-4 h-4 text-indigo-600" />
                    AI-Recommended Model Answer Delivery
                  </span>
                  <button
                    type="button"
                    onClick={() => handleToggleSpeech(feedbackResult.suggestedRewrite)}
                    className="text-xs text-indigo-700 hover:text-indigo-900 font-bold flex items-center gap-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Listen</span>
                  </button>
                </div>
                <p className="text-xs text-indigo-950 italic leading-relaxed bg-white/80 p-3 rounded-lg border border-indigo-100">
                  {feedbackResult.suggestedRewrite}
                </p>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Module: 30-Second Relaunch Pitch Generator */}
      <div className="glass-card p-6 md:p-8 border-slate-200 space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-slate-900">
                30-Second Relaunch Pitch Builder
              </h2>
              <span className="badge badge-indigo font-bold">Fast Generator</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Quickly assemble a crisp elevator pitch for networking events, initial recruiter screens, and executive introductions.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              const p = selectedPersona?.title?.split('→')[0]?.trim() || 'Senior Professional';
              const b = selectedPersona?.breakDuration || '3-year sabbatical';
              const t = selectedPersona?.targetRole || 'Team Lead';
              setPastRole(p);
              setBreakLength(b);
              setTargetRole(t);
              build30SecPitch(p, b, t);
            }}
            className="btn btn-sm btn-secondary text-xs flex items-center gap-1.5"
          >
            <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
            <span>Load Persona Data</span>
          </button>
        </div>

        {/* 3 Form Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="form-label text-xs font-bold">1. Past Role & Specialization</label>
            <input
              type="text"
              value={pastRole}
              onChange={(e) => {
                setPastRole(e.target.value);
                build30SecPitch(e.target.value, breakLength, targetRole);
              }}
              placeholder="e.g. Senior Marketing Coordinator"
              className="form-input text-xs font-medium"
            />
          </div>

          <div>
            <label className="form-label text-xs font-bold">2. Sabbatical Duration</label>
            <input
              type="text"
              value={breakLength}
              onChange={(e) => {
                setBreakLength(e.target.value);
                build30SecPitch(pastRole, e.target.value, targetRole);
              }}
              placeholder="e.g. 3.5-Year Caregiving Sabbatical"
              className="form-input text-xs font-medium"
            />
          </div>

          <div>
            <label className="form-label text-xs font-bold">3. Target Role & Mode</label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => {
                setTargetRole(e.target.value);
                build30SecPitch(pastRole, breakLength, e.target.value);
              }}
              placeholder="e.g. Marketing & Project Operations Lead"
              className="form-input text-xs font-medium"
            />
          </div>
        </div>

        {/* Output Pitch Box */}
        <div className="p-5 bg-gradient-to-r from-indigo-50/70 via-white to-amber-50/70 rounded-2xl border border-indigo-200 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              Generated 30-Second Relaunch Pitch ({currentModeInfo.label}):
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleToggleSpeech(generatedPitch)}
                className="btn btn-sm btn-ghost text-xs text-indigo-700 hover:bg-indigo-100/60 flex items-center gap-1"
              >
                {isPlayingAudio && audioTargetText === generatedPitch ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Listen</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleCopyPitch}
                className="btn btn-sm btn-secondary text-xs flex items-center gap-1"
              >
                {copiedPitch ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPitch ? 'Copied' : 'Copy Pitch'}</span>
              </button>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-mono bg-white p-4 rounded-xl border border-slate-200">
            {generatedPitch}
          </p>
        </div>

      </div>

    </div>
  );
};
