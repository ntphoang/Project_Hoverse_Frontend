import { Loader2 } from "lucide-react";

const ConfirmDialog = ({
  isOpen,
  title,
  description,
  confirmText = "Xác nhận",
  cancelText = "Hủy",
  loading = false,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Lớp phủ (Backdrop) làm mờ nền */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onCancel}
      />

      {/* Nội dung Modal */}
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 md:p-8 shadow-xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        <h2 className="text-xl font-heading font-bold text-slate-900 tracking-tight">
          {title}
        </h2>

        <p className="mt-2.5 text-sm md:text-base text-slate-500 leading-relaxed">
          {description}
        </p>

        {/* Khu vực nút bấm */}
        <div className="mt-8 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-5 py-2.5 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:opacity-50"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="inline-flex items-center justify-center min-w-[120px] px-5 py-2.5 text-sm font-semibold bg-danger text-white rounded-full hover:bg-red-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger focus-visible:ring-offset-2 disabled:opacity-70"
          >
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {loading ? "Đang xử lý..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
