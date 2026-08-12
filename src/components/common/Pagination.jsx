import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-slate-100">
      {/* Nút Prev */}
      <button
        type="button"
        disabled={currentPage <= 0}
        onClick={() => onPageChange(currentPage - 1)}
        className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Hiển thị số trang hiện tại / tổng số trang */}
      <span className="text-sm font-semibold text-slate-700 px-4">
        Trang {currentPage + 1} / {totalPages}
      </span>

      {/* Nút Next */}
      <button
        type="button"
        disabled={currentPage >= totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
        className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;