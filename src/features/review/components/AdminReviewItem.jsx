import { useState } from "react";
import useChangeReviewStatus from "../hooks/useChangeReviewStatus";
import ReasonModal from "@/components/ui/ReasonModal";
import { toast } from "react-toastify";
import {
  Star,
  ThumbsUp,
  EyeOff,
  CheckCircle,
  MapPin,
  AlertCircle,
} from "lucide-react";

const DEFAULT_AVATAR =
  "https://res.cloudinary.com/ty4mmnvd/image/upload/v1785929829/avatar-default_ziyif2.svg";

const AdminReviewItem = ({ review }) => {
  const { mutate: changeReviewStatus, isPending } = useChangeReviewStatus();
  const [isReasonModalOpen, setIsReasonModalOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(null);

  const statusConfig = {
    VISIBLE: {
      badge: {
        text: "Đang hiển thị",
        style: "bg-success/10 text-success border-success/20",
      },
      actions: [
        {
          key: "HIDDEN",
          label: "Ẩn Review",
          icon: EyeOff,
          style:
            "text-danger bg-accent-50 border-accent-100 hover:bg-accent-100 hover:text-accent-600 focus-visible:ring-danger",
        },
      ],
    },
    REPORTED: {
      badge: {
        text: "Bị báo cáo",
        style: "bg-warning/10 text-warning border-warning/20",
      },
      actions: [
        {
          key: "VISIBLE",
          label: "Hợp lệ (Giữ)",
          icon: CheckCircle,
          style:
            "text-success bg-success/10 border-success/20 hover:bg-success/20 focus-visible:ring-success",
        },
        {
          key: "HIDDEN",
          label: "Vi phạm (Ẩn)",
          icon: EyeOff,
          style:
            "text-danger bg-accent-50 border-accent-100 hover:bg-accent-100 hover:text-accent-600 focus-visible:ring-danger",
        },
      ],
    },
    HIDDEN: {
      badge: {
        text: "Đã bị ẩn",
        style: "bg-slate-100 text-slate-500 border-slate-200",
      },
      actions: [
        {
          key: "VISIBLE",
          label: "Khôi phục",
          icon: CheckCircle,
          style:
            "text-primary-600 bg-primary-50 border-primary-100 hover:bg-primary-100 focus-visible:ring-primary-500",
        },
      ],
    },
  };

  const currentConfig = statusConfig[review.status] || statusConfig.VISIBLE;
  const formattedDate = new Date(review.createdAt).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleChangeStatus = (stat) => {
    setReason("");
    setSelectedStatus(stat);
    setIsReasonModalOpen(true);
  };

  const handleConfirmReason = () => {
    const requestData = {
      reviewId: review.id,
      formData: { reason, status: selectedStatus },
    };
    changeReviewStatus(requestData, {
      onSuccess: () => toast.success("Cập nhật trạng thái review thành công!"),
      onError: () => toast.error("Cập nhật trạng thái review thất bại!"),
    });
  };

  return (
    <article className="w-full bg-white p-5 md:p-6 rounded-card border border-slate-200 shadow-card transition-all duration-300 hover:shadow-hover flex flex-col gap-4">
      {/* 1. ADMIN TOOLBAR */}
      <div className="flex flex-wrap justify-between items-center gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Trạng thái:</span>
          <span
            className={`px-2.5 py-1 rounded-badge border text-[11px] font-bold uppercase tracking-wider ${currentConfig.badge.style}`}
          >
            {currentConfig.badge.text}
          </span>
        </div>

        {/* Nút Action  */}
        <div className="flex items-center gap-2">
          {currentConfig.actions.map((action) => (
            <button
              key={action.key}
              type="button"
              onClick={() => handleChangeStatus(action.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border rounded-btn transition-colors focus-visible:outline-none focus-visible:ring-2 ${action.style}`}
            >
              <action.icon className="w-3.5 h-3.5" />
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. THÔNG TIN AUTHOR & ĐỊA ĐIỂM */}
      <div className="flex justify-between items-start gap-4">
        <div className="flex items-center gap-3">
          <img
            src={review.avatarUrl || DEFAULT_AVATAR}
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover border border-slate-100 shrink-0"
          />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900 line-clamp-1">
              {review.authorFullname}{" "}
              <span className="text-slate-400 font-medium">
                @{review.username}
              </span>
            </span>
            <span className="text-xs text-slate-500 mt-0.5">
              {formattedDate}
            </span>
          </div>
        </div>

        {/* Khối Đánh giá */}
        <div className="flex items-center gap-0.5 shrink-0 bg-slate-50 px-2 py-1 rounded-btn border border-slate-100">
          {[...Array(5)].map((_, idx) => (
            <Star
              key={idx}
              className={`w-3.5 h-3.5 ${idx < review.rating ? "fill-warning text-warning" : "fill-slate-200 text-slate-200"}`}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-xs font-semibold text-primary-600 bg-primary-50 border border-primary-100 w-fit px-2.5 py-1.5 rounded-btn">
        <MapPin className="w-3.5 h-3.5" />
        <span className="line-clamp-1">Đánh giá tại: {review.placeTitle}</span>
      </div>

      {/* 3. NỘI DUNG REVIEW & HÌNH ẢNH */}
      <div className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
        <p className="whitespace-pre-line">{review.content}</p>

        {review.reviewMediaList?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-200/60">
            {review.reviewMediaList.map((media) => (
              <img
                key={media.id}
                src={media.url}
                alt="review-media"
                className="w-16 h-16 object-cover rounded-lg border border-slate-200 cursor-zoom-in hover:opacity-90 transition-opacity"
              />
            ))}
          </div>
        )}
      </div>

      {/* 4. META & LÝ DO */}
      <div className="flex flex-col gap-3 mt-auto">
        {review.reason && (
          <div className="flex items-start gap-2 text-xs text-danger bg-accent-50 p-3 rounded-xl border border-accent-100">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold uppercase tracking-wide block mb-0.5">
                Lý do hệ thống / Admin can thiệp:
              </span>
              <span className="font-medium text-slate-700">
                {review.reason}
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
          <ThumbsUp className="w-4 h-4" />
          <span>{review.likeCount || 0} người dùng cảm thấy hữu ích</span>
        </div>
      </div>

      {/* MODAL LÝ DO */}
      {isReasonModalOpen && (
        <ReasonModal
          isPending={isPending}
          setIsReasonModalOpen={setIsReasonModalOpen}
          setReason={setReason}
          handleConfirmReason={handleConfirmReason}
          reason={reason}
          title={{
            supTitle: "Xác nhận thao tác",
            subTitle: `Vui lòng cung cấp lý do bạn muốn chuyển sang trạng thái "${currentConfig.actions.find((a) => a.key === selectedStatus)?.label}"`,
          }}
        />
      )}
    </article>
  );
};

export default AdminReviewItem;
