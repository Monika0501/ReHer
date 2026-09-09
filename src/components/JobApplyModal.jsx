// src/components/JobApplyModal.jsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  Award, 
  Copy, 
  Check, 
  Building2, 
  MapPin, 
  ExternalLink,
  Loader2
} from 'lucide-react';
import { WORK_MODES } from '../data/personas';
import confetti from 'canvas-confetti';

const DEFAULT_CAREER_URL = 'https://www.linkedin.com/jobs';

export const JobApplyModal = ({ 
  isOpen, 
  onClose, 
  job, 
  selectedJob: propSelectedJob,
  selectedPersona,
  preferredWorkMode = 'remote',
  onApplicationSubmitted
}) => {
  const currentJob = job || propSelectedJob;
  
  if (!isOpen || !currentJob) return null;

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const closeTimerRef = useRef(null);

  const currentModeInfo = WORK_MODES.find(m => m.id === (currentJob.workMode || preferredWorkMode)) || WORK_MODES[0];

  // Resolve valid external link or fallback to LinkedIn Jobs
  const getDestinationUrl = () => {
    const rawUrl = currentJob?.applyUrl ? String(currentJob.applyUrl).trim() : '';
    if (rawUrl && (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) && !rawUrl.includes('example.com')) {
      return rawUrl;
    }
    return DEFAULT_CAREER_URL;
  };

  // Generate tailored pitch note incorporating Work Mode & Persona
  const generatePitchNote = () => {
    let workModeParagraph = '';
    const mode = currentJob.workMode || (currentJob.location?.toLowerCase().includes('remote') ? 'remote' : 'hybrid');
    const commute = currentJob.commuteInfo || 'Flexible Location / Commute';
    const hours = currentJob.hourFlexibility || 'Flexible Core Hours';
    const hiringManagerName = currentJob.hiringManager ? currentJob.hiringManager.split(',')[0] : 'Hiring Team';
    const matchedSkillsStr = Array.isArray(currentJob.matchedSkills) && currentJob.matchedSkills.length > 0 
      ? currentJob.matchedSkills.join(', ') 
      : (Array.isArray(currentJob.tags) && currentJob.tags.length > 0 ? currentJob.tags.slice(0, 4).join(', ') : 'Asynchronous Collaboration, Modern Digital Workflows');
    const cultureTagsStr = Array.isArray(currentJob.cultureTags) && currentJob.cultureTags.length > 0
      ? currentJob.cultureTags.join(', ')
      : 'Supportive Mentorship, Flexible Culture, Inclusive Onboarding';
    const modeTitle = currentJob.workModeTitle || (mode === 'remote' ? 'Fully Remote' : 'Flexible / Hybrid');

    if (mode === 'remote') {
      workModeParagraph = `Having established a dedicated home office infrastructure and disciplined asynchronous habits during my caregiving break (fluency in ${currentModeInfo.toolHighlight || 'Slack, Notion & Async Tools'}), I am fully equipped to deliver high-velocity, self-directed output in your 100% remote asynchronous environment.`;
    } else if (mode === 'hybrid') {
      workModeParagraph = `I am located within a reliable commute radius (${commute}) with organized family schedules, making me ideally positioned to maximize your collaborative sprints while driving deep-focus execution on remote days.`;
    } else if (mode === 'onsite') {
      workModeParagraph = `With verified family logistics and scheduling in place, I am eager for daily on-campus collaboration, spontaneous whiteboard sessions, and direct cohort mentorship.`;
    } else {
      workModeParagraph = `Your flexible ${hours} schedule aligns perfectly with my high-leverage execution style, allowing me to drive measurable business outcomes with focused efficiency.`;
    }

    const candidateExp = selectedPersona?.yearsExp || '8+ years of industry experience';
    const candidateField = selectedPersona?.field === 'tech' 
      ? 'building scalable distributed systems' 
      : selectedPersona?.field === 'marketing' 
        ? 'leading high-growth multi-channel brand campaigns' 
        : 'managing corporate financial modeling and operational governance';
    const breakDuration = selectedPersona?.breakDuration || 'career sabbatical';
    const candidateName = selectedPersona?.name || 'ReHer Candidate';
    const candidateEmail = selectedPersona?.email || 'candidate@reher.app';
    const candidateLinkedin = selectedPersona?.linkedin || 'linkedin.com/in/reher-talent';

    return `Dear ${hiringManagerName} and the ${currentJob.company} Returnship Team,

I am writing to enthusiastically express my interest in the ${currentJob.title} (${modeTitle}) at ${currentJob.company}.

With ${candidateExp} in ${candidateField}, combined with recent mastery of contemporary workflows (${matchedSkillsStr}), I am eager to contribute to your team.

During my intentional ${breakDuration} dedicated to family caregiving and community leadership, I maintained rigorous operational discipline. ${workModeParagraph}

What draws me specifically to ${currentJob.company}'s culture is your commitment to structured onboarding, mentorship, and high-impact flexibility (${cultureTagsStr}). I look forward to discussing how I can deliver rapid value for ${currentJob.company}.

Sincerely,
${candidateName}
${candidateEmail} | ${candidateLinkedin}`;
  };

  const [pitchNote, setPitchNote] = useState(generatePitchNote());

  // Reset state when job or modal opens/changes
  useEffect(() => {
    setPitchNote(generatePitchNote());
    setIsSubmitting(false);
    setToastMessage(null);
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, [currentJob, isOpen]);

  const handleCopy = () => {
    navigator.clipboard.writeText(pitchNote);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitApplication = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const targetUrl = getDestinationUrl();

    // 1. Open destination in a new browser tab
    try {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.warn('Could not open external job link:', err);
    }

    // 2. Show inline success message
    setToastMessage('Application submitted! Opening listing page...');

    // 3. Trigger celebration confetti
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4F46E5', '#F43F5E', '#10B981', '#F59E0B']
      });
    } catch (e) {
      // Fallback
    }

    // 4. Notify parent / dashboard tracker
    if (onApplicationSubmitted && currentJob?.id) {
      onApplicationSubmitted(currentJob.id);
    }

    // 5. Close the modal after a short delay (1.5 seconds)
    closeTimerRef.current = setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 1500);
  };

  const targetUrl = getDestinationUrl();

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content max-w-2xl p-6 sm:p-8" 
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-200">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
              {currentJob.logo ? (
                <img 
                  src={currentJob.logo} 
                  alt={currentJob.company} 
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
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-extrabold text-sm text-slate-900">{currentJob.company}</span>
                <span className="badge badge-indigo text-[10px] font-bold">
                  {currentJob.workModeTitle || (currentJob.location?.toLowerCase().includes('remote') ? 'Fully Remote' : 'Hybrid / Flex')}
                </span>
                <span className="badge badge-emerald text-[10px] font-bold">
                  {currentJob.matchScore || 95}% Match
                </span>
              </div>
              <h3 className="text-base font-extrabold text-indigo-900 mt-0.5">{currentJob.title}</h3>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mt-1">
                <span>📍 {currentJob.location || 'Remote / Flexible'}</span>
                <span className="font-semibold text-indigo-700">{currentJob.commuteInfo || 'Flexible Location'}</span>
                <span className="font-semibold text-emerald-700">
                  💵 {(currentJob.stipend || currentJob.salaryRange || 'Competitive Flexible Rate').split('+')[0]}
                </span>
              </div>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inline Toast / Success Banner */}
        {toastMessage && (
          <div className="mt-4 p-3.5 rounded-xl border bg-emerald-50 border-emerald-200 text-emerald-900 flex items-center gap-3 animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 animate-bounce" />
            <div className="text-xs font-bold flex-1">
              {toastMessage}
            </div>
            <Loader2 className="w-4 h-4 text-emerald-600 animate-spin shrink-0" />
          </div>
        )}

        {/* Modal Body */}
        <div className="space-y-4 mt-4">
          
          {/* Auto-Pitch Generator Header & Copy Action */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>AI-Tailored Comeback Pitch ({currentJob.workModeTitle || 'Returnship Ready'})</span>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="btn btn-sm btn-ghost text-xs text-slate-600 flex items-center gap-1 hover:bg-slate-100"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Text'}</span>
            </button>
          </div>

          {/* Editable Pitch Note Textarea */}
          <textarea
            rows={8}
            value={pitchNote}
            onChange={(e) => setPitchNote(e.target.value)}
            disabled={isSubmitting}
            className="form-textarea text-xs leading-relaxed font-mono bg-slate-50 border-slate-200 focus:bg-white transition-colors"
            placeholder="Your custom cover letter / comeback pitch note..."
          />

          {/* Attached ATS Resume Preview Callout */}
          <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
              <div>
                <span className="font-bold text-indigo-950">
                  {selectedPersona?.name ? `${selectedPersona.name.replace(/\s+/g, '_')}_ATS_Resume` : 'Candidate_ATS_Resume'}_{currentJob.workMode || 'Flex'}.pdf
                </span>
                <span className="text-[10px] text-indigo-700 ml-2 font-medium">
                  94/100 ATS Verified • {currentJob.workModeTitle || 'Work Mode Standard'}
                </span>
              </div>
            </div>
            <span className="badge badge-emerald text-[10px] font-bold">Attached</span>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <div className="text-[11px] text-slate-500 hidden sm:block">
              <a 
                href={targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-semibold"
              >
                <span>Preview Job Posting</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="btn btn-secondary text-xs"
              >
                Cancel
              </button>
              
              <button
                type="button"
                onClick={handleSubmitApplication}
                disabled={isSubmitting}
                className="btn btn-primary text-xs flex items-center gap-2 py-2.5 px-5 shadow-md font-bold"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Application with ReHer Story</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
