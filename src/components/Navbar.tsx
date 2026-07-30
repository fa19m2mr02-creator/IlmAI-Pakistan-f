import React from 'react';
import { BookOpen, Sparkles, GraduationCap, Compass, Award, Code2, Globe } from 'lucide-react';
import { LanguageMode } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  languageMode: LanguageMode;
  setLanguageMode: (lang: LanguageMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  languageMode,
  setLanguageMode,
}) => {
  const navItems = [
    { id: 'tutor', label: 'AI Tutor', labelUrdu: 'اے آئی ٹیوٹر', icon: Sparkles },
    { id: 'quiz', label: 'Quiz Generator', labelUrdu: 'کوئز جنریٹر', icon: GraduationCap },
    { id: 'explainer', label: 'Concept Explainer', labelUrdu: 'مفاہیم کی وضاحت', icon: BookOpen },
    { id: 'roadmap', label: 'Career & Uni Guide', labelUrdu: 'کیریئر گائیڈ', icon: Compass },
    { id: 'courses', label: 'Micro-Courses', labelUrdu: 'آن لائن کورسز', icon: Code2 },
    { id: 'scholarships', label: 'Scholarships', labelUrdu: 'اسکالرشپس', icon: Award },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      {/* Top Banner for Pakistani Students */}
      <div className="bg-emerald-800 text-white text-xs px-4 py-1.5 flex flex-wrap justify-between items-center font-medium">
        <div className="flex items-center space-x-2 space-x-reverse">
          <span className="bg-emerald-600 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full tracking-wider">
            Pakistan AI EdTech
          </span>
          <span>Curriculum Aligned: FBISE • Punjab • Sindh • KPK • O/A Levels • MDCAT / ECAT</span>
        </div>
        <div className="hidden sm:flex items-center space-x-3 text-emerald-100">
          <span>🇵🇰 Empowering 60M+ Pakistani Students</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => setActiveTab('tutor')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-200">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  Ilm<span className="text-emerald-600">AI</span>
                </span>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-md border border-emerald-200">
                  Pakistan
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-urdu font-normal">
                پاکستان کا ذہین تعلیمی رہنما
              </p>
            </div>
          </div>

          {/* Controls: Language Selector & Status */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
              <Globe className="w-4 h-4 text-slate-500 ml-2 mr-1" />
              <button
                onClick={() => setLanguageMode('English')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                  languageMode === 'English'
                    ? 'bg-white text-emerald-700 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguageMode('Roman Urdu')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                  languageMode === 'Roman Urdu'
                    ? 'bg-white text-emerald-700 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Roman Urdu
              </button>
              <button
                onClick={() => setLanguageMode('Urdu (اردو)')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                  languageMode === 'Urdu (اردو)'
                    ? 'bg-emerald-700 text-white shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                اردو
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto pb-2 scrollbar-none border-t border-slate-100 pt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.labelUrdu && (
                  <span className="hidden lg:inline text-[10px] text-slate-400 ml-1 font-urdu">
                    ({item.labelUrdu})
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
