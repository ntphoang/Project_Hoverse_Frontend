import React, { useState } from "react";
import { X, Star, Loader2 } from "lucide-react";

const AddReviewModal = ({ onClose, onSubmit, isSubmitting }) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [hover, setHover] = useState(0);
  const [error, setError] = useState(null);

  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);

    setFiles((prev) => [...prev, ...newFiles]);

    const newUrls = newFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newUrls]);
  };

  const handleRemoveFile = (indexToRemove) => {
    URL.revokeObjectURL(previewUrls[indexToRemove]);

    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
    setPreviewUrls((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleClose = () => {
    previewUrls.forEach((url) => URL.revokeObjectURL(url));
    onClose();
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      setError("Vui lòng chọn số sao!");
      return;
    }
    if (content.trim() === "") {
      setError("Vui lòng viết một chút đánh giá!");
      return;
    }
    await onSubmit({ rating, content, files });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm transition-all"
      onClick={handleClose}
    >
      <div 
        className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl flex flex-col max-h-[95vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 shrink-0">
          <h2 className="text-xl font-bold font-heading text-slate-900 tracking-tight">
            Viết đánh giá của cậu
          </h2>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex flex-col gap-6">
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => {
              const isActive = (hover || rating) >= star;
              return (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  disabled={isSubmitting}
                  className="transition-transform duration-200 hover:scale-110 active:scale-95 focus-visible:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <Star 
                    size={40} 
                    strokeWidth={1.5}
                    className={`transition-colors duration-200 ${
                      isActive 
                        ? "text-warning fill-warning" 
                        : "text-slate-300 fill-slate-50"
                    }`} 
                  />
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-2">
            <textarea
              className={`w-full p-5 bg-slate-50 border rounded-[1.5rem] text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 transition-all resize-none min-h-[140px] ${
                error ? "border-danger focus:border-danger" : "border-slate-200 focus:border-slate-300"
              }`}
              placeholder="Cậu thấy quán này thế nào? Không gian, đồ uống, thái độ nhân viên..."
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                if (error) setError(null);
              }}
              disabled={isSubmitting}
            />
            {error && (
              <span className="text-sm font-medium text-danger ml-2 animate-in fade-in slide-in-from-top-1 duration-200">
                {error}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              disabled={isSubmitting}
              className="block w-full text-sm text-slate-500 
                file:mr-4 file:py-2.5 file:px-5 
                file:rounded-full file:border-0 
                file:text-sm file:font-semibold 
                file:bg-slate-900 file:text-white 
                hover:file:bg-slate-800 
                focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/50 
                transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            />

            {previewUrls.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-2">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative aspect-square rounded-2xl overflow-hidden group border border-slate-200 bg-slate-100">
                    <img
                      src={url}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      title="Xóa ảnh này"
                      disabled={isSubmitting}
                      className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-600 hover:text-danger hover:bg-white shadow-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all disabled:opacity-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger"
                    >
                      <X size={14} strokeWidth={3} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="px-6 py-5 border-t border-slate-100 bg-white shrink-0 flex flex-col-reverse sm:flex-row justify-end gap-3 rounded-b-[2rem]">
          <button
            className="w-full sm:w-auto px-6 py-3 rounded-full text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 disabled:opacity-70 disabled:cursor-not-allowed"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Hủy bỏ
          </button>
          <button
            className="w-full sm:w-auto px-8 py-3 rounded-full text-sm font-semibold text-white bg-black hover:bg-slate-800 shadow-sm transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Đang gửi...
              </>
            ) : (
              "Gửi đánh giá"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddReviewModal;