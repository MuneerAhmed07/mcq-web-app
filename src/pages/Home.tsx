import { useState } from "react";
import { categoriesData } from "../data/categories";
import { CategoryCard } from "../components/CategoryCard";
import { MCQ, SelectedAnswers } from "../types";
import { MCQCard } from "../components/MCQCard";
import { BookOpenCheck, Search, HelpCircle, GraduationCap, X, SlidersHorizontal } from "lucide-react";

interface HomeProps {
  allMcqs: MCQ[];
  selectedAnswers: SelectedAnswers;
  onSelectAnswer: (mcqId: number, answer: string) => void;
}

export function Home({ allMcqs, selectedAnswers, onSelectAnswer }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("All");

  // Get list of distinct categories for filters
  const categories = ["All", ...categoriesData.map(c => c.name)];

  // Filter MCQs based on query and selected category
  const filteredMcqs = allMcqs.filter((mcq) => {
    const matchesSearch = mcq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          mcq.options.some(opt => opt.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategoryFilter === "All" || mcq.category === selectedCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Calculate stats for each category
  const getCategoryStats = (categoryName: string) => {
    const mcqsInCategory = allMcqs.filter(m => m.category === categoryName);
    const total = mcqsInCategory.length;
    const answered = mcqsInCategory.filter(m => selectedAnswers[m.id] !== undefined).length;
    return { total, answered };
  };

  const isSearching = searchQuery.trim().length > 0;

  return (
    <div id="home-view" className="space-y-12">
      {/* 2. Hero Header Banner */}
      <section className="relative overflow-hidden bg-gradient-to-tr from-gray-950 via-slate-900 to-gray-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(16,185,129,0.15),transparent)] pointer-events-none" />
        
        <div className="relative max-w-3xl z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-400/20 rounded-full text-emerald-400 text-xs font-mono font-bold tracking-wider uppercase">
            <GraduationCap size={12} />
            Study Smarter, Practice Better
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold tracking-tight text-white leading-none">
            Acquire True Mastery with <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">PakCareer Hub MCQs</span>
          </h2>
          
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Test yourself with {allMcqs.length} standard questions curated across 5 academic topics. Re-learn the correct answer instantly via high-efficiency visual highlights.
          </p>

          {/* Interactive Global Search bar */}
          <div className="relative max-w-lg pt-4">
            <div className="relative">
              <Search className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
              <input
                id="global-search-input"
                type="text"
                placeholder="Search MCQs by question term (e.g. 'Constitutions', 'Grammar', 'K2')..."
                value={searchQuery}
                aria-label="Search questions"
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 focus:bg-white focus:text-gray-900/90 text-sm text-gray-200 border border-white/10 focus:border-emerald-500 focus:outline-none transition-all placeholder-gray-400 focus:placeholder-gray-500 font-medium"
              />
              {isSearching && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-3.5 text-gray-400 hover:text-white focus:text-gray-900"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            <p className="text-gray-400 text-[11px] mt-1.5 ml-1 flex items-center gap-1">
              <HelpCircle size={12} />
              Protip: Simply start typing above to see questions from all parts of the app instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Conditional Rendering: Search Mode vs Standard Dashboard */}
      {isSearching ? (
        <section className="space-y-6 animate-fadeIn">
          {/* Search Result Headers */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
            <div>
              <h3 className="font-sans font-bold text-xl text-gray-950 flex items-center gap-2">
                <span>Search Results</span>
                <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-0.5 rounded-full font-mono">
                  {filteredMcqs.length} Match{filteredMcqs.length !== 1 ? 'es' : ''}
                </span>
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Showing matching practice questions matching &quot;{searchQuery}&quot;
              </p>
            </div>

            {/* Quick Filter Categories on Search */}
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <SlidersHorizontal size={14} className="text-gray-400 mr-2" />
              {categories.map((cat) => (
                <button
                  key={`filter-${cat}`}
                  onClick={() => setSelectedCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-xl border font-bold transition-all duration-150 ${
                    selectedCategoryFilter === cat
                      ? "bg-emerald-600 text-white border-transparent shadow-sm"
                      : "bg-white text-gray-500 border-gray-100 hover:bg-gray-50 hover:text-gray-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* List of Filtered Quesitons */}
          {filteredMcqs.length > 0 ? (
            <div className="space-y-4 max-w-4xl">
              {filteredMcqs.map((mcq, idx) => (
                <MCQCard
                  key={`search-mcq-${mcq.id}`}
                  mcq={mcq}
                  questionNumber={idx + 1}
                  selectedAnswer={selectedAnswers[mcq.id]}
                  onSelectAnswer={(opt) => onSelectAnswer(mcq.id, opt)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-gray-100 rounded-2xl p-8 max-w-md mx-auto">
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mx-auto text-gray-300 mb-4 border border-dashed">
                <Search size={20} />
              </div>
              <h4 className="font-bold text-gray-800 mb-1">No matching questions found</h4>
              <p className="text-xs text-gray-500 px-4">
                We couldn&apos;t find any MCQs matching your search. Try another subject term or view categories.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategoryFilter("All");
                }}
                className="mt-4 px-4 py-2 text-xs font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors"
              >
                Clear Search & Filters
              </button>
            </div>
          )}
        </section>
      ) : (
        /* Standard Category View */
        <section className="space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="font-sans font-extrabold text-xl text-gray-950 tracking-tight">
              Select a Subject to Practice
            </h3>
            <p className="text-xs text-sidebar-foreground text-gray-500 mt-1">
              Select one of our primary academic groups to drilling specific sub-topics and check correctness instantly.
            </p>
          </div>

          {/* 3. A. Cards list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriesData.map((category) => {
              const stats = getCategoryStats(category.name);
              return (
                <CategoryCard
                  key={`cat-${category.name}`}
                  category={category}
                  totalQuestions={stats.total}
                  answeredQuestionsCount={stats.answered}
                  colorClass={category.name.toLowerCase()}
                />
              );
            })}
          </div>

          {/* Feature Highlights Grid */}
          <div className="mt-12 bg-gray-50 rounded-2xl p-6 border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-200/60">
            <div className="p-2 space-y-1">
              <span className="text-xs font-bold text-emerald-600 font-mono tracking-wider">01. DEEP STUDY</span>
              <h5 className="font-bold text-sm text-gray-900">Zero Alert Anxiety</h5>
              <p className="text-xs text-gray-500 leading-relaxed">
                No red warnings or score penalties are presented. Focus directly on reinforcing the correct answer in green.
              </p>
            </div>
            <div className="p-2 md:pl-6 space-y-1">
              <span className="text-xs font-bold text-teal-600 font-mono tracking-wider">02. MODULAR PATHS</span>
              <h5 className="font-bold text-sm text-gray-900">12 Primary Subtopics</h5>
              <p className="text-xs text-gray-500 leading-relaxed">
                Break your preparation into micro-sessions like Grammar, OS, Geography, Quran, or discrete Calculus.
              </p>
            </div>
            <div className="p-2 md:pl-6 space-y-1">
              <span className="text-xs font-bold text-indigo-600 font-mono tracking-wider">03. CLIENT PRESISTENCE</span>
              <h5 className="font-bold text-sm text-gray-900">Automatic Saving</h5>
              <p className="text-xs text-gray-500 leading-relaxed">
                Practice at your own speed! Sub-progress points remain synced on your computer state so you never lose index points.
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
