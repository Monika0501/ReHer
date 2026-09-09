import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  Heart, 
  ShieldCheck, 
  RefreshCw, 
  ArrowRight, 
  Play, 
  Pause, 
  BookOpen, 
  DollarSign, 
  Wind,
  HelpCircle,
  TrendingUp,
  MessageSquare,
  SlidersHorizontal,
  Home,
  Building,
  Clock
} from 'lucide-react';
import { MOCK_INTERVIEW_QUESTIONS, CONFIDENCE_COACH_DATA } from '../data/mockData';
import { WORK_MODES } from '../data/personas';
import { AudioVisualizer } from './AudioVisualizer';
import confetti from 'canvas-confetti';

export const Tab3AICoaching = ({ 
  selectedPersona, 
  preferredWorkMode = 'remote',
  onDrillComplete 
}) => {
  const [selectedQuestionFilter, setSelectedQuestionFilter] = useState(preferredWorkMode);
  
  // Filter questions by selected work mode
  const filteredQuestions = MOCK_INTERVIEW_QUESTIONS.filter(q => 
    q.workModeTag === 'all' || q.workModeTag === selectedQuestionFilter
  );

  // Question & Practice State
  const [selectedQuestion, setSelectedQuestion] = useState(filteredQuestions[0] || MOCK_INTERVIEW_QUESTIONS[0]);
  const [userAnswer, setUserAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [recordTimerId, setRecordTimerId] = useState(null);
  
  // AI Evaluation State
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evalResult, setEvalResult] = useState(null);
  const [isPlayingModelAudio, setIsPlayingModelAudio] = useState(false);

  // Confidence Coach State
  const [activeAffirmationIndex, setActiveAffirmationIndex] = useState(0);
  const [isPlayingAffirmation, setIsPlayingAffirmation] = useState(false);
  const [activeBusterTab, setActiveBusterTab] = useState(0);
  
  // Breathing Warmup State
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState('Inhale (4s)');
  const [breathCount, setBreathCount] = useState(4);

  const currentModeInfo = WORK_MODES.find(m => m.id === preferredWorkMode) || WORK_MODES[0];
  const affirmations = CONFIDENCE_COACH_DATA.dailyAffirmations;
  const imposterBusters = CONFIDENCE_COACH_DATA.imposterBusters;
  const negotiationTips = CONFIDENCE_COACH_DATA.negotiationTips;

  // Sync when preferredWorkMode changes
  useEffect(() => {
    setSelectedQuestionFilter(preferredWorkMode);
    const matched = MOCK_INTERVIEW_QUESTIONS.find(q => q.workModeTag === preferredWorkMode) || MOCK_INTERVIEW_QUESTIONS[0];
    setSelectedQuestion(matched);
    setUserAnswer('');
    setEvalResult(null);
  }, [preferredWorkMode]);

  // Handle Question change
  const handleSelectQuestion = (q) => {
    setSelectedQuestion(q);
    setUserAnswer('');
    setEvalResult(null);
  };

  // Pre-fill answer draft for quick testing tailored to work mode
  const handlePreFillAnswer = () => {
    if (selectedQuestion.workModeTag === 'remote') {
      setUserAnswer(
        "I thrive in remote environments through structured time-blocking and asynchronous discipline. In my dedicated home office, I set clear daily milestone sprints and document decisions transparently in Notion and Loom so my distributed team stays in sync without excessive meetings. Our family childcare routine is fully established, enabling uninterrupted focus during core work hours."
      );
    } else if (selectedQuestion.workModeTag === 'hybrid') {
      setUserAnswer(
        "I treat hybrid working as the ideal balance. On in-office days, I prioritize face-to-face collaboration, whiteboarding, and team mentorship. On remote days, I execute deep, uninterrupted focus blocks. Living 20 minutes from the hub with organized family schedules ensures 100% reliable punctuality on in-person days."
      );
    } else {
      setUserAnswer(
        "I took an intentional 4-year break to care for my young twins, while also serving on our local STEM educational board. During this sabbatical, I stayed disciplined and dedicated over 120 hours to learning modern Next.js and cloud architectures. I'm energized to combine my 6 years of core engineering with this refreshed modern toolchain to deliver high-impact results in your returnship program."
      );
    }
  };

  // Recording toggle simulation
  const toggleRecording = () => {
    if (isRecording) {
      clearInterval(recordTimerId);
      setIsRecording(false);
      if (!userAnswer) {
        handlePreFillAnswer();
      }
    } else {
      setIsRecording(true);
      setRecordSeconds(0);
      const interval = setInterval(() => {
        setRecordSeconds(prev => prev + 1);
      }, 1000);
      setRecordTimerId(interval);
    }
  };

  // Run AI Evaluation with scoring
  const handleEvaluateAnswer = () => {
    if (!userAnswer.trim()) {
      alert('Please type or record an answer first!');
      return;
    }

    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
      const result = {
        overallScore: 93,
        confidenceScore: 9.5,
        reframeScore: 9.2,
        starScore: 9.0,
        workModeScore: 9.6,
        strengths: [
          `Clear, proactive demonstration of ${currentModeInfo.label} self-direction and reliability.`,
          'Unapologetic framing of the sabbatical as intentional leadership and operational discipline.',
          'Highlighted concrete async/collaboration tools and dedicated boundary management.'
        ],
        improvements: [
          'Add one specific past metric from your prior corporate experience to reinforce the STAR closing statement.',
          'Mention your excitement about the returnship mentorship cohort.'
        ],
        modelAnswer: selectedQuestion.sampleIdealAnswer
      };
      setEvalResult(result);

      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#4F46E5', '#10B981', '#F43F5E']
        });
      } catch (e) {}

      if (onDrillComplete) onDrillComplete();
    }, 1000);
  };

  // Speech Synthesizer for Model Answer
  const toggleModelAnswerAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isPlayingModelAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingModelAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(selectedQuestion.sampleIdealAnswer);
      utterance.rate = 0.95;
      utterance.onend = () => setIsPlayingModelAudio(false);
      utterance.onerror = () => setIsPlayingModelAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingModelAudio(true);
    }
  };

  // Speech for Affirmation
  const toggleAffirmationAudio = () => {
    if (!('speechSynthesis' in window)) return;
    if (isPlayingAffirmation) {
      window.speechSynthesis.cancel();
      setIsPlayingAffirmation(false);
    } else {
      window.speechSynthesis.cancel();
      const current = affirmations[activeAffirmationIndex];
      const utterance = new SpeechSynthesisUtterance(current.quote);
      utterance.rate = 0.9;
      utterance.pitch = 1.05;
      utterance.onend = () => setIsPlayingAffirmation(false);
      utterance.onerror = () => setIsPlayingAffirmation(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAffirmation(true);
    }
  };

  // Breathing Box Timer Simulation
  useEffect(() => {
    let timer;
    if (isBreathingActive) {
      const phases = [
        { name: 'Inhale through nose (4s)', color: 'text-indigo-600' },
        { name: 'Hold with calm power (4s)', color: 'text-rose-600' },
        { name: 'Slow exhale through mouth (4s)', color: 'text-emerald-600' },
        { name: 'Hold & center yourself (4s)', color: 'text-amber-600' }
      ];
      let phaseIdx = 0;
      let count = 4;

      timer = setInterval(() => {
        count -= 1;
        if (count <= 0) {
          phaseIdx = (phaseIdx + 1) % 4;
          setBreathPhase(phases[phaseIdx].name);
          count = 4;
        }
        setBreathCount(count);
      }, 1000);
    } else {
      setBreathPhase('Ready to Begin');
      setBreathCount(4);
    }

    return () => clearInterval(timer);
  }, [isBreathingActive]);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Hero Banner */}
      <div className="glass-card p-6 md:p-8 bg-gradient-to-r from-indigo-50/80 via-white to-rose-50/80 border border-indigo-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold">
            <Mic className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
            TAB 3: AI Interview Comeback Coach & Confidence Engine
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Master Gap & <span className="gradient-text-primary">{currentModeInfo.label}</span> Questions
          </h1>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Practice tough inquiries on explaining your career sabbatical and proving high reliability in your target <strong className="text-indigo-700">{currentModeInfo.label}</strong> work mode.
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-indigo-200 shadow-sm flex items-center gap-3">
          <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Work Mode Focus</div>
            <div className="text-sm font-extrabold text-slate-900">{currentModeInfo.icon} {currentModeInfo.label}</div>
            <div className="text-[11px] text-indigo-600 font-semibold">AI STAR Rubric Active</div>
          </div>
        </div>
      </div>

      {/* Grid: Left AI Interview Coach & Right AI Confidence Coach */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT: AI Interview Coach (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="glass-card p-6 md:p-7 border-slate-200 space-y-5">
            
            {/* Header & Work Mode Drill Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-indigo-600" />
                  Mock Interview Drill
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">Select a career gap or work-mode question</p>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs overflow-x-auto">
                <button
                  onClick={() => setSelectedQuestionFilter('remote')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                    selectedQuestionFilter === 'remote' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  🏠 Remote
                </button>
                <button
                  onClick={() => setSelectedQuestionFilter('hybrid')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                    selectedQuestionFilter === 'hybrid' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  🏢 Hybrid
                </button>
                <button
                  onClick={() => setSelectedQuestionFilter('onsite')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                    selectedQuestionFilter === 'onsite' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  🏛️ Onsite
                </button>
                <button
                  onClick={() => setSelectedQuestionFilter('flexible')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                    selectedQuestionFilter === 'flexible' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  ⏱️ Flex
                </button>
              </div>
            </div>

            {/* Question Selector Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filteredQuestions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => handleSelectQuestion(q)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedQuestion.id === q.id
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-bold opacity-80 uppercase">
                    <span>{q.difficulty}</span>
                    <span>{q.workModeTag === 'all' ? 'All Modes' : q.workModeTag.toUpperCase()}</span>
                  </div>
                  <div className="text-xs font-bold mt-1 line-clamp-1">{q.category}</div>
                </button>
              ))}
            </div>

            {/* Active Question Card */}
            <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs text-indigo-300">
                <span className="font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Interviewer Prompt:
                </span>
                <span className="badge badge-indigo text-[10px]">{selectedQuestion.difficulty}</span>
              </div>
              <p className="text-sm sm:text-base font-bold text-white leading-snug">
                "{selectedQuestion.question}"
              </p>
              <p className="text-xs text-slate-300/80 pt-1">
                💡 <strong className="text-indigo-200">Context:</strong> {selectedQuestion.context}
              </p>
            </div>

            {/* Answer Input Area */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-slate-700">Your Response (Voice or Text):</label>
                <button
                  onClick={handlePreFillAnswer}
                  className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Pre-fill Sample Answer</span>
                </button>
              </div>

              <textarea
                rows={5}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your response here, or click the mic button below to record your voice answer..."
                className="form-textarea text-xs leading-relaxed font-medium"
              />

              {/* Action Controls & Recording Visualizer */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                
                {/* Voice Record Toggle */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleRecording}
                    className={`btn btn-sm ${
                      isRecording 
                        ? 'bg-rose-600 text-white animate-pulse' 
                        : 'btn-secondary text-xs'
                    }`}
                  >
                    {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-indigo-600" />}
                    <span>{isRecording ? `Recording (${recordSeconds}s)... Stop` : 'Record Voice'}</span>
                  </button>

                  <AudioVisualizer isActive={isRecording} color="rose" />
                </div>

                {/* Submit / Evaluate Button */}
                <button
                  onClick={handleEvaluateAnswer}
                  disabled={isEvaluating}
                  className="btn btn-sm btn-primary flex items-center gap-2 py-2 px-4 shadow-md"
                >
                  <Sparkles className={`w-4 h-4 ${isEvaluating ? 'animate-spin' : ''}`} />
                  <span>{isEvaluating ? 'Evaluating with AI...' : 'Evaluate Answer with AI'}</span>
                </button>
              </div>
            </div>

            {/* AI Rubric Evaluation Results */}
            {evalResult && (
              <div className="mt-6 p-5 bg-gradient-to-br from-indigo-50/70 via-white to-emerald-50/70 rounded-2xl border border-indigo-200 shadow-sm space-y-4 animate-slideUp">
                
                {/* Score Header */}
                <div className="flex items-center justify-between pb-3 border-b border-indigo-100">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-extrabold text-sm shadow">
                      {evalResult.overallScore}%
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900">AI Evaluation: {currentModeInfo.label} Ready</h4>
                      <p className="text-[11px] text-emerald-700 font-semibold">Strong un-apologetic delivery & clear operational boundaries</p>
                    </div>
                  </div>
                  <span className="badge badge-emerald font-bold">Passed</span>
                </div>

                {/* 4 Metric Bars */}
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-xs">
                    <div className="text-[9px] font-bold text-slate-400 uppercase">Confidence</div>
                    <div className="text-sm font-extrabold text-indigo-600">{evalResult.confidenceScore} / 10</div>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-xs">
                    <div className="text-[9px] font-bold text-slate-400 uppercase">Gap Reframe</div>
                    <div className="text-sm font-extrabold text-rose-600">{evalResult.reframeScore} / 10</div>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-xs">
                    <div className="text-[9px] font-bold text-slate-400 uppercase">STAR Impact</div>
                    <div className="text-sm font-extrabold text-emerald-600">{evalResult.starScore} / 10</div>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-xs">
                    <div className="text-[9px] font-bold text-slate-400 uppercase">Work Mode</div>
                    <div className="text-sm font-extrabold text-amber-600">{evalResult.workModeScore} / 10</div>
                  </div>
                </div>

                {/* Key Strengths */}
                <div className="space-y-1.5">
                  <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Key Strengths Highlighted:
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1 pl-5 list-disc">
                    {evalResult.strengths.map((st, i) => (
                      <li key={i} className="leading-snug">{st}</li>
                    ))}
                  </ul>
                </div>

                {/* Constructive AI Polish */}
                <div className="space-y-1.5">
                  <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
                    Recommended Polish:
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1 pl-5 list-disc">
                    {evalResult.improvements.map((im, i) => (
                      <li key={i} className="leading-snug">{im}</li>
                    ))}
                  </ul>
                </div>

                {/* Model Benchmark Answer with Voice */}
                <div className="pt-2 border-t border-indigo-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-900 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      Model 10/10 STAR Answer:
                    </span>
                    <button
                      onClick={toggleModelAnswerAudio}
                      className="btn btn-sm btn-ghost text-xs text-indigo-600 flex items-center gap-1 hover:bg-indigo-50"
                    >
                      {isPlayingModelAudio ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      <span>{isPlayingModelAudio ? 'Stop Speech' : 'Listen to Model Delivery'}</span>
                    </button>
                  </div>
                  <p className="p-3 bg-white rounded-xl border border-indigo-100 text-xs text-slate-700 leading-relaxed italic">
                    "{evalResult.modelAnswer}"
                  </p>
                </div>

              </div>
            )}

          </div>

        </div>

        {/* RIGHT: AI Confidence Coach & Breathing Visualizer (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Module 1: Daily Micro-Affirmation */}
          <div className="glass-card p-6 border-slate-200 space-y-4 bg-gradient-to-br from-rose-50/60 via-white to-amber-50/60">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                <h3 className="font-extrabold text-slate-900 text-sm">Daily Returner Affirmation</h3>
              </div>
              <span className="badge badge-rose text-[10px]">Empowerment Anchor</span>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-rose-100 shadow-xs space-y-2 text-center">
              <p className="text-sm font-bold text-slate-800 leading-snug">
                "{affirmations[activeAffirmationIndex].quote}"
              </p>
              <div className="text-[11px] font-semibold text-rose-600">
                — {affirmations[activeAffirmationIndex].author}
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1">
                {affirmations.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveAffirmationIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      activeAffirmationIndex === idx ? 'bg-rose-500 w-6' : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleAffirmationAudio}
                  className="btn btn-sm btn-ghost text-xs text-rose-700 hover:bg-rose-50 flex items-center gap-1"
                >
                  {isPlayingAffirmation ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span>{isPlayingAffirmation ? 'Stop' : 'Listen'}</span>
                </button>
                <button
                  onClick={() => setActiveAffirmationIndex((activeAffirmationIndex + 1) % affirmations.length)}
                  className="btn btn-sm btn-rose text-xs"
                >
                  Next Affirmation
                </button>
              </div>
            </div>
          </div>

          {/* Module 2: Imposter Syndrome Busters */}
          <div className="glass-card p-6 border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                Imposter Syndrome Busters
              </h3>
              <span className="text-[11px] text-slate-400">Card {activeBusterTab + 1} of {imposterBusters.length}</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 block">The Internal Doubt:</span>
                <p className="text-xs font-semibold text-slate-800 mt-0.5">
                  "{imposterBusters[activeBusterTab].doubt}"
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">The Executive Reframe:</span>
                <p className="text-xs text-slate-700 mt-0.5 leading-relaxed font-medium">
                  {imposterBusters[activeBusterTab].reframe}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setActiveBusterTab((activeBusterTab - 1 + imposterBusters.length) % imposterBusters.length)}
                className="btn btn-sm btn-secondary text-xs"
              >
                Previous
              </button>
              <button
                onClick={() => setActiveBusterTab((activeBusterTab + 1) % imposterBusters.length)}
                className="btn btn-sm btn-secondary text-xs"
              >
                Next Reframe
              </button>
            </div>
          </div>

          {/* Module 3: Pre-Interview Box Breathing & Vocal Warm-up */}
          <div className="glass-card p-6 border-slate-200 bg-slate-900 text-white space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-sm text-white">2-Minute Power Breathing</h3>
              </div>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">Vagus Nerve Calmer</span>
            </div>

            <div className="text-center py-4 space-y-2">
              <div className={`text-4xl font-black font-mono transition-transform duration-500 ${
                isBreathingActive ? 'scale-110 text-emerald-400' : 'text-slate-400'
              }`}>
                {breathCount}
              </div>
              <div className="text-sm font-bold tracking-wide text-indigo-200">
                {breathPhase}
              </div>
            </div>

            <button
              onClick={() => setIsBreathingActive(!isBreathingActive)}
              className={`btn w-full text-xs font-bold py-2.5 shadow-md ${
                isBreathingActive ? 'bg-rose-500 hover:bg-rose-600 text-white' : 'bg-emerald-500 hover:bg-emerald-600 text-slate-950'
              }`}
            >
              {isBreathingActive ? 'Stop Breathing Drill' : 'Start 2-Min Pre-Interview Box Breath'}
            </button>
          </div>

          {/* Module 4: Salary Negotiation Tactical Rules */}
          <div className="glass-card p-5 border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span>Returner Compensation Rule: "Never Accept the Gap Discount"</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Always benchmark your target compensation against current market rates for your <em>total years of experience</em>. Ensure your target work mode and core hours are formally documented in the offer.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
