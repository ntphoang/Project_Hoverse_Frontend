import { useEffect, useRef, useState } from "react";
import useUpdateReview from "../hooks/useUpdateReview";
import { toast } from "react-toastify";
import StarRating from "./StarRating";
import { X, Plus, Loader2 } from "lucide-react";

const ReviewEditor = ({ review, onClose }) => {
  const [draftReview, setDraftReview] = useState(review);
  const [newMedias, setNewMedias] = useState([]);

  const { isLoading, updateReview } = useUpdateReview();

  const handleAddFile = (e) => {
    const newFiles = Array.from(e.target.files);
    const newMediaList = newFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    e.target.value = null;

    setNewMedias((prev) => [...prev, ...newMediaList]);
  };

  const handleUpdateReview = async () => {
    const reviewId = review.id;
    try {
      const data = {
        rating: draftReview.rating,
        content: draftReview.content,
        medias: draftReview.reviewMediaList?.map((media) => media.id),
      };
      const files = newMedias.map((media) => media.file);
      await updateReview(data, files, reviewId);
      toast.success("Đã cập nhật đánh giá thành công!");
      onClose();
    } catch (error) {
      toast.error(
        "Cập nhật đánh giá thất bại: " + error.response?.data?.message,
      );
    }
  };

  const handleRemoveOldMedia = (mediaId) => {
    setDraftReview((prev) => ({
      ...prev,
      reviewMediaList: prev.reviewMediaList.filter(
        (media) => media.id != mediaId,
      ),
    }));
  };

  const handleRemoveNewMedia = (url) => {
    setNewMedias((prev) => prev.filter((media) => media.url != url));
    URL.revokeObjectURL(url);
  };

  const newMediaRef = useRef();
  useEffect(() => {
    newMediaRef.current = newMedias;
  }, [newMedias]);

  useEffect(() => {
    return () =>
      newMediaRef.current?.forEach((media) => URL.revokeObjectURL(media.url));
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {/* Tầng 1: Header (User Info + Actions + Rating) */}
      <div className="flex items-start justify-between gap-4">
        {/* User Info */}
        <div className="flex items-center gap-3 md:gap-4">
          <img
            src={review.avatarUrl}
            alt={`Avatar của ${review.username}`}
            loading="lazy"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border border-slate-100 shrink-0 bg-slate-50"
          />
          <div className="flex flex-col">
            <h4 className="font-heading font-bold text-slate-900 text-base md:text-lg line-clamp-1">
              {review.authorFullname || review.username}
            </h4>
            <time
              dateTime={review.updatedAt}
              className="text-xs md:text-sm text-slate-500 font-medium"
            >
              {new Date(review.updatedAt).toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </time>
          </div>
        </div>

        {/* Rating Stars */}
        <div className="shrink-0 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
          <StarRating
            rating={draftReview.rating}
            onRatingChange={(star) =>
              setDraftReview((prev) => ({ ...prev, rating: star }))
            }
            isDisabled={isLoading}
          />
        </div>
      </div>

      {/* Tầng 2: Content Textarea */}
      <div className="mt-1">
        <textarea
          className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none text-sm text-slate-900 leading-relaxed resize-y min-h-[120px] transition-all placeholder:text-slate-400"
          name="content"
          placeholder="Viết đánh giá của bạn về địa điểm này..."
          value={draftReview.content}
          onChange={(e) =>
            setDraftReview((prev) => ({ ...prev, content: e.target.value }))
          }
          disabled={isLoading}
        ></textarea>
      </div>

      {/* Tầng 3: Gallery (Ảnh cũ & Ảnh mới) */}
      <div className="pt-2 border-t border-slate-100">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {/* Ảnh cũ đã upload */}
          {draftReview.reviewMediaList?.map((media) => (
            <div
              key={media.id}
              className="group relative aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200"
            >
              <img
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                src={media.url}
                alt="Old media"
              />
              <button
                type="button"
                onClick={() => handleRemoveOldMedia(media.id)}
                className="absolute top-1.5 right-1.5 p-1 bg-slate-900/70 hover:bg-danger text-white rounded-full transition-colors focus-visible:outline-none"
                aria-label="Xóa ảnh cũ"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {/* Ảnh mới vừa chọn (Preview) */}
          {newMedias?.map((media) => (
            <div
              key={media.url}
              className="group relative aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200"
            >
              <img
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                src={media.url}
                alt="New media preview"
              />

              {/* Nhãn báo ảnh mới */}
              <span className="absolute bottom-1.5 left-1.5 bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded opacity-80 pointer-events-none shadow-sm">
                Mới
              </span>

              <button
                type="button"
                onClick={() => handleRemoveNewMedia(media.url)}
                className="absolute top-1.5 right-1.5 p-1 bg-slate-900/70 hover:bg-danger text-white rounded-full transition-colors focus-visible:outline-none"
                aria-label="Xóa ảnh mới"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {/* Nút Upload Fake bằng Label */}
          <label className="flex flex-col items-center justify-center aspect-square rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-slate-400 cursor-pointer transition-colors text-slate-500 hover:text-slate-700">
            <Plus className="w-6 h-6 mb-1" />
            <span className="text-xs font-semibold">Thêm ảnh</span>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleAddFile(e)}
              disabled={isLoading}
            />
          </label>
        </div>
      </div>

      {/* Tầng 4: Actions Footer */}
      <div className="flex items-center justify-end gap-3 pt-4 mt-2 border-t border-slate-100">
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:opacity-50"
        >
          Hủy
        </button>
        <button
          type="button"
          onClick={handleUpdateReview}
          disabled={isLoading}
          className="inline-flex items-center justify-center min-w-[140px] px-5 py-2.5 text-sm font-semibold bg-slate-900 text-white rounded-full hover:bg-slate-800 disabled:bg-slate-900/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Đang lưu...
            </>
          ) : (
            "Lưu đánh giá"
          )}
        </button>
      </div>
    </div>
  );
};

export default ReviewEditor;
