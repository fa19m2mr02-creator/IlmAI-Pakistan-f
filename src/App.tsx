import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AITutorTab } from './components/AITutorTab';
import { QuizGeneratorTab } from './components/QuizGeneratorTab';
import { BilingualExplainerTab } from './components/BilingualExplainerTab';
import { CareerRoadmapTab } from './components/CareerRoadmapTab';
import { MicroCoursesTab } from './components/MicroCoursesTab';
import { ScholarshipsTab } from './components/ScholarshipsTab';
import { Footer } from './components/Footer';
import { EducationBoard, LevelCategory, LanguageMode } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('tutor');
  const [selectedBoard, setSelectedBoard] = useState<EducationBoard>('FBISE (Federal)');
  const [selectedLevel, setSelectedLevel] = useState<LevelCategory>('FSc Pre-Engineering (11th & 12th)');
  const [languageMode, setLanguageMode] = useState<LanguageMode>('English');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col antialiased selection:bg-emerald-500 selection:text-white">
      {/* Header & Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        languageMode={languageMode}
        setLanguageMode={setLanguageMode}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Hero Section */}
        <Hero
          selectedBoard={selectedBoard}
          setSelectedBoard={setSelectedBoard}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          onQuickStart={(tab) => setActiveTab(tab)}
        />

        {/* Tab Router */}
        {activeTab === 'tutor' && (
          <AITutorTab
            selectedBoard={selectedBoard}
            selectedLevel={selectedLevel}
            languageMode={languageMode}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizGeneratorTab
            selectedBoard={selectedBoard}
            selectedLevel={selectedLevel}
            languageMode={languageMode}
          />
        )}

        {activeTab === 'explainer' && (
          <BilingualExplainerTab
            selectedBoard={selectedBoard}
            selectedLevel={selectedLevel}
            languageMode={languageMode}
          />
        )}

        {activeTab === 'roadmap' && (
          <CareerRoadmapTab
            selectedLevel={selectedLevel}
            languageMode={languageMode}
          />
        )}

        {activeTab === 'courses' && <MicroCoursesTab />}

        {activeTab === 'scholarships' && <ScholarshipsTab />}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
