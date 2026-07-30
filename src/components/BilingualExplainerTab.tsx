import React, { useState } from 'react';
import { BookOpen, Sparkles, Lightbulb, AlertTriangle, CheckCircle, RefreshCw, Send, Volume2 } from 'lucide-react';
import { EducationBoard, LevelCategory, LanguageMode, AIExplanationResult } from '../types';

interface BilingualExplainerTabProps {
  selectedBoard: EducationBoard;
  selectedLevel: LevelCategory;
  languageMode: LanguageMode;
}

export const BilingualExplainerTab: React.FC<BilingualExplainerTabProps> = ({
  selectedLevel,
  languageMode,
}) => {
  const [concept, setConcept] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<AIExplanationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const popularConcepts = [
    'How Artificial Neural Networks Work',
    'Electromagnetic Induction (Faraday’s Law)',
    'Recursion & Call Stack in Programming',
    'Photosynthesis Light Reactions',
    'Calculus Derivatives & Rate of Change',
    'Quantum Entanglement Simplified',
  ];

  const handleExplain = async (conceptToUse?: string) => {
    const term = conceptToUse || concept;
    if (!term.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/explain-concept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          concept: term,
          level: selectedLevel,
          language: languageMode,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to generate explanation');
      }

      const data: AIExplanationResult = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong while explaining the concept.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Input Header Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <span>Bilingual Concept Simplifier with Pakistani Analogies</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              "Explain like I'm 5" with real-world Pakistani examples (Cricket, Rickshaws, Chai making, Traffic, Market dynamics).
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
            placeholder="e.g. Artificial Neural Networks, Faraday's Law, Recursion, Quantum Physics..."
            className="flex-1 p-3 text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none"
          />
          <button
            onClick={() => handleExplain()}
            disabled={loading || !concept.trim()}
            className="inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl shadow-xs transition-all text-xs sm:text-sm shrink-0"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Simplifying...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Explain in Urdu & English</span>
              </>
            )}
          </button>
        </div>

        {/* Popular chips */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <p className="text-xs font-semibold text-slate-500 mb-2">
            Try these complex topics:
          </p>
          <div className="flex flex-wrap gap-2">
            {popularConcepts.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setConcept(item);
                  handleExplain(item);
                }}
                className="text-xs bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 px-3 py-1 rounded-lg border border-slate-200 transition-all"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Results view */}
      {result && (
        <div className="space-y-6">
          {/* Main Title Card */}
          <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 rounded-2xl shadow-lg">
            <span className="text-xs uppercase font-bold text-emerald-300 tracking-wider">
              Concept Simplified
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 mb-2">
              {result.title}
            </h2>
            <p className="text-sm text-emerald-100 leading-relaxed max-w-3xl">
              {result.simpleSummary}
            </p>

            {result.urduSummary && (
              <div className="mt-4 p-3.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-right" dir="rtl">
                <p className="text-sm font-urdu text-emerald-200 leading-loose">
                  {result.urduSummary}
                </p>
              </div>
            )}
          </div>

          {/* Pakistani Real-World Analogy Highlight Box */}
          <div className="bg-amber-50 border-2 border-amber-300 p-6 rounded-2xl shadow-xs space-y-3">
            <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm">
              <Lightbulb className="w-5 h-5 text-amber-600 animate-bounce" />
              <span>🇵🇰 Pakistani Real-World Analogy (پاکستان میں روزمرہ زندگی کی مثال)</span>
            </div>
            <p className="text-sm text-amber-950 leading-relaxed font-medium">
              {result.pakistanAnalogy}
            </p>
          </div>

          {/* Key Bullet Points & Applications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Key Core Takeaways</span>
              </h3>
              <ul className="space-y-2">
                {result.keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start space-x-2 text-xs text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Common Pakistani Exam Pitfalls</span>
              </h3>
              <ul className="space-y-2">
                {result.commonMistakes.map((mistake, i) => (
                  <li key={i} className="flex items-start space-x-2 text-xs text-slate-700 bg-red-50/50 p-2 rounded-lg border border-red-100">
                    <span className="text-red-500 font-bold">✕</span>
                    <span>{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Real World Industry Application */}
          <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-2">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Real-World Industry & Tech Application
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {result.realWorldApplication}
            </p>
          </div>

          {/* Quick Concept Check Question */}
          {result.practiceQuestion && (
            <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl space-y-2">
              <div className="text-xs font-bold text-emerald-900 uppercase">
                Quick Understanding Check:
              </div>
              <p className="text-sm font-semibold text-slate-900">
                {result.practiceQuestion.question}
              </p>
              <div className="text-xs text-emerald-800 bg-white p-3 rounded-lg border border-emerald-200 font-medium">
                Answer: {result.practiceQuestion.answer}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
