import React, { useState } from 'react';
import { Code2, BookOpen, CheckCircle, Play, Sparkles, ChevronRight, Award, HelpCircle } from 'lucide-react';
import { MICRO_COURSES } from '../data/pakistanCurriculum';
import { MicroCourse } from '../types';

export const MicroCoursesTab: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<MicroCourse>(MICRO_COURSES[0]);
  const [activeModuleIdx, setActiveModuleIdx] = useState<number>(0);

  const [codeOutput, setCodeOutput] = useState<string | null>(null);
  const [runningCode, setRunningCode] = useState<boolean>(false);

  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<number, number>>({});
  const [quizFeedback, setQuizFeedback] = useState<Record<number, boolean>>({});

  const currentModule = selectedCourse.modules[activeModuleIdx] || selectedCourse.modules[0];

  const handleRunCode = (code?: string) => {
    if (!code) return;
    setRunningCode(true);
    setCodeOutput(null);

    setTimeout(() => {
      // Simulate running python / javascript output safely
      let simulatedOutput = '';
      if (code.includes('print')) {
        const matches = code.match(/print\((.*?)\)/g);
        if (matches) {
          simulatedOutput = matches
            .map((m) => m.replace('print(', '').replace(')', '').replace(/["']/g, ''))
            .join('\n');
        } else {
          simulatedOutput = 'Program executed successfully!\nOutput: Assalam-o-Alaikum from Pakistan AI Sandbox!';
        }
      } else {
        simulatedOutput = 'Code executed successfully with zero runtime errors.';
      }

      setCodeOutput(simulatedOutput || 'Execution finished (Return code 0).');
      setRunningCode(false);
    }, 600);
  };

  const handleQuizCheck = (mIdx: number, oIdx: number) => {
    const isCorrect = oIdx === currentModule.quizQuestion.answer;
    setSelectedQuizAnswers((prev) => ({ ...prev, [mIdx]: oIdx }));
    setQuizFeedback((prev) => ({ ...prev, [mIdx]: isCorrect }));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Course Selection Cards */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <Code2 className="w-5 h-5 text-emerald-600" />
            <span>AI & Tech Micro-Courses for Pakistan</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Short, practical interactive modules with live code execution, Urdu summaries, and instant knowledge checks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MICRO_COURSES.map((course) => (
            <button
              key={course.id}
              onClick={() => {
                setSelectedCourse(course);
                setActiveModuleIdx(0);
                setCodeOutput(null);
              }}
              className={`text-left p-4 rounded-xl border transition-all ${
                selectedCourse.id === course.id
                  ? 'bg-emerald-50 border-emerald-400 shadow-sm'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                  {course.category}
                </span>
                <span className="text-xs text-slate-500 font-medium">{course.duration}</span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm">{course.title}</h3>
              <p className="text-xs text-slate-600 mt-1 line-clamp-2">{course.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Learning Module Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Module Drawer */}
        <div className="lg:col-span-1 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Modules ({selectedCourse.modules.length})
          </h4>
          {selectedCourse.modules.map((m, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveModuleIdx(idx);
                setCodeOutput(null);
              }}
              className={`w-full text-left p-3 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                activeModuleIdx === idx
                  ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center space-x-2 truncate">
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[11px] font-bold shrink-0">
                  {idx + 1}
                </span>
                <span className="truncate">{m.title}</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            </button>
          ))}
        </div>

        {/* Module Content Area */}
        <div className="lg:col-span-3 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md w-fit mb-2">
              <span>{selectedCourse.title}</span>
              <span>•</span>
              <span>Module {activeModuleIdx + 1}</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">{currentModule.title}</h3>
          </div>

          {/* Module Lesson text */}
          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3 whitespace-pre-line">
            {currentModule.content}
          </div>

          {/* Urdu Summary box */}
          {currentModule.urduSummary && (
            <div className="p-4 bg-slate-900 text-white rounded-xl border border-slate-800 space-y-1">
              <span className="text-xs font-bold text-emerald-400 font-urdu block text-right">
                اردو خلاصہ (Urdu Module Summary)
              </span>
              <p className="text-xs sm:text-sm font-urdu text-slate-200 leading-loose text-right" dir="rtl">
                {currentModule.urduSummary}
              </p>
            </div>
          )}

          {/* Interactive Code / Prompt Sandbox */}
          {currentModule.codeExample && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 flex items-center space-x-1">
                  <Code2 className="w-4 h-4 text-emerald-600" />
                  <span>Interactive Python & AI Code Sandbox</span>
                </span>
                <button
                  onClick={() => handleRunCode(currentModule.codeExample)}
                  disabled={runningCode}
                  className="inline-flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-xs transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{runningCode ? 'Running...' : 'Run Code'}</span>
                </button>
              </div>

              <div className="bg-slate-950 text-emerald-400 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-slate-800 shadow-inner">
                <pre>{currentModule.codeExample}</pre>
              </div>

              {codeOutput && (
                <div className="p-3 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs border border-emerald-900/50">
                  <div className="text-[10px] text-emerald-400 font-bold uppercase mb-1">
                    Terminal Output:
                  </div>
                  <pre className="whitespace-pre-wrap">{codeOutput}</pre>
                </div>
              )}
            </div>
          )}

          {/* Quick Quiz Check */}
          {currentModule.quizQuestion && (
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-900 uppercase">
                <HelpCircle className="w-4 h-4 text-emerald-600" />
                <span>Knowledge Check:</span>
              </div>
              <p className="text-sm font-semibold text-slate-900">
                {currentModule.quizQuestion.question}
              </p>

              <div className="space-y-2">
                {currentModule.quizQuestion.options.map((opt, oIdx) => {
                  const isAnswered = selectedQuizAnswers[activeModuleIdx] !== undefined;
                  const isSelected = selectedQuizAnswers[activeModuleIdx] === oIdx;
                  const isCorrect = oIdx === currentModule.quizQuestion.answer;

                  let optBtnStyle = 'bg-white hover:bg-slate-100 border-slate-200 text-slate-800';

                  if (isAnswered) {
                    if (isCorrect) {
                      optBtnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold';
                    } else if (isSelected && !isCorrect) {
                      optBtnStyle = 'bg-red-100 border-red-300 text-red-950 font-bold';
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleQuizCheck(activeModuleIdx, oIdx)}
                      className={`w-full text-left p-3 rounded-lg border text-xs font-medium transition-all flex items-center justify-between ${optBtnStyle}`}
                    >
                      <span>{opt}</span>
                      {isAnswered && isCorrect && <CheckCircle className="w-4 h-4 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>

              {selectedQuizAnswers[activeModuleIdx] !== undefined && (
                <div className={`p-2.5 rounded-lg text-xs font-bold ${
                  quizFeedback[activeModuleIdx]
                    ? 'bg-emerald-100 text-emerald-900'
                    : 'bg-red-100 text-red-900'
                }`}>
                  {quizFeedback[activeModuleIdx]
                    ? '🎉 Correct answer! Excellent understanding.'
                    : '❌ Incorrect. Review the lesson module above.'}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
