import { Link } from "react-router-dom";
import { Category } from "../types";
import { LucideIcon } from "./LucideIcon";
import { Sparkles, ArrowRight } from "lucide-react";

interface CategoryCardProps {
  category: Category;
  totalQuestions: number;
  answeredQuestionsCount: number;
  colorClass: string;
}

export function CategoryCard({ 
  category, 
  totalQuestions, 
  answeredQuestionsCount, 
  colorClass 
}: CategoryCardProps) {
  const percentage = totalQuestions > 0 ? Math.round((answeredQuestionsCount / totalQuestions) * 100) : 0;

  // Set borders and highlights based on category
  let gradientBg = "from-emerald-50 to-teal-50/30 text-emerald-600";
  let borderHover = "hover:border-emerald-200 hover:shadow-emerald-100/40";
  let progressColor = "bg-emerald-500";
  
  if (category.name === "English") {
    gradientBg = "from-blue-50 to-teal-50/20 text-blue-600";
    borderHover = "hover:border-blue-200 hover:shadow-blue-100/40";
    progressColor = "bg-blue-600";
  } else if (category.name === "Islamic Studies") {
    gradientBg = "from-amber-50 to-orange-50/20 text-amber-600";
    borderHover = "hover:border-amber-200 hover:shadow-amber-100/40";
    progressColor = "bg-amber-500";
  } else if (category.name === "Pakistan Studies") {
    gradientBg = "from-green-50 to-emerald-50/20 text-green-600";
    borderHover = "hover:border-green-200 hover:shadow-green-100/40";
    progressColor = "bg-green-600";
  } else if (category.name === "Computer Science") {
    gradientBg = "from-indigo-50 to-purple-50/20 text-indigo-600";
    borderHover = "hover:border-indigo-200 hover:shadow-indigo-100/40";
    progressColor = "bg-indigo-600";
  } else if (category.name === "Mathematics") {
    gradientBg = "from-violet-50 to-fuchsia-50/20 text-violet-600";
    borderHover = "hover:border-violet-200 hover:shadow-violet-100/40";
    progressColor = "bg-violet-600";
  }

  return (
    <Link 
      id={`category-card-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
      to={`/category/${encodeURIComponent(category.name)}`}
      className={`relative flex flex-col justify-between p-6 bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group ${borderHover}`}
    >
      {/* Sparkle high-score tag if fully completed */}
      {percentage === 100 && (
        <span className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold tracking-wider uppercase animate-bounce">
          <Sparkles size={10} className="fill-emerald-800" />
          Mastered
        </span>
      )}

      <div>
        {/* Category Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradientBg} flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300`}>
            <LucideIcon name={category.icon} size={22} className="stroke-[2.2]" />
          </div>
          <div>
            <h3 className="font-sans font-bold text-lg text-gray-950 group-hover:text-emerald-600 transition-colors duration-150">
              {category.name}
            </h3>
            <p className="text-xs text-gray-400 font-mono">
              {category.subCategories.length} Topics
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 pr-2 mb-6">
          {category.description}
        </p>
      </div>

      <div>
        {/* Progress Display */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center text-xs font-medium">
            <span className="text-gray-400">Completed</span>
            <span className="text-gray-700 font-semibold">{answeredQuestionsCount} / {totalQuestions} MCQs</span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full ${progressColor} rounded-full transition-all duration-500`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-between items-center pt-2 border-t border-gray-50">
          <span className="text-xs font-mono font-medium text-gray-400 group-hover:text-gray-600 transition-colors">
            {percentage}% Completed
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 group-hover:translate-x-1.5 transition-transform duration-200">
            Start Prep
            <ArrowRight size={14} className="stroke-[2.5]" />
          </span>
        </div>
      </div>
    </Link>
  );
}
