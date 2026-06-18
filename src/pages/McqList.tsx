import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { categoriesData } from "../data/categories";
import { MCQ, SelectedAnswers } from "../types";
import { MCQCard } from "../components/MCQCard";
import { Pagination } from "../components/Pagination";
import { 
  ChevronRight, 
  ArrowLeft, 
  Search, 
  Sparkles, 
  RotateCcw, 
  HelpCircle, 
  CheckCircle,
  Loader2
} from "lucide-react";

interface McqListProps {
  allMcqs: MCQ[];
  selectedAnswers: SelectedAnswers;
  onSelectAnswer: (mcqId: number, answer: string) => void;
  onResetSubCategory: (category: string, subCategory: string) => void;
}

export function McqList({
  allMcqs,
  selectedAnswers,
  onSelectAnswer,
  onResetSubCategory,
}: McqListProps) {
  const { categoryName, subCategoryName } = useParams<{ 
    categoryName: string; 
    subCategoryName: string; 
  }>();

  // Decode parameters
  const decodedCategory = decodeURIComponent(categoryName || "");
  const decodedSubCategory = decodeURIComponent(subCategoryName || "");

  const category = categoriesData.find(c => c.name.toLowerCase() === decodedCategory.toLowerCase());
  const subCategoryExists = category?.subCategories.some(
    s => s.name.toLowerCase() === decodedSubCategory.toLowerCase()
  );

  // Redirect if URL parameters are illegal
  if (!category || !subCategoryExists) {
    return <Navigate to="/" replace />;
  }

  // State
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Reset page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Simulate smooth loading transition when changing pages or searching
  const handlePageChange = (page: number) => {
    setLoading(true);
    setCurrentPage(page);
    
    // Smooth scroll to quiz card container
    const element = document.getElementById("quiz-container-top");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  // Filter MCQ data for this category & subcategory
  const subCategoryMcqs = allMcqs.filter(
    m => m.category === category.name && m.subCategory.toLowerCase() === decodedSubCategory.toLowerCase()
  );

  // Search filter within results
  const filteredMcqs = subCategoryMcqs.filter((mcq) =>
    mcq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mcq.options.some(opt => opt.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Pagination bounds (10 elements per page as strictly requested)
  const questionsPerPage = 10;
  const totalPages = Math.ceil(filteredMcqs.length / questionsPerPage);
  
  const startIndex = (currentPage - 1) * questionsPerPage;
  const endIndex = Math.min(startIndex + questionsPerPage, filteredMcqs.length);
  const currentMcqs = filteredMcqs.slice(startIndex, startIndex + questionsPerPage);

  // General counts
  const totalQuestions = subCategoryMcqs.length;
  const answeredInSubcategory = subCategoryMcqs.filter(m => selectedAnswers[m.id] !== undefined).length;
  const percentage = totalQuestions > 0 ? Math.round((answeredInSubcategory / totalQuestions) * 100) : 0;

  // Visual Theme settings
  let themeName = "emerald";
  
  if (category.name === "English") {
    themeName = "blue";
  } else if (category.name === "Islamic Studies") {
    themeName = "amber";
  } else if (category.name === "Pakistan Studies") {
    themeName = "green";
  } else if (category.name === "Computer Science") {
    themeName = "indigo";
  } else if (category.name === "Mathematics") {
    themeName = "violet";
  }

  return (
    <div id="quiz-list-view" className="space-y-8 animate-fadeIn">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-mono text-gray-400">
        <Link to="/" className="hover:text-emerald-600 transition-colors">
          Home
        </Link>
        <ChevronRight size={12} className="text-gray-300" />
        <Link 
          to={`/category/${encodeURIComponent(category.name)}`} 
          className="hover:text-emerald-600 transition-colors"
        >
          {category.name}
        </Link>
        <ChevronRight size={12} className="text-gray-300" />
        <span className="text-gray-700 font-bold">{decodedSubCategory}</span>
      </nav>

      {/* Main Stats Header banner for Subcategory */}
      <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.015)] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3">
          <Link 
            to={`/category/${encodeURIComponent(category.name)}`} 
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft size={14} className="stroke-[2.5]" />
            Back to Topics
          </Link>
          
          <h2 className="font-sans font-extrabold text-2xl tracking-tight text-gray-900 leading-none">
            {decodedSubCategory} <span className="text-gray-400 text-lg font-normal">Practice</span>
          </h2>
          
          <p className="text-xs text-gray-500 max-w-lg">
            Complete the questions below. Touch or click any option to disclose its solution immediately in green.
          </p>
        </div>

        {/* Info stats pill and Reset button */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100 flex items-center gap-3.5 min-w-[180px]">
            <div className="w-9 h-9 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-xs">
              {percentage}%
            </div>
            <div>
              <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Progress</div>
              <div className="text-xs font-extrabold text-gray-700">
                {answeredInSubcategory} / {totalQuestions} Answered
              </div>
            </div>
          </div>

          {answeredInSubcategory > 0 && (
            <button
              onClick={() => {
                if (window.confirm(`Are you sure you want to reset your progress for ${decodedSubCategory}?`)) {
                  onResetSubCategory(category.name, decodedSubCategory);
                  setCurrentPage(1);
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-500 hover:text-red-600 hover:bg-red-50 border border-gray-100 rounded-xl transition-all duration-150"
              title="Reset current subcategory answers"
            >
              <RotateCcw size={13} />
              Reset Topic
            </button>
          )}
        </div>
      </section>

      {/* Target for scrolling to top of practice */}
      <div id="quiz-container-top" />

      {/* Filtering and Pagination Status Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        {/* Progress Tracker display: "Showing 1-10 of 20 MCQs" */}
        <div className="text-sm">
          {filteredMcqs.length > 0 ? (
            <p className="text-gray-600">
              Showing <span className="font-bold text-gray-900">{startIndex + 1}–{endIndex}</span> of{" "}
              <span className="font-bold text-gray-900">{filteredMcqs.length}</span> MCQ
              {filteredMcqs.length !== 1 ? "s" : ""}
              {searchQuery && (
                <span className="text-xs text-gray-400 ml-1.5">
                  (filtered from {totalQuestions})
                </span>
              )}
            </p>
          ) : (
            <p className="text-gray-400 italic">No MCQs found matching your criteria</p>
          )}
        </div>

        {/* Searching bar */}
        <div className="relative max-w-sm w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={15} />
          <input
            id="quiz-search-bar"
            type="text"
            placeholder="Search within this topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-gray-200/70 focus:border-emerald-500 focus:outline-none bg-white transition-all text-gray-700"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-700"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Loading overlay & MCQ Card Grid */}
      <div className="relative min-h-[300px]">
        {loading ? (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] z-10 flex flex-col items-center justify-center gap-3 rounded-2xl animate-fadeIn">
            <Loader2 className="animate-spin text-emerald-600" size={28} />
            <p className="text-xs font-semibold text-gray-500 tracking-wider">Fetching next set...</p>
          </div>
        ) : null}

        {/* MCQ Cards list */}
        {currentMcqs.length > 0 ? (
          <div className="space-y-6">
            {currentMcqs.map((mcq, idx) => {
              // Calculate index number absolute to the subcategory
              const absoluteNumber = startIndex + idx + 1;
              
              return (
                <MCQCard
                  key={`mcq-${mcq.id}`}
                  mcq={mcq}
                  questionNumber={absoluteNumber}
                  selectedAnswer={selectedAnswers[mcq.id]}
                  onSelectAnswer={(answer) => onSelectAnswer(mcq.id, answer)}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-gray-100 rounded-2xl p-6">
            <HelpCircle size={32} className="mx-auto text-gray-300 mb-3" />
            <h4 className="font-bold text-gray-800">No questions match your term</h4>
            <p className="text-xs text-gray-400 mt-1">
              Try adjusting your query in the top right, or clear searching to retrieve all {totalQuestions} questions.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-600 text-xs font-semibold rounded-lg transition-colors border border-gray-100"
            >
              Clear Topic Search
            </button>
          </div>
        )}
      </div>

      {/* Category-themed Pagination component */}
      {filteredMcqs.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          accentColorClass={themeName}
        />
      )}

      {/* Completion milestone prompt */}
      {percentage === 100 && filteredMcqs.length === subCategoryMcqs.length && (
        <div className="bg-gradient-to-tr from-emerald-500 to-teal-500 text-white p-6 rounded-2xl shadow-md border border-emerald-400/20 text-center space-y-3.5">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mx-auto text-white shadow-inner">
            <Sparkles size={18} className="fill-white" />
          </div>
          <div className="space-y-1">
            <h4 className="font-sans font-bold text-lg">Congratulations!</h4>
            <p className="text-xs text-emerald-50 max-w-md mx-auto leading-relaxed">
              You have completed all {totalQuestions} questions in <strong className="font-semibold">{decodedSubCategory}</strong>! Your review history is complete. Feel free to practice other categories!
            </p>
          </div>
          <div className="pt-1.5 flex justify-center gap-3">
            <Link
              to={`/category/${encodeURIComponent(category.name)}`}
              className="px-4 py-2 bg-white text-emerald-800  text-xs font-bold rounded-xl transition-all hover:bg-emerald-50 shadow-sm"
            >
              Practice other topics under {category.name}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
