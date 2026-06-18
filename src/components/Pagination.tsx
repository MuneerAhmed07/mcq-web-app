import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  accentColorClass?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  accentColorClass = "emerald",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pageNumbers: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Generate dynamic buttons based on category color
  let activeBtnStyle = "bg-emerald-600 text-white shadow-md shadow-emerald-100 hover:bg-emerald-700";
  
  if (accentColorClass === "blue") {
    activeBtnStyle = "bg-blue-600 text-white shadow-md shadow-blue-100 hover:bg-blue-700";
  } else if (accentColorClass === "amber") {
    activeBtnStyle = "bg-amber-500 text-white shadow-md shadow-amber-100 hover:bg-amber-600";
  } else if (accentColorClass === "green") {
    activeBtnStyle = "bg-green-600 text-white shadow-md shadow-green-100 hover:bg-green-700";
  } else if (accentColorClass === "indigo") {
    activeBtnStyle = "bg-indigo-600 text-white shadow-md shadow-indigo-100 hover:bg-indigo-700";
  } else if (accentColorClass === "violet") {
    activeBtnStyle = "bg-violet-600 text-white shadow-md shadow-violet-100 hover:bg-violet-700";
  }

  return (
    <nav className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6 bg-white border border-gray-100 rounded-2xl shadow-[0_4px_16px_-4px_rgba(0,0,0,0.01)] mt-8">
      {/* Mobile-friendly Previous Link */}
      <button
        id="pagination-prev"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-gray-500 bg-gray-50 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-gray-50 disabled:cursor-not-allowed border border-gray-100 rounded-xl transition-all duration-150 active:scale-95"
      >
        <ChevronLeft size={14} className="stroke-[2.5]" />
        Prev Page
      </button>

      {/* Numerical Indicators */}
      <div className="flex flex-wrap items-center gap-1.5">
        {pageNumbers.map((number) => {
          const isActive = number === currentPage;

          return (
            <button
              key={`page-btn-${number}`}
              id={`pagination-page-${number}`}
              onClick={() => onPageChange(number)}
              className={`w-9 h-9 flex items-center justify-center text-xs font-bold font-mono rounded-xl border transition-all duration-150 active:scale-90 ${
                isActive
                  ? `${activeBtnStyle} border-transparent`
                  : "bg-white border-gray-100 text-gray-500 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              {number}
            </button>
          );
        })}
      </div>

      {/* Mobile-friendly Next Link */}
      <button
        id="pagination-next"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-gray-500 bg-gray-50 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-gray-50 disabled:cursor-not-allowed border border-gray-100 rounded-xl transition-all duration-150 active:scale-95"
      >
        Next Page
        <ChevronRight size={14} className="stroke-[2.5]" />
      </button>
    </nav>
  );
}
