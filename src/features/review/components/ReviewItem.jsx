import React, { useState } from "react";
import ReviewDisplay from "./ReviewDisplay";
import ReviewEditor from "./ReviewEditor";
import { useAuthStore } from "@/store";
import { Edit3, Trash2 } from "lucide-react";
import useDeleteReview from "../hooks/useDeleteReview";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { toast } from "react-toastify";

const ReviewItem = ({ review }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { deleteReview, isDeleting } = useDeleteReview();

  const user = useAuthStore((state) => state.user);
  const isAuthor = review.authorId === user?.id;

  const handleDeleteReview = async () => {
    try {
      await deleteReview(review.id);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Có lõi xảy ra khi xóa đánh giá!",
      );
    }
  };

  return (
    <article className="w-full bg-white p-5 md:p-6 rounded-2xl border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md">
      {/* Action Toolbar dành riêng cho tác giả */}
      {isAuthor && !isEditing && (
        <div className="flex justify-end mb-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-full hover:bg-slate-100 hover:text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Chỉnh sửa
            </button>
            <button
              type="button"
              onClick={() => setIsDeleteDialogOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-danger bg-accent-50 border border-accent-100 rounded-full hover:bg-accent-100 hover:text-accent-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Xóa
            </button>
          </div>
        </div>
      )}

      {isEditing ? (
        <ReviewEditor review={review} onClose={() => setIsEditing(false)} />
      ) : (
        <ReviewDisplay review={review} />
      )}

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="Xóa đánh giá"
        description="Bạn có chắc muốn xóa đánh giá này? Hành động này không thể hoàn tác."
        confirmText="Xóa"
        cancelText="Hủy"
        loading={isDeleting}
        onConfirm={handleDeleteReview}
        onCancel={() => setIsDeleteDialogOpen(false)}
      ></ConfirmDialog>
    </article>
  );
};

export default ReviewItem;
