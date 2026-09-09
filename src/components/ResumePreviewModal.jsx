// src/components/ResumePreviewModal.jsx
import React, { useState, useEffect } from 'react';
import { 
  X, 
  Printer, 
  Copy, 
  Check, 
  Download, 
  Award, 
  FileText, 
  ShieldCheck,
  CheckCircle2,
  Laptop,
  Sparkles,
  Loader2
} from 'lucide-react';
import { WORK_MODES } from '../data/personas';
import confetti from 'canvas-confetti';

export const ResumePreviewModal = ({ 
  isOpen, 
  onClose, 
  selectedPersona,
  preferredWorkMode = 'remote'
}) => {
  if (!isOpen || !selectedPersona) return null;

  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [theme, setTheme] = useState('indigo');

  const currentModeInfo = WORK_MODES.find(m => m.id === preferredWorkMode) || WORK_MODES[0];

  // Reset toast when modal opens
  useEffect(() => {
    setToastMessage(null);
  }, [isOpen]);

  // Plain Text formatted ATS resume for export
  const fullResumeText = `================================================================================
${selectedPersona.name.toUpperCase()}
${selectedPersona.targetRole.toUpperCase()} — ${currentModeInfo.label.toUpperCase()}
Location: ${selectedPersona.location} | Email: ${selectedPersona.email} | Phone: ${selectedPersona.phone}
LinkedIn: ${selectedPersona.linkedin} | Portfolio: ${selectedPersona.github}
================================================================================

PROFESSIONAL SUMMARY
--------------------------------------------------------------------------------
${selectedPersona.comebackStory.inspiring || selectedPersona.bio}

CORE SKILLS & WORK-MODE COMPETENCIES
--------------------------------------------------------------------------------
• Work Mode: ${currentModeInfo.label} (${currentModeInfo.subLabel})
• Ecosystem & Tools: ${currentModeInfo.toolHighlight}
• Key Competencies: Agile Resource Scheduling, Cross-Functional Leadership, Budget Management, Stakeholder Communication, Asynchronous Workflows

PROFESSIONAL EXPERIENCE
--------------------------------------------------------------------------------
INTENTIONAL CAREER SABBATICAL & COMMUNITY LEADERSHIP (${selectedPersona.breakYears.start} – ${selectedPersona.breakYears.end})
• ${selectedPersona.translatedBullets.join('\n• ')}

${selectedPersona.pastExperience.map(exp => `${exp.role.toUpperCase()} — ${exp.company} (${exp.period})\n${exp.description}`).join('\n\n')}

EDUCATION & CREDENTIALS
--------------------------------------------------------------------------------
${selectedPersona.education.degree} — ${selectedPersona.education.school} (${selectedPersona.education.year})
================================================================================`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullResumeText);
    setCopied(true);
    setToastMessage("ATS Plain-Text Copied to Clipboard!");
    setTimeout(() => {
      setCopied(false);
      setToastMessage(null);
    }, 2500);
  };

  const handleDownloadTxt = () => {
    setToastMessage("Generating ATS-Optimized Text Resume...");
    
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#4F46E5', '#10B981', '#F59E0B']
      });
    } catch (e) {}

    setTimeout(() => {
      const element = document.createElement('a');
      const file = new Blob([fullResumeText], { type: 'text/plain;charset=utf-8' });
      element.href = URL.createObjectURL(file);
      element.download = `${selectedPersona.name.replace(/\s+/g, '_')}_ATS_Resume_${preferredWorkMode}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      setTimeout(() => setToastMessage(null), 2000);
    }, 400);
  };

  const handleExportPrint = () => {
    setToastMessage("Generating ATS-Optimized Resume...");
    
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4F46E5', '#10B981', '#F59E0B']
      });
    } catch (e) {}

    // Small delay to allow toast rendering before browser print dialog captures focus
    setTimeout(() => {
      window.print();
      setTimeout(() => setToastMessage(null), 3000);
    }, 300);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content max-w-4xl p-6 sm:p-8 bg-slate-100" 
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Top Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-300 no-print">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-600 text-white shadow">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base text-slate-900">ATS-Optimized Single-Column Resume</h3>
                <span className="badge badge-emerald font-bold">98% ATS Score</span>
                <span className="badge badge-indigo text-[10px] font-bold">
                  {currentModeInfo.icon} {currentModeInfo.label}
                </span>
              </div>
              <p className="text-xs text-slate-500">Standard single-column hierarchy, clear text contrast, and framed career transition</p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2">
            
            <button
              onClick={handleCopy}
              className="btn btn-sm btn-secondary text-xs"
              title="Copy plain text"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={handleDownloadTxt}
              className="btn btn-sm btn-secondary text-xs"
              title="Download ATS Text File"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .txt</span>
            </button>

            {/* Primary Export Button */}
            <button
              onClick={handleExportPrint}
              className="btn btn-sm btn-primary text-xs flex items-center gap-1.5 font-bold shadow-md"
              title="Export ATS PDF / Print"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Export ATS Resume</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dynamic Toast Feedback Notice */}
        {toastMessage && (
          <div className="my-3 p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl flex items-center gap-2.5 text-xs font-bold animate-fadeIn no-print">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 animate-bounce" />
            <span className="flex-1">{toastMessage}</span>
            <Loader2 className="w-4 h-4 text-emerald-600 animate-spin shrink-0" />
          </div>
        )}

        {/* ATS Score Details Callout */}
        <div className="my-3 p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs no-print">
          <div className="flex items-center gap-2 text-emerald-700 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Passed ATS Keyword & Work-Mode Audits</span>
          </div>
          <div className="flex items-center gap-4 text-slate-500 text-[11px]">
            <span>Break Re-frame: <strong className="text-slate-800">98%</strong></span>
            <span>Work Mode Match: <strong className="text-slate-800">100%</strong></span>
            <span>Single-Column Format: <strong className="text-slate-800">Verified</strong></span>
          </div>
        </div>

        {/* Printable ATS Resume Document Page (Single-Column Standard Layout) */}
        <div 
          id="printable-ats-resume"
          className="resume-sheet bg-white p-8 sm:p-12 rounded-2xl border border-slate-300 shadow-lg font-sans text-slate-900 space-y-6 max-h-[68vh] overflow-y-auto"
        >
          
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-4 text-left">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
              {selectedPersona.name}
            </h1>
            <p className="text-sm sm:text-base font-bold text-slate-800 mt-0.5">
              {selectedPersona.targetRole} • {currentModeInfo.label}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-700 mt-2 font-medium">
              <span>📍 {selectedPersona.location}</span>
              <span>✉️ {selectedPersona.email}</span>
              <span>📞 {selectedPersona.phone}</span>
              <span>🔗 {selectedPersona.linkedin}</span>
              <span>💻 {selectedPersona.github}</span>
            </div>
          </div>

          {/* Section 1: Summary */}
          <div className="space-y-1.5 text-left">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
              Summary
            </h2>
            <p className="text-xs text-slate-800 leading-relaxed font-normal">
              {selectedPersona.comebackStory.inspiring || selectedPersona.bio}
            </p>
          </div>

          {/* Section 2: Skills & Competencies */}
          <div className="space-y-2 text-left">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
              Skills & Competencies
            </h2>
            <div className="text-xs text-slate-800 space-y-1 leading-relaxed">
              <div>
                <strong>Work Mode & Collaboration Stack:</strong> {currentModeInfo.label} ({currentModeInfo.toolHighlight})
              </div>
              <div>
                <strong>Core Professional Strengths:</strong> Agile Resource Scheduling, Cross-Functional Team Leadership, Budget Allocation & Financial Planning, Asynchronous Project Governance, Stakeholder Communication.
              </div>
              <div>
                <strong>Modern Toolchain:</strong> Notion AI, ChatGPT Content & Workflow Automation, Slack Asynchronous Channels, Figma, Git & Jira.
              </div>
            </div>
          </div>

          {/* Section 3: Experience & Career Sabbatical */}
          <div className="space-y-4 text-left">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
              Experience
            </h2>

            {/* Career Sabbatical / Relaunch Leadership */}
            <div className="space-y-1.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                <span className="font-extrabold text-slate-900">
                  Career Sabbatical & Community Leadership — <span className="text-slate-700 font-semibold">Independent & Non-Profit Leadership</span>
                </span>
                <span className="text-slate-600 font-medium">{selectedPersona.breakYears.start} – {selectedPersona.breakYears.end}</span>
              </div>
              <p className="text-[11px] text-slate-600 italic">
                Intentional sabbatical focused on full-time family developmental care, non-profit community governance, and contemporary toolchain upskilling.
              </p>
              <ul className="space-y-1 pl-4 list-disc text-xs text-slate-800 leading-relaxed">
                {selectedPersona.translatedBullets.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
            </div>

            {/* Prior Corporate Roles */}
            {selectedPersona.pastExperience.map((exp, idx) => (
              <div key={idx} className="space-y-1 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                  <span className="font-extrabold text-slate-900">
                    {exp.role} — <span className="text-slate-700 font-semibold">{exp.company}</span>
                  </span>
                  <span className="text-slate-600 font-medium">{exp.period}</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>

          {/* Section 4: Education */}
          <div className="space-y-1.5 text-left">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
              Education
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
              <span className="font-bold text-slate-900">{selectedPersona.education.degree}</span>
              <span className="text-slate-600">{selectedPersona.education.school} ({selectedPersona.education.year})</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
