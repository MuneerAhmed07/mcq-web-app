import { Link } from "react-router-dom";
import { BookOpenCheck, BarChart3, HelpCircle } from "lucide-react";

interface HeaderProps {
  totalAnswered: number;
  totalQuestions: number;
}

export function Header({ totalAnswered, totalQuestions }: HeaderProps) {
  const percentage = totalQuestions > 0 ? Math.round((totalAnswered / totalQuestions) * 100) : 0;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo element */}
          <Link to="/" className="flex items-center gap-2.5 group transition-transform duration-150 active:scale-95">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-100 group-hover:rotate-3 transition-transform duration-300">
              <BookOpenCheck size={20} className="stroke-[2.5]" />
            </div>
            <div>
              <h1 className="font-sans font-bold text-lg tracking-tight text-gray-900 group-hover:text-emerald-600 transition-colors duration-150">
                PakCareerHub <span className="text-emerald-500 text-xs font-normal align-super px-1.5 py-0.5 bg-emerald-50 rounded-full">MCQs</span>
              </h1>
              <p className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Educational Platform</p>
            </div>
          </Link>

          {/* Navigation and Stats */}
          <div className="flex items-center gap-6">
            <Link 
              to="/" 
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-emerald-600 transition-colors"
            >
              Explore
            </Link>
            
            {/* Real-time Progress Counter bar */}
            <div className="relative flex items-center gap-3 bg-gray-50 px-3.5 py-1.5 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex flex-col text-right">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest leading-none">Overall Progress</span>
                <span className="text-xs font-bold text-gray-700 mt-1">
                  {totalAnswered} / {totalQuestions} <span className="text-gray-400 font-normal">MCQs</span>
                </span>
              </div>
              
              {/* Radial or linear small progress circle */}
              <div className="relative w-8 h-8 flex items-center justify-center">
                <svg className="w-8 h-8 transform -rotate-90">
                  <circle
                    cx="16"
                    cy="16"
                    r="12"
                    stroke="#f3f4f6"
                    strokeWidth="3box"
                    fill="transparent"
                    className="stroke-gray-100"
                  />
                  <circle
                    cx="16"
                    cy="16"
                    r="12"
                    stroke="#10b981"
                    strokeWidth="3"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 12}
                    strokeDashoffset={2 * Math.PI * 12 * (1 - percentage / 100)}
                    className="transition-all duration-500 ease-out"
                  />
                </svg>
                <span className="absolute text-[9px] font-mono font-bold text-emerald-600">
                  {percentage}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
