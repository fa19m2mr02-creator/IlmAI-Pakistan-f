import React from 'react';
import { Sparkles, BookOpen, GraduationCap, Compass, ArrowRight, CheckCircle2 } from 'lucide-react';
import { EducationBoard, LevelCategory } from '../types';
import { EDUCATION_BOARDS, LEVEL_CATEGORIES } from '../data/pakistanCurriculum';

interface HeroProps {
  selectedBoard: EducationBoard;
  setSelectedBoard: (board: EducationBoard) => void;
  selectedLevel: LevelCategory;
  setSelectedLevel: (level: LevelCategory) => void;
  onQuickStart: (tab: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  selectedBoard,
  setSelectedBoard,
  selectedLevel,
  setSelectedLevel,
  onQuickStart,
}) => {
  return (
    <div className="bg-gradient-to-b from-emerald-900 via-emerald-800 to-slate-900 text-white py-10 px-4 sm:px-6 lg:px-8 rounded-2xl mb-8 shadow-xl relative overflow-hidden">
      {/* Subtle background decorative shapes */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center space-x-2 bg-emerald-700/60 border border-emerald-400/30 text-emerald-200 text-xs px-3.5 py-1.5 rounded-full mb-4 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-emerald-300 animate-spin" />
          <span>Powered by Gemini AI • Tailored for Pakistani Boards & Tech Talent</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-4">
          Empowering Pakistan’s Students with <span className="text-emerald-400">AI Education</span>
        </h1>

        <p className="text-sm sm:text-base text-emerald-100 max-w-2xl mx-auto mb-6 leading-relaxed">
          Instant step-by-step homework help for FBISE, Punjab, Sindh, O/A Levels, MDCAT, ECAT, and AI Skills. Available in English, Urdu (اردو), and Roman Urdu.
        </p>

        {/* Board & Grade Selector Bar */}
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/15 max-w-3xl mx-auto mb-8 shadow-inner">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-emerald-200 mb-1">
                Select Educational Board:
              </label>
              <select
                value={selectedBoard}
                onChange={(e) => setSelectedBoard(e.target.value as EducationBoard)}
                className="w-full bg-slate-900/90 text-white text-xs sm:text-sm rounded-lg border border-emerald-500/40 px-3 py-2 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              >
                {EDUCATION_BOARDS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-emerald-200 mb-1">
                Select Level / Grade:
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value as LevelCategory)}
                className="w-full bg-slate-900/90 text-white text-xs sm:text-sm rounded-lg border border-emerald-500/40 px-3 py-2 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              >
                {LEVEL_CATEGORIES.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Quick Action CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => onQuickStart('tutor')}
            className="inline-flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all text-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>Ask AI Tutor Now</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={() => onQuickStart('quiz')}
            className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-2.5 rounded-xl border border-white/20 backdrop-blur-xs transition-all text-sm"
          >
            <GraduationCap className="w-4 h-4 text-emerald-300" />
            <span>Start Practice Quiz</span>
          </button>

          <button
            onClick={() => onQuickStart('explainer')}
            className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-2.5 rounded-xl border border-white/20 backdrop-blur-xs transition-all text-sm"
          >
            <BookOpen className="w-4 h-4 text-teal-300" />
            <span>Urdu Concept Explainer</span>
          </button>

          <button
            onClick={() => onQuickStart('roadmap')}
            className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-2.5 rounded-xl border border-white/20 backdrop-blur-xs transition-all text-sm"
          >
            <Compass className="w-4 h-4 text-yellow-300" />
            <span>FAST/NUST Uni Guide</span>
          </button>
        </div>

        {/* Key Highlights */}
        <div className="mt-8 pt-6 border-t border-emerald-700/50 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-emerald-200">
          <div className="flex items-center justify-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>FBISE & Board Math/Physics</span>
          </div>
          <div className="flex items-center justify-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Urdu & Roman Urdu Support</span>
          </div>
          <div className="flex items-center justify-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>MDCAT & ECAT Exam Prep</span>
          </div>
          <div className="flex items-center justify-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Python & AI Skills Roadmaps</span>
          </div>
        </div>
      </div>
    </div>
  );
};
