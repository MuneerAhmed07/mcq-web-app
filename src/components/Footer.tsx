import { BookOpenCheck, RotateCcw, Heart } from "lucide-react";

interface FooterProps {
  onResetAnswers: () => void;
  totalAnswered: number;
}

export function Footer({ onResetAnswers, totalAnswered }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-gray-800">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
                <BookOpenCheck size={16} className="stroke-[2.5]" />
              </div>
              <span className="font-sans font-bold text-white tracking-tight">PakCareerHub MCQs</span>
            </div>
            <p className="text-sm text-gray-400 max-w-xs">
              A responsive, client-side preparation resource designed for competitive exams, job tests, and academics.
            </p>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Subjects Covered</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="hover:text-emerald-400 transition-colors">English Prep</span>
              <span className="hover:text-emerald-400 transition-colors font-sans font-medium">Islamic Studies</span>
              <span className="hover:text-emerald-400 transition-colors">Pakistan Studies</span>
              <span className="hover:text-emerald-400 transition-colors">Computer Science</span>
              <span className="hover:text-emerald-400 transition-colors">Mathematics</span>
            </div>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Practice Settings</h4>
            <p className="text-sm mb-4">
              Your answered MCQs are automatically saved. If you wish to clear your selections and start over:
            </p>
            {totalAnswered > 0 ? (
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to reset all your answered questions? This cannot be undone.")) {
                    onResetAnswers();
                  }
                }}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-red-950 hover:bg-red-900 text-red-300 border border-red-800 text-xs font-semibold transition-colors duration-200"
              >
                <RotateCcw size={14} />
                Reset {totalAnswered} Answered MCQ{totalAnswered !== 1 ? 's' : ''}
              </button>
            ) : (
              <span className="inline-block text-xs text-gray-500 italic">No answered questions yet.</span>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} PrepHub MCQs. Fully serverless client app.</p>
          <p className="flex items-center gap-1">
            Built with dedication for deep learning and high scoring.
          </p>
        </div>
      </div>
    </footer>
  );
}
