import { useParams, Link, Navigate } from "react-router-dom";
import { categoriesData } from "../data/categories";
import { SubCategoryCard } from "../components/SubCategoryCard";
import { MCQ, SelectedAnswers } from "../types";
import { ChevronRight, ArrowLeft, BookOpen, Clock, Sparkles } from "lucide-react";

interface SubcategoryProps {
  allMcqs: MCQ[];
  selectedAnswers: SelectedAnswers;
}

export function Subcategory({ allMcqs, selectedAnswers }: SubcategoryProps) {
  const { categoryName } = useParams<{ categoryName: string }>();

  // Decode the category name safely
  const decodedCategory = decodeURIComponent(categoryName || "");
  const category = categoriesData.find(c => c.name.toLowerCase() === decodedCategory.toLowerCase());

  // Handle case where category is not found in local config
  if (!category) {
    return <Navigate to="/" replace />;
  }

  // Calculate statistics for this category
  const categoryMcqs = allMcqs.filter(m => m.category === category.name);
  const totalQuestions = categoryMcqs.length;
  const answeredCount = categoryMcqs.filter(m => selectedAnswers[m.id] !== undefined).length;
  const percentage = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  // Track subcategory statistics
  const getSubcategoryStats = (subName: string) => {
    const subMcqs = categoryMcqs.filter(m => m.subCategory === subName);
    const total = subMcqs.length;
    const answered = subMcqs.filter(m => selectedAnswers[m.id] !== undefined).length;
    return { total, answered };
  };

  return (
    <div id="subcategory-view" className="space-y-8 animate-fadeIn">
      {/* Breadcrumb Navigation Row */}
      <nav className="flex items-center gap-2 text-xs font-mono text-gray-400">
        <Link to="/" className="hover:text-emerald-600 transition-colors">
          Home
        </Link>
        <ChevronRight size={12} className="text-gray-300" />
        <span className="text-gray-700 font-bold">{category.name}</span>
      </nav>

      {/* Category Banner Title Section */}
      <section className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3.5">
          <Link 
            to="/" 
            className="inline-flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft size={14} className="stroke-[2.5]" />
            Back to Subjects
          </Link>
          
          <h2 className="font-sans font-extrabold text-2xl sm:text-3xl tracking-tight text-gray-900">
            {category.name} <span className="text-gray-400">Preparation</span>
          </h2>
          
          <p className="text-sm text-gray-600 max-w-xl leading-relaxed">
            {category.description}
          </p>
        </div>

        {/* Global stats block for selected Category */}
        <div className="flex items-center gap-5 bg-gray-50 border border-gray-100 p-4 rounded-xl min-w-[240px]">
          <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
            <svg className="w-12 h-12 transform -rotate-90">
              <circle
                cx="24"
                cy="24"
                r="18"
                stroke="#e5e7eb"
                strokeWidth="4"
                fill="transparent"
              />
              <circle
                cx="24"
                cy="24"
                r="18"
                stroke="#10b981"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 18}
                strokeDashoffset={2 * Math.PI * 18 * (1 - percentage / 100)}
                className="transition-all duration-500"
              />
            </svg>
            <span className="absolute text-[10px] font-mono font-bold text-gray-800">
              {percentage}%
            </span>
          </div>

          <div className="space-y-1">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Overall Progress</div>
            <div className="text-sm font-extrabold text-gray-800">
              {answeredCount} / {totalQuestions} <span className="text-xs font-normal text-gray-400">MCQs Solved</span>
            </div>
          </div>
        </div>
      </section>

      {/* Grid of Sub-categories/Topics */}
      <section className="space-y-6">
        <div className="border-b border-gray-100 pb-3">
          <h3 className="font-sans font-bold text-lg text-gray-950">
            Select a Focus Topic
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Choose a narrower discipline to practice. Each module features pagination blocks and real-time review.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {category.subCategories.map((sub) => {
            const stats = getSubcategoryStats(sub.name);
            return (
              <SubCategoryCard
                key={`sub-${sub.name}`}
                categoryName={category.name}
                subCategory={sub}
                totalQuestions={stats.total}
                answeredQuestionsCount={stats.answered}
              />
            );
          })}
        </div>
      </section>

      {/* Bottom informational card */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50/40 p-5 rounded-2xl border border-emerald-100 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
            <Sparkles size={18} />
          </div>
          <div>
            <h5 className="font-bold text-sm text-emerald-950">Preparing for Competitive Exams?</h5>
            <p className="text-xs text-emerald-800">
              Spend at least 15 minutes drilling each subcategory to achieve a 100% completion badge.
            </p>
          </div>
        </div>
        <Link
          to="/"
          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 underline underline-offset-4"
        >
          View other subjects
        </Link>
      </div>
    </div>
  );
}
