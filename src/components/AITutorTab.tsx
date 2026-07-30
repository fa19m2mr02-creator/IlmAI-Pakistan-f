import React, { useState } from 'react';
import { Sparkles, Send, Volume2, Copy, Check, BookOpen, AlertCircle, HelpCircle, Lightbulb, RefreshCw } from 'lucide-react';
import { EducationBoard, LevelCategory, LanguageMode, TutorResponse } from '../types';
import { SUBJECT_OPTIONS, PRESET_TOPICS } from '../data/pakistanCurriculum';

interface AITutorTabProps {
  selectedBoard: EducationBoard;
  selectedLevel: LevelCategory;
  languageMode: LanguageMode;
}

export const AITutorTab: React.FC<AITutorTabProps> = ({
  selectedBoard,
  selectedLevel,
  languageMode,
}) => {
  const subjects = SUBJECT_OPTIONS[selectedLevel] || SUBJECT_OPTIONS['FSc Pre-Engineering (11th & 12th)'];
  const [subject, setSubject] = useState<string>(subjects[0] || 'Physics');
  const [question, setQuestion] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<TutorResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [showPracticeAnswer, setShowPracticeAnswer] = useState<boolean>(false);
  const [speaking, setSpeaking] = useState<boolean>(false);

  const handleSubmit = async (qToSubmit?: string) => {
    const promptToUse = qToSubmit || question;
    if (!promptToUse.trim()) return;

    setLoading(true);
    setError(null);
    setResponse(null);
    setShowPracticeAnswer(false);

    try {
      const res = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          board: selectedBoard,
          level: selectedLevel,
          question: promptToUse,
          language: languageMode,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to connect to AI Tutor endpoint');
      }

      const data: TutorResponse = await res.json();
      setResponse(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong while asking the AI Tutor.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!response) return;
    const fullText = `IlmAI Tutor Solution:\n\n${response.answer}\n\nSteps:\n${response.stepByStep.join('\n')}\n\nUrdu:\n${response.urduTranslation || ''}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <span>AI Academic Tutor & Problem Solver</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Ask any homework problem, derivation, numerical, or theory question tailored for {selectedBoard} ({selectedLevel}).
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-lg border border-emerald-200 font-medium">
            <span>Target: {selectedBoard}</span>
            <span>•</span>
            <span>{selectedLevel}</span>
          </div>
        </div>

        {/* Form controls */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Select Subject:
            </label>
            <div className="flex flex-wrap gap-2">
              {subjects.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSubject(sub)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    subject === sub
                      ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Enter Question / Numerical Problem / Concept:
            </label>
            <div className="relative">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="e.g., A stone of mass 2kg is dropped from a height of 20m. Calculate its kinetic energy just before hitting the ground (FBISE Class 9 Physics)..."
                rows={4}
                className="w-full p-3.5 text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none transition-all resize-y"
              />
              <button
                onClick={() => handleSubmit()}
                disabled={loading || !question.trim()}
                className="absolute bottom-3 right-3 inline-flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-medium text-xs px-4 py-2 rounded-lg transition-all shadow-xs"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Ask AI Tutor</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Preset topics */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <p className="text-xs font-semibold text-slate-500 mb-2 flex items-center space-x-1">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>Try Popular Pakistani Exam Questions:</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {PRESET_TOPICS.map((topic, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSubject(topic.subject);
                  setQuestion(topic.prompt);
                  handleSubmit(topic.prompt);
                }}
                className="text-left p-2.5 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 border border-slate-200 rounded-lg text-xs transition-all group"
              >
                <div className="font-semibold text-slate-800 group-hover:text-emerald-800 line-clamp-1">
                  {topic.title}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {topic.level} • {topic.subject}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-start space-x-2">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Unable to complete request</p>
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* AI Tutor Solution Display */}
      {response && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-6">
          {/* Output Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center space-x-2">
              <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-md text-xs">
                {subject} • {selectedBoard}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Verified Solution
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleSpeak(response.answer)}
                className={`p-2 rounded-lg text-xs font-medium border flex items-center space-x-1 transition-all ${
                  speaking
                    ? 'bg-amber-100 text-amber-800 border-amber-300'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                }`}
                title="Read Aloud"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{speaking ? 'Stop Voice' : 'Listen'}</span>
              </button>

              <button
                onClick={handleCopy}
                className="p-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-lg text-xs font-medium flex items-center space-x-1 transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Solution</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Main Direct Answer */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Direct Solution / Answer
            </h3>
            <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl text-slate-900 text-sm leading-relaxed font-normal">
              {response.answer}
            </div>
          </div>

          {/* Key Formulas (if present) */}
          {response.keyFormulas && response.keyFormulas.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Key Formulas & Laws Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {response.keyFormulas.map((form, i) => (
                  <span
                    key={i}
                    className="bg-slate-900 text-emerald-300 font-mono text-xs px-3 py-1.5 rounded-lg border border-slate-800"
                  >
                    {form}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Step by Step breakdown */}
          {response.stepByStep && response.stepByStep.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Step-by-Step Explanation
              </h3>
              <div className="space-y-3">
                {response.stepByStep.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Urdu & Roman Urdu Explanation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Urdu Script Box */}
            {response.urduTranslation && (
              <div className="p-4 bg-slate-900 text-white rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-emerald-400 font-urdu">
                    اردو وضاحت (Urdu Explanation)
                  </span>
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                </div>
                <p 
                  className="text-sm text-slate-200 leading-loose font-urdu font-normal text-right dir-rtl pt-1"
                  dir="rtl"
                >
                  {response.urduTranslation}
                </p>
              </div>
            )}

            {/* Roman Urdu Box */}
            {response.romanUrduTranslation && (
              <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl space-y-2">
                <div className="flex items-center justify-between border-b border-amber-200/80 pb-2">
                  <span className="text-xs font-bold text-amber-900">
                    Roman Urdu Notes
                  </span>
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-xs text-amber-950 leading-relaxed font-medium">
                  {response.romanUrduTranslation}
                </p>
              </div>
            )}
          </div>

          {/* Practice Problem */}
          {response.practiceProblem && (
            <div className="p-4 bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 rounded-xl space-y-3">
              <div className="flex items-center space-x-2 text-xs font-bold text-teal-900 uppercase tracking-wide">
                <HelpCircle className="w-4 h-4 text-teal-600" />
                <span>Test Yourself: Practice Problem</span>
              </div>
              <p className="text-sm font-semibold text-slate-900">
                {response.practiceProblem.question}
              </p>
              <div className="text-xs text-slate-600 italic bg-white/70 p-2.5 rounded-lg border border-teal-100">
                💡 Hint: {response.practiceProblem.hint}
              </div>

              <div>
                <button
                  onClick={() => setShowPracticeAnswer(!showPracticeAnswer)}
                  className="text-xs font-bold text-teal-700 hover:text-teal-900 underline"
                >
                  {showPracticeAnswer ? 'Hide Solution' : 'Show Solution'}
                </button>
                {showPracticeAnswer && (
                  <div className="mt-2 p-3 bg-white rounded-lg border border-teal-200 text-xs text-slate-800 leading-relaxed">
                    {response.practiceProblem.answer}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Suggested Followups */}
          {response.suggestedFollowups && response.suggestedFollowups.length > 0 && (
            <div className="pt-2 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-500 mb-2">
                Suggested Follow-up Questions:
              </p>
              <div className="flex flex-wrap gap-2">
                {response.suggestedFollowups.map((f, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setQuestion(f);
                      handleSubmit(f);
                    }}
                    className="text-xs bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 transition-all text-left"
                  >
                    + {f}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
