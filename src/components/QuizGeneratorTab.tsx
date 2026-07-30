import React, { useState } from 'react';
import { GraduationCap, Award, CheckCircle, XCircle, HelpCircle, RefreshCw, AlertCircle, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import { EducationBoard, LevelCategory, LanguageMode, QuizQuestion } from '../types';
import { SUBJECT_OPTIONS } from '../data/pakistanCurriculum';

interface QuizGeneratorTabProps {
  selectedBoard: EducationBoard;
  selectedLevel: LevelCategory;
  languageMode: LanguageMode;
}

export const QuizGeneratorTab: React.FC<QuizGeneratorTabProps> = ({
  selectedBoard,
  selectedLevel,
  languageMode,
}) => {
  const subjects = SUBJECT_OPTIONS[selectedLevel] || SUBJECT_OPTIONS['FSc Pre-Engineering (11th & 12th)'];
  const [subject, setSubject] = useState<string>(subjects[0] || 'Physics');
  const [topic, setTopic] = useState<string>('Entire Syllabus / Past Paper Revision');
  const [questionCount, setQuestionCount] = useState<number>(5);
  
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showHints, setShowHints] = useState<Record<number, boolean>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateQuiz = async () => {
    setLoading(true);
    setError(null);
    setQuestions([]);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setShowHints({});
    setQuizSubmitted(false);

    try {
      const res = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          board: selectedBoard,
          level: selectedLevel,
          subject,
          topic,
          questionCount,
          language: languageMode,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to generate quiz');
      }

      const data = await res.json();
      if (!data.questions || data.questions.length === 0) {
        throw new Error('No quiz questions were returned by AI');
      }

      setQuestions(data.questions);
    } catch (err: any) {
      setError(err.message || 'Something went wrong while generating the quiz.');
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (qIdx: number, oIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: oIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const score = calculateScore();
  const percentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Quiz Config Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-emerald-600" />
              <span>AI Exam & MCQ Test Generator</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Generate custom MCQs aligned with {selectedBoard} ({selectedLevel}) standards.
            </p>
          </div>

          <div className="text-xs bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200">
            Current Board: <span className="font-semibold text-emerald-700">{selectedBoard}</span>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Subject:
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-lg p-2.5 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              {subjects.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Topic / Chapter:
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Thermodynamics / Integration / Chemical Bonding"
              className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-lg p-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Number of Questions:
            </label>
            <div className="flex space-x-2">
              {[3, 5, 10].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setQuestionCount(num)}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${
                    questionCount === num
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {num} MCQs
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleGenerateQuiz}
          disabled={loading}
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl shadow-xs transition-all text-xs sm:text-sm"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Generating Aligned Test Questions...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate Custom Quiz Now</span>
            </>
          )}
        </button>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Quiz Active Interface */}
      {questions.length > 0 && (
        <div className="space-y-6">
          {/* Quiz Stats Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-3">
              <span className="font-bold text-slate-900">
                Question {currentIndex + 1} of {questions.length}
              </span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-600 font-medium">
                Answered: {Object.keys(selectedAnswers).length} / {questions.length}
              </span>
            </div>

            <div className="flex space-x-1">
              {questions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                    currentIndex === idx
                      ? 'bg-emerald-600 text-white'
                      : selectedAnswers[idx] !== undefined
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Current Question Card */}
          {questions[currentIndex] && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    Question #{currentIndex + 1}
                  </span>
                  <button
                    onClick={() =>
                      setShowHints((prev) => ({
                        ...prev,
                        [currentIndex]: !prev[currentIndex],
                      }))
                    }
                    className="text-xs text-amber-700 hover:text-amber-900 flex items-center space-x-1 font-semibold"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{showHints[currentIndex] ? 'Hide Hint' : 'Need a Hint?'}</span>
                  </button>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {questions[currentIndex].question}
                </h3>

                {questions[currentIndex].questionUrdu && (
                  <p 
                    className="text-sm font-urdu text-emerald-950 bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100 mt-2 text-right"
                    dir="rtl"
                  >
                    {questions[currentIndex].questionUrdu}
                  </p>
                )}

                {showHints[currentIndex] && questions[currentIndex].hint && (
                  <div className="mt-3 p-3 bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded-lg animate-fadeIn">
                    💡 <strong>Hint:</strong> {questions[currentIndex].hint}
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {questions[currentIndex].options.map((option, oIdx) => {
                  const isSelected = selectedAnswers[currentIndex] === oIdx;
                  const isCorrect = questions[currentIndex].correctIndex === oIdx;

                  let optionStyle = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';

                  if (quizSubmitted) {
                    if (isCorrect) {
                      optionStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold';
                    } else if (isSelected && !isCorrect) {
                      optionStyle = 'bg-red-100 border-red-300 text-red-950 font-bold';
                    }
                  } else if (isSelected) {
                    optionStyle = 'bg-emerald-600 border-emerald-600 text-white font-semibold shadow-xs';
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleOptionSelect(currentIndex, oIdx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${optionStyle}`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className={`w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center border ${
                          isSelected ? 'bg-white text-emerald-800 border-white' : 'bg-slate-200 text-slate-700 border-slate-300'
                        }`}>
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span>{option}</span>
                      </div>

                      {quizSubmitted && isCorrect && (
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                      )}
                      {quizSubmitted && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation (when submitted) */}
              {quizSubmitted && (
                <div className="p-4 bg-slate-900 text-white rounded-xl space-y-2 text-xs">
                  <div className="font-bold text-emerald-400 flex items-center space-x-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>AI Detailed Explanation:</span>
                  </div>
                  <p className="text-slate-200 leading-relaxed">
                    {questions[currentIndex].explanation}
                  </p>
                  {questions[currentIndex].explanationUrdu && (
                    <p className="text-emerald-300 font-urdu pt-1 border-t border-slate-800 text-right" dir="rtl">
                      {questions[currentIndex].explanationUrdu}
                    </p>
                  )}
                </div>
              )}

              {/* Question Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                {!quizSubmitted ? (
                  currentIndex === questions.length - 1 ? (
                    <button
                      onClick={() => setQuizSubmitted(true)}
                      className="inline-flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2 rounded-xl text-xs shadow-md"
                    >
                      <Award className="w-4 h-4" />
                      <span>Submit Test & View Results</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                      className="inline-flex items-center space-x-1 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-4 py-2 rounded-lg text-xs"
                    >
                      <span>Next Question</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )
                ) : (
                  <button
                    onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                    disabled={currentIndex === questions.length - 1}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40"
                  >
                    <span>Next Question</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Quiz Score Summary Card */}
          {quizSubmitted && (
            <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-6 rounded-2xl shadow-xl flex flex-wrap items-center justify-between gap-6">
              <div>
                <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
                  <Award className="w-4 h-4" />
                  <span>Test Completed • Official AI Report</span>
                </div>
                <h3 className="text-2xl font-extrabold text-white">
                  Score: {score} / {questions.length} ({percentage}%)
                </h3>
                <p className="text-xs text-emerald-200 mt-1 max-w-md">
                  {percentage >= 80
                    ? '🎉 Outstanding! Excellent mastery for your board exams.'
                    : percentage >= 50
                    ? '👍 Good attempt! Review the incorrect questions with the AI Tutor.'
                    : '📖 Keep practicing! Use the AI Tutor to revise core concepts.'}
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={handleGenerateQuiz}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs transition-all shadow-md"
                >
                  Generate New Quiz
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
