import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 bg-slate-900 text-slate-400 text-xs border-t border-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-white font-bold text-lg">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <span>IlmAI Pakistan</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-urdu">
            پاکستان کے طلبا کے لیے ذہین اے آئی تعلیمی معاون
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            Empowering Pakistani learners with curriculum-aligned AI tutoring, MDCAT/ECAT prep, and bilingual study guides.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
            Covered Boards & Exams
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-400">
            <li>• FBISE Federal Board (Islamabad)</li>
            <li>• BISE Punjab (Lahore, Rawalpindi, etc.)</li>
            <li>• BISE Sindh (Karachi, Hyderabad)</li>
            <li>• KPK & Balochistan Boards</li>
            <li>• Cambridge O & A Levels</li>
            <li>• MDCAT & ECAT Entrance Tests</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
            Target Universities
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-400">
            <li>• NUST (Islamabad)</li>
            <li>• FAST-NUCES (Lahore/Isb/Khi)</li>
            <li>• LUMS (Lahore)</li>
            <li>• GIKI (Topi, KPK)</li>
            <li>• COMSATS University</li>
            <li>• UET Lahore & Taxila</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
            Language Modes
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed mb-3">
            Switch anytime between English, Urdu script (اردو), and Roman Urdu for accessible learning across Pakistan.
          </p>
          <div className="inline-flex items-center space-x-1 text-emerald-400 text-xs font-semibold bg-emerald-950/60 p-2 rounded-lg border border-emerald-900">
            <Heart className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
            <span>Built for Pakistani Youth</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between text-slate-500 gap-4">
        <div>
          © {new Date().getFullYear()} IlmAI Pakistan. Empowering Future Innovators.
        </div>
        <div className="flex space-x-4 text-xs">
          <span>Privacy Policy</span>
          <span>•</span>
          <span>Terms of Service</span>
          <span>•</span>
          <span>Powered by Gemini 3.6 Flash</span>
        </div>
      </div>
    </footer>
  );
};
