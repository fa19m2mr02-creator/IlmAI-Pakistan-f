import React, { useState } from 'react';
import { Compass, Sparkles, Building2, Briefcase, GraduationCap, MapPin, CheckCircle, RefreshCw, AlertCircle } from 'lucide-react';
import { EducationBoard, LevelCategory, LanguageMode, CareerRoadmapResponse } from '../types';

interface CareerRoadmapTabProps {
  selectedLevel: LevelCategory;
  languageMode: LanguageMode;
}

export const CareerRoadmapTab: React.FC<CareerRoadmapTabProps> = ({
  selectedLevel,
}) => {
  const [currentLevel, setCurrentLevel] = useState<string>(selectedLevel);
  const [interestArea, setInterestArea] = useState<string>('Artificial Intelligence & Software Engineering');
  const [loading, setLoading] = useState<boolean>(false);
  const [roadmap, setRoadmap] = useState<CareerRoadmapResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const predefinedCareers = [
    'Artificial Intelligence & Machine Learning Engineer',
    'Full Stack Web & Mobile App Developer',
    'Data Scientist & Analytics Specialist',
    'Cybersecurity & Network Engineer',
    'MBBS / Medical Specialist (MDCAT Path)',
    'Mechanical / Electrical Engineer (ECAT Path)',
    'UI/UX Designer & Product Specialist',
    'AI Content & Prompt Engineering Freelancer',
  ];

  const handleGenerateRoadmap = async (roleToUse?: string) => {
    const role = roleToUse || interestArea;
    setLoading(true);
    setError(null);
    setRoadmap(null);

    try {
      const res = await fetch('/api/career-roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentLevel,
          interestArea: role,
          location: 'Pakistan & Global Remote',
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to generate career roadmap');
      }

      const data: CareerRoadmapResponse = await res.json();
      setRoadmap(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong generating the career roadmap.');
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
              <Compass className="w-5 h-5 text-emerald-600" />
              <span>Pakistani AI Career & University Roadmap</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Custom university admission guidance (FAST, NUST, LUMS, GIKI, MDCAT/ECAT), skill roadmaps, and Pakistani freelancing tips.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Your Current Academic Level:
            </label>
            <select
              value={currentLevel}
              onChange={(e) => setCurrentLevel(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-lg p-2.5 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="Matric (9th & 10th)">Matric (9th & 10th)</option>
              <option value="FSc Pre-Engineering (11th & 12th)">FSc Pre-Engineering (11th & 12th)</option>
              <option value="FSc Pre-Medical (11th & 12th)">FSc Pre-Medical (11th & 12th)</option>
              <option value="ICS (Computer Science)">ICS (Computer Science)</option>
              <option value="O / A Levels">O / A Levels</option>
              <option value="University Undergrad">University Undergrad (BS/BE)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Target Career / Specialization:
            </label>
            <input
              type="text"
              value={interestArea}
              onChange={(e) => setInterestArea(e.target.value)}
              placeholder="e.g. AI Engineer, Fullstack Web, Cyber Security, Data Science"
              className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-lg p-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Quick Picks */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-slate-500 mb-2">
            Popular High-Growth Careers in Pakistan:
          </label>
          <div className="flex flex-wrap gap-2">
            {predefinedCareers.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setInterestArea(c);
                  handleGenerateRoadmap(c);
                }}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                  interestArea === c
                    ? 'bg-emerald-600 text-white font-semibold border-emerald-600'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => handleGenerateRoadmap()}
          disabled={loading}
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl shadow-xs transition-all text-xs sm:text-sm"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Building Personalized Roadmap...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate AI Roadmap</span>
            </>
          )}
        </button>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Roadmap Output */}
      {roadmap && (
        <div className="space-y-6">
          {/* Header Overview Card */}
          <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-6 rounded-2xl shadow-xl space-y-3">
            <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
              Target Role Roadmap
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {roadmap.targetRole}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed max-w-3xl">
              {roadmap.overview}
            </p>
          </div>

          {/* Top Universities in Pakistan */}
          {roadmap.topUniversitiesInPakistan && roadmap.topUniversitiesInPakistan.length > 0 && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <GraduationCap className="w-5 h-5 text-emerald-600" />
                <span>Top Pakistani Universities & Entry Tests</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roadmap.topUniversitiesInPakistan.map((uni, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 hover:border-emerald-300 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <h4 className="font-bold text-slate-900 text-sm">
                        {uni.name}
                      </h4>
                      <span className="text-[11px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-md flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{uni.location}</span>
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-slate-600 bg-white p-2 rounded-lg border border-slate-200">
                      🎯 Entry Test Required: <span className="text-emerald-700 font-bold">{uni.entryTest}</span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {uni.recommendation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skill Milestones Timeline */}
          {roadmap.skillMilestones && roadmap.skillMilestones.length > 0 && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <span>Step-by-Step Learning Timeline</span>
              </h3>

              <div className="space-y-4">
                {roadmap.skillMilestones.map((ms, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="bg-emerald-600 text-white font-bold text-xs px-2.5 py-0.5 rounded-md">
                          {ms.phase}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">
                          Duration: {ms.duration}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                        {ms.title}
                      </h4>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {ms.skills.map((s, i) => (
                          <span
                            key={i}
                            className="bg-emerald-100 text-emerald-900 text-[11px] font-semibold px-2.5 py-0.5 rounded-md"
                          >
                            ✓ {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {ms.freeResources && ms.freeResources.length > 0 && (
                      <div className="text-xs bg-white p-3 rounded-lg border border-slate-200 shrink-0 max-w-xs">
                        <span className="font-bold text-slate-700 block mb-1">
                          Recommended Resources:
                        </span>
                        <ul className="space-y-1 text-slate-600">
                          {ms.freeResources.map((resItem, ri) => (
                            <li key={ri} className="truncate">• {resItem}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Freelancing & Local Ecosystem Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Freelance Opportunities */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <Briefcase className="w-4 h-4 text-emerald-600" />
                <span>Freelance Opportunities (Fiverr / Upwork)</span>
              </h3>
              <ul className="space-y-2">
                {roadmap.freelanceOpportunities.map((op, i) => (
                  <li key={i} className="flex items-start space-x-2 text-xs text-slate-700 bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-100">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{op}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pakistan Tech Hubs */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-teal-600" />
                <span>Key Pakistani Software Hubs</span>
              </h3>
              <ul className="space-y-2">
                {roadmap.pakistanTechHubs.map((hub, i) => (
                  <li key={i} className="flex items-start space-x-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{hub}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* AI Pro Advice */}
          {roadmap.aiAdvice && (
            <div className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl text-amber-950 text-xs space-y-2">
              <span className="font-bold text-amber-900 text-sm flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>AI Pro Tip for Pakistani Students:</span>
              </span>
              <p className="leading-relaxed font-medium">
                {roadmap.aiAdvice}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
