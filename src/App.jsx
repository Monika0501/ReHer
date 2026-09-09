// src/App.jsx
import React, { useState } from 'react';
import { PERSONAS, WORK_MODES } from './data/personas';
import { Navbar } from './components/Navbar';
import { Tab1StoryResume } from './components/Tab1StoryResume';
import { Tab2IndustryRoadmap } from './components/Tab2IndustryRoadmap';
import { TabAIInterviewCoach } from './components/TabAIInterviewCoach';
import { Tab4DashboardMatches } from './components/Tab4DashboardMatches';
import { ResumePreviewModal } from './components/ResumePreviewModal';
import { JobApplyModal } from './components/JobApplyModal';
import { Shield, ArrowUpRight } from 'lucide-react';

export function App() {
  // Global State
  const [personas] = useState(PERSONAS);
  const [selectedPersona, setSelectedPersona] = useState(PERSONAS[0]);
  const [preferredWorkMode, setPreferredWorkMode] = useState(PERSONAS[0].preferredWorkMode || 'remote');
  const [activeTab, setActiveTab] = useState('tab1'); // Default to Tab 1

  // Sync preferredWorkMode when persona changes
  const handlePersonaChange = (persona) => {
    setSelectedPersona(persona);
    if (persona.preferredWorkMode) {
      setPreferredWorkMode(persona.preferredWorkMode);
    }
  };

  // Dynamic Metrics
  const [readinessScore, setReadinessScore] = useState(84);
  const [streakDays, setStreakDays] = useState(14);
  const [appliedJobsCount, setAppliedJobsCount] = useState(1);

  // Modal States
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [selectedJobToApply, setSelectedJobToApply] = useState(null);

  // Milestone triggers
  const handleDrillComplete = () => {
    setReadinessScore(prev => Math.min(100, prev + 3));
  };

  const handleRoadmapProgress = (updatedSteps) => {
    const total = updatedSteps.reduce((acc, s) => acc + s.tasks.length, 0);
    const done = updatedSteps.reduce((acc, s) => acc + s.tasks.filter(t => t.done).length, 0);
    const calculatedScore = 70 + Math.round((done / total) * 25);
    setReadinessScore(calculatedScore);
  };

  const handleApplicationSubmitted = (jobId) => {
    setAppliedJobsCount(prev => prev + 1);
    setReadinessScore(prev => Math.min(100, prev + 2));
  };

  return (
    <div className="app-container">
      
      {/* Top Sticky Navigation Bar with Consolidated 4 Tabs */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        personas={personas}
        selectedPersona={selectedPersona}
        setSelectedPersona={handlePersonaChange}
        preferredWorkMode={preferredWorkMode}
        setPreferredWorkMode={setPreferredWorkMode}
        readinessScore={readinessScore}
        streakDays={streakDays}
        openResumePreview={() => setIsResumeModalOpen(true)}
      />

      {/* Main Content View with Clean Consolidated Tabs */}
      <main className="main-content">
        {/* Tab 1: 1. Resume & Story Builder */}
        {activeTab === 'tab1' && (
          <Tab1StoryResume
            selectedPersona={selectedPersona}
            preferredWorkMode={preferredWorkMode}
            setPreferredWorkMode={setPreferredWorkMode}
            openResumePreview={() => setIsResumeModalOpen(true)}
          />
        )}

        {/* Tab 2: 2. Career Roadmap & Skills */}
        {activeTab === 'tab2' && (
          <Tab2IndustryRoadmap
            selectedPersona={selectedPersona}
            preferredWorkMode={preferredWorkMode}
            onProgressUpdate={handleRoadmapProgress}
          />
        )}

        {/* Tab 3: 3. AI Interview & Pitch Coach */}
        {activeTab === 'tab3' && (
          <TabAIInterviewCoach
            selectedPersona={selectedPersona}
            preferredWorkMode={preferredWorkMode}
            onDrillComplete={handleDrillComplete}
          />
        )}

        {/* Tab 4: 4. Job Matches & Returnships */}
        {activeTab === 'tab4' && (
          <Tab4DashboardMatches
            selectedPersona={selectedPersona}
            preferredWorkMode={preferredWorkMode}
            setPreferredWorkMode={setPreferredWorkMode}
            readinessScore={readinessScore}
            streakDays={streakDays}
            setActiveTab={setActiveTab}
            openApplyModal={(job) => setSelectedJobToApply(job)}
          />
        )}
      </main>

      {/* Modern Empowering Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 px-4 sm:px-6 mt-auto">
        <div className="max-w-[1320px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-black bg-gradient-to-r from-indigo-600 to-rose-600 bg-clip-text text-transparent">
              ReHer
            </span>
            <span>• Empowering mothers with tailored Remote, Hybrid & Flexible returnships.</span>
          </div>

          <div className="flex items-center gap-6 font-medium">
            <span className="flex items-center gap-1 text-slate-600">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              ATS Verified Sabbatical & Work Mode Standard
            </span>
            <button 
              onClick={() => setIsResumeModalOpen(true)}
              className="hover:text-indigo-600 transition-colors flex items-center gap-1"
            >
              <span>Export Resume PDF</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
            <button 
              onClick={() => setActiveTab('tab3')}
              className="hover:text-indigo-600 transition-colors flex items-center gap-1"
            >
              <span>AI Interview Coach</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
            <button 
              onClick={() => setActiveTab('tab4')}
              className="hover:text-indigo-600 transition-colors flex items-center gap-1"
            >
              <span>Returnship Board</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

        </div>
      </footer>

      {/* Global Modals */}
      <ResumePreviewModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        selectedPersona={selectedPersona}
        preferredWorkMode={preferredWorkMode}
      />

      <JobApplyModal
        isOpen={!!selectedJobToApply}
        onClose={() => setSelectedJobToApply(null)}
        job={selectedJobToApply}
        selectedPersona={selectedPersona}
        preferredWorkMode={preferredWorkMode}
        onApplicationSubmitted={handleApplicationSubmitted}
      />

    </div>
  );
}

export default App;
