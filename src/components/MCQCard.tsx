import { MCQ } from "../types";
import { Check, HelpCircle } from "lucide-react";

interface MCQCardProps {
  mcq: MCQ;
  questionNumber: number;
  selectedAnswer: string | undefined;
  onSelectAnswer: (answer: string) => void;
}

export function MCQCard({
  mcq,
  questionNumber,
  selectedAnswer,
  onSelectAnswer,
}: MCQCardProps) {
  const isAnswered = selectedAnswer !== undefined;

  return (
    <div
      id={`mcq-card-${mcq.id}`}
      className={`p-6 bg-white rounded-2xl border transition-all duration-300 ${
        isAnswered 
          ? "border-emerald-100 shadow-[0_4px_24px_-8px_rgba(16,185,129,0.08)] bg-emerald-50/5" 
          : "border-gray-100 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.02)] hover:border-gray-200"
      }`}
    >
      {/* Header section of MCQ card */}
      <div className="flex justify-between items-start gap-4 mb-4">
        <div className="flex items-center gap-2.5">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 text-gray-500 text-sm font-mono font-bold border border-gray-100 shadow-sm leading-none">
            {questionNumber}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100/80 text-gray-600 text-[10px] font-mono leading-none capitalize">
            {mcq.category} • {mcq.subCategory}
          </span>
        </div>

        {isAnswered && (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 font-sans">
            <Check size={12} className="stroke-[3]" />
            Revealed
          </span>
        )}
      </div>

      {/* The Question Text */}
      <h4 className="font-sans font-medium text-gray-900 text-base leading-relaxed mb-6">
        {mcq.question}
      </h4>

      {/* The Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {mcq.options.map((option, index) => {
          const isCorrectOption = option === mcq.correctAnswer;
          const isSelected = option === selectedAnswer;
          
          // Labels like A, B, C, D
          const labels = ["A", "B", "C", "D"];

          // Default styling
          let optionStyle = "border-gray-100 bg-gray-50/50 hover:bg-gray-100/60 hover:border-gray-200 text-gray-800 active:scale-[0.995]";
          let labelStyle = "bg-white text-gray-400 border-gray-100";

          if (isAnswered && isCorrectOption) {
            // Rule: Immediately highlight ONLY the correct answer in green.
            optionStyle = "border-emerald-500 bg-emerald-50/80 text-emerald-950 font-medium shadow-sm shadow-emerald-100/30 ring-1 ring-emerald-400/20";
            labelStyle = "bg-emerald-500 text-white border-emerald-400";
          }

          return (
            <button
              key={`${mcq.id}-opt-${index}`}
              id={`mcq-${mcq.id}-option-${labels[index].toLowerCase()}`}
              onClick={() => onSelectAnswer(option)}
              className={`flex items-center gap-3.5 p-4 rounded-xl border text-left text-sm transition-all duration-200 group/opt ${optionStyle}`}
            >
              <span className={`flex items-center justify-center w-6 h-6 rounded-md border text-xs font-bold leading-none shrink-0 font-mono transition-colors duration-200 ${labelStyle}`}>
                {labels[index]}
              </span>
              <span className="flex-1 leading-relaxed">{option}</span>
              
              {/* Optional small indicator check or bullet if answered */}
              {isAnswered && isCorrectOption && (
                <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                  <Check size={11} className="stroke-[3.5]" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
