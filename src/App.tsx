import { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import mcqsData from "./data/mcqs.json";
import { MCQ, SelectedAnswers } from "./types";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Subcategory } from "./pages/Subcategory";
import { McqList } from "./pages/McqList";

// Helper component that forces window to scroll to top whenever the URL path changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

// Global layout wrapper that holds navigation and passes stats
function AppContent({
  allMcqs,
  selectedAnswers,
  onSelectAnswer,
  onResetAnswers,
  onResetSubCategory,
}: {
  allMcqs: MCQ[];
  selectedAnswers: SelectedAnswers;
  onSelectAnswer: (mcqId: number, answer: string) => void;
  onResetAnswers: () => void;
  onResetSubCategory: (category: string, subCategory: string) => void;
}) {
  const totalQuestions = allMcqs.length;
  const totalAnswered = Object.keys(selectedAnswers).length;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50 font-sans text-gray-800 antialiased selection:bg-emerald-100 selection:text-emerald-900">
      <ScrollToTop />
      
      {/* 6. Header */}
      <Header totalAnswered={totalAnswered} totalQuestions={totalQuestions} />
      
      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Routes>
          {/* Path: / */}
          <Route 
            path="/" 
            element={
              <Home 
                allMcqs={allMcqs} 
                selectedAnswers={selectedAnswers} 
                onSelectAnswer={onSelectAnswer} 
              />
            } 
          />
          
          {/* Path: /category/:categoryName */}
          <Route 
            path="/category/:categoryName" 
            element={
              <Subcategory 
                allMcqs={allMcqs} 
                selectedAnswers={selectedAnswers} 
              />
            } 
          />
          
          {/* Path: /category/:categoryName/:subCategoryName */}
          <Route 
            path="/category/:categoryName/:subCategoryName" 
            element={
              <McqList 
                allMcqs={allMcqs} 
                selectedAnswers={selectedAnswers} 
                onSelectAnswer={onSelectAnswer} 
                onResetSubCategory={onResetSubCategory}
              />
            } 
          />

          {/* Fallback redirect path */}
          <Route path="*" element={<Home allMcqs={allMcqs} selectedAnswers={selectedAnswers} onSelectAnswer={onSelectAnswer} />} />
        </Routes>
      </main>

      {/* 6. Footer */}
      <Footer onResetAnswers={onResetAnswers} totalAnswered={totalAnswered} />
    </div>
  );
}

export default function App() {
  const allMcqs: MCQ[] = mcqsData as MCQ[];

  // Load answers from localStorage on startup
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>(() => {
    try {
      const persisted = localStorage.getItem("prephub_selected_answers");
      return persisted ? JSON.parse(persisted) : {};
    } catch {
      return {};
    }
  });

  // Keep state and localStorage inside sync
  const handleSelectAnswer = (mcqId: number, answer: string) => {
    setSelectedAnswers((prev) => {
      const updated = { ...prev, [mcqId]: answer };
      try {
        localStorage.setItem("prephub_selected_answers", JSON.stringify(updated));
      } catch (err) {
        console.error("Local storage sync error: ", err);
      }
      return updated;
    });
  };

  // Reset entire history
  const handleResetAnswers = () => {
    setSelectedAnswers({});
    try {
      localStorage.removeItem("prephub_selected_answers");
    } catch (err) {
      console.error(err);
    }
  };

  // Reset progress specifically for one subcategory
  const handleResetSubCategory = (categoryName: string, subCategoryName: string) => {
    setSelectedAnswers((prev) => {
      const updated = { ...prev };
      
      // Filter out all questions belonging to this subtopic
      allMcqs.forEach((mcq) => {
        if (
          mcq.category.toLowerCase() === categoryName.toLowerCase() &&
          mcq.subCategory.toLowerCase() === subCategoryName.toLowerCase()
        ) {
          delete updated[mcq.id];
        }
      });

      try {
        localStorage.setItem("prephub_selected_answers", JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
      return updated;
    });
  };

  return (
    <Router>
      <AppContent 
        allMcqs={allMcqs} 
        selectedAnswers={selectedAnswers} 
        onSelectAnswer={handleSelectAnswer} 
        onResetAnswers={handleResetAnswers} 
        onResetSubCategory={handleResetSubCategory}
      />
    </Router>
  );
}
