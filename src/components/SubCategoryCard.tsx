import { Link } from "react-router-dom";
import { LucideIcon } from "./LucideIcon";
import { Sparkles, ArrowRight } from "lucide-react";

interface SubCategoryCardProps {
  categoryName: string;
  subCategory: {
    name: string;
    description: string;
    icon: string;
  };
  totalQuestions: number;
  answeredQuestionsCount: number;
}

export function SubCategoryCard({
  categoryName,
  subCategory,
  totalQuestions,
  answeredQuestionsCount,
}: SubCategoryCardProps) {
  const percentage = totalQuestions > 0 ? Math.round((answeredQuestionsCount / totalQuestions) * 100) : 0;

  let accentColor = "emerald";
  let bgGradient = "from-emerald-500 to-teal-400";
  let iconBg = "bg-emerald-50 text-emerald-600";
  let textHighlight = "group-hover:text-emerald-600";
  let borderHighlight = "hover:border-emerald-200 hover:shadow-emerald-100/40";
  
  if (categoryName === "English") {
    accentColor = "blue";
    bgGradient = "from-blue-500 to-cyan-400";
    iconBg = "bg-blue-50 text-blue-600";
    textHighlight = "group-hover:text-blue-600";
    borderHighlight = "hover:border-blue-200 hover:shadow-blue-100/40";
  } else if (categoryName === "Islamic Studies") {
    accentColor = "amber";
    bgGradient = "from-amber-500 to-orange-400";
    iconBg = "bg-amber-50 text-amber-600";
    textHighlight = "group-hover:text-amber-600";
    borderHighlight = "hover:border-amber-200 hover:shadow-amber-100/40";
  } else if (categoryName === "Pakistan Studies") {
    accentColor = "green";
    bgGradient = "from-green-500 to-emerald-400";
    iconBg = "bg-green-50 text-green-600";
    textHighlight = "group-hover:text-green-600";
    borderHighlight = "hover:border-green-200 hover:shadow-green-100/40";
  } else if (categoryName === "Computer Science") {
    accentColor = "indigo";
    bgGradient = "from-indigo-500 to-purple-400";
    iconBg = "bg-indigo-50 text-indigo-600";
    textHighlight = "group-hover:text-indigo-600";
    borderHighlight = "hover:border-indigo-200 hover:shadow-indigo-100/40";
  } else if (categoryName === "Mathematics") {
    accentColor = "violet";
    bgGradient = "from-violet-500 to-fuchsia-400";
    iconBg = "bg-violet-50 text-violet-600";
    textHighlight = "group-hover:text-violet-600";
    borderHighlight = "hover:border-violet-200 hover:shadow-violet-100/40";
  }

  return (
    <Link
      id={`subcategory-card-${subCategory.name.toLowerCase().replace(/\s+/g, '-')}`}
      to={`/category/${encodeURIComponent(categoryName)}/${encodeURIComponent(subCategory.name)}`}
      className={`relative flex flex-col justify-between p-6 bg-white rounded-2xl border border-gray-100 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.02)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group ${borderHighlight}`}
    >
      {percentage === 100 && (
        <span className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100/85 text-emerald-800 text-[9px] font-bold tracking-wider uppercase">
          <Sparkles size={8} className="fill-emerald-800" />
          Completed
        </span>
      )}

      <div>
        <div className="flex items-center gap-3.5 mb-3.5">
          <div className={`w-11 h-11 rounded-lg ${iconBg} flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-200`}>
            <LucideIcon name={subCategory.icon} size={18} className="stroke-[2.2]" />
          </div>
          <div>
            <h4 className={`font-sans font-bold text-base text-gray-950 transition-colors duration-150 ${textHighlight}`}>
              {subCategory.name}
            </h4>
            <p className="text-[10px] font-mono text-gray-400">
              {totalQuestions} Practice Questions
            </p>
          </div>
        </div>

        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-6">
          {subCategory.description}
        </p>
      </div>

      <div>
        {/* Progress percent display */}
        <div className="space-y-1.5 mb-3">
          <div className="flex justify-between items-center text-[11px] font-medium text-gray-400">
            <span>Sub-topic Progress</span>
            <span className="font-bold text-gray-700">{answeredQuestionsCount} / {totalQuestions} Solidified</span>
          </div>
          <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${bgGradient} rounded-full transition-all duration-500`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Action Link Row */}
        <div className="flex justify-between items-center pt-2.5 border-t border-gray-50 text-xs">
          <span className="font-mono text-gray-400">
            {percentage}% Mastered
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 group-hover:translate-x-1 transition-transform">
            Go to Quiz
            <ArrowRight size={12} className="stroke-[2.5]" />
          </span>
        </div>
      </div>
    </Link>
  );
}
