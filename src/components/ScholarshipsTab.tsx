import React, { useState } from 'react';
import { Award, ExternalLink, Filter, Search, CheckCircle, Sparkles, Building, Globe, DollarSign } from 'lucide-react';
import { SCHOLARSHIPS } from '../data/pakistanCurriculum';
import { ScholarshipItem } from '../types';

export const ScholarshipsTab: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedScholarship, setSelectedScholarship] = useState<ScholarshipItem | null>(null);

  const categories = ['All', 'Government', 'Local', 'International', 'Need-Based'];

  const filtered = SCHOLARSHIPS.filter((s) => {
    const matchesCat = filterCategory === 'All' || s.category === filterCategory;
    const matchesSearch =
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.targetLevel.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
              <Award className="w-5 h-5 text-emerald-600" />
              <span>Pakistani & Global Educational Scholarships</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Find HEC Need-Based Grants, PEEF, Ehsaas, Fulbright (USA), and Erasmus Mundus (Europe) opportunities.
            </p>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by keyword, university, or qualification..."
              className="w-full pl-9 pr-4 py-2 text-xs text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="flex space-x-1.5 w-full sm:w-auto overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all whitespace-nowrap ${
                  filterCategory === cat
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scholarship Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md">
                  {item.category}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  Deadline: {item.deadline}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
              <p className="text-xs text-emerald-700 font-semibold">{item.organization}</p>

              <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 border border-slate-200 text-xs text-slate-700">
                <div className="flex items-center space-x-1 font-semibold text-slate-900">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Coverage: {item.coverage}</span>
                </div>
                <div className="flex items-center space-x-1 text-slate-600">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <span>Target: {item.targetLevel}</span>
                </div>
              </div>

              <div className="text-xs text-slate-600 space-y-1 pt-1">
                <span className="font-bold text-slate-800 block">Eligibility Criteria:</span>
                <p className="leading-relaxed text-slate-600">{item.eligibility}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setSelectedScholarship(item)}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-900 underline flex items-center space-x-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>AI Eligibility Checklist</span>
              </button>

              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(item.title + ' ' + item.organization)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-3.5 py-1.5 rounded-lg transition-all"
              >
                <span>{item.linkText}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* AI Eligibility Modal / Drawer */}
      {selectedScholarship && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl p-6 shadow-2xl space-y-4 relative animate-scaleUp">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                  AI Eligibility Checklist
                </span>
                <h3 className="font-bold text-slate-900 text-lg mt-1">
                  {selectedScholarship.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedScholarship(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <p className="font-semibold text-slate-900">
                Are you qualified? Check off these requirements:
              </p>
              <div className="space-y-2">
                <div className="flex items-start space-x-2 p-2.5 bg-emerald-50 rounded-lg border border-emerald-200">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Domicile:</strong> Valid Pakistani CNIC / B-Form and provincial domicile.</span>
                </div>
                <div className="flex items-start space-x-2 p-2.5 bg-emerald-50 rounded-lg border border-emerald-200">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Academic Score:</strong> Minimum 60%+ marks in Matric/FSc or 3.0+ CGPA in Bachelor's.</span>
                </div>
                <div className="flex items-start space-x-2 p-2.5 bg-emerald-50 rounded-lg border border-emerald-200">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Need Basis:</strong> Family income proof (Salary slip / Electricity bill evaluation).</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedScholarship(null)}
                className="bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-xl"
              >
                Got It, Thanks!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
