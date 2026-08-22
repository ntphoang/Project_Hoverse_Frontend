import { Loader2 } from "lucide-react";

const ReasonModal = ({
  isPending,
  setIsReasonModalOpen,
  setReason,
  handleConfirmReason,
  reason,
  title,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={() => !isPending && setIsReasonModalOpen(false)}
      />

      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl p-6 shadow-xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        <h3 className="text-lg font-heading font-bold text-slate-900">
          {title.supTitle}
        </h3>
        <p className="text-sm text-slate-500 mt-1 mb-4">
          {/* Vui lòng cung cấp lý do từ chối để người dùng có thể chỉnh sửa lại. */}
          {title.subTitle}
        </p>

        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          disabled={isPending}
          placeholder={title.placeholder}
          className="w-full p-3 h-28 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-danger focus:ring-1 focus:ring-danger outline-none resize-none transition-all"
        />

        <div className="flex items-center justify-end gap-3 mt-5">
          <button
            type="button"
            onClick={() => setIsReasonModalOpen(false)}
            disabled={isPending}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-full transition-colors disabled:opacity-50"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleConfirmReason}
            disabled={isPending || !reason.trim()}
            className="inline-flex items-center px-5 py-2 text-sm font-semibold bg-danger text-white rounded-full hover:bg-red-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger focus-visible:ring-offset-2 disabled:opacity-50"
          >
            {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {isPending ? "Đang xử lý..." : "Xác nhận"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReasonModal;
