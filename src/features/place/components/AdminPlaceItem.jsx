import { useState } from "react";
import useChangePlaceStatus from "../hooks/useChangePlaceStatus";
import {
  Check,
  X,
  RotateCcw,
  Loader2,
  MapPin,
  CalendarDays,
} from "lucide-react";
import ReasonModal from "@/components/ui/ReasonModal";

const IMAGE_DEFAULT =
  "https://res.cloudinary.com/ty4mmnvd/image/upload/v1786459968/default_x7xwbw.jpg";

const AdminPlaceItem = ({ place, tab }) => {
  const { mutate: changePlaceStatus, isPending } = useChangePlaceStatus();

  const [isReasonModalOpen, setIsReasonModalOpen] = useState(false);
  const [reason, setReason] = useState("");

  const statusList = ["PENDING", "APPROVED", "REJECTED"];
  const buttonList = statusList.filter(
    (status) => status !== tab.toUpperCase(),
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case "APPROVED":
        return (
          <span className="px-2.5 py-1 text-[11px] font-bold text-success bg-success/10 rounded-full uppercase tracking-wider">
            Đã duyệt
          </span>
        );
      case "REJECTED":
        return (
          <span className="px-2.5 py-1 text-[11px] font-bold text-danger bg-danger/10 rounded-full uppercase tracking-wider">
            Từ chối
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 text-[11px] font-bold text-warning bg-warning/10 rounded-full uppercase tracking-wider">
            Chờ duyệt
          </span>
        );
    }
  };

  const getActionConfig = (status) => {
    switch (status) {
      case "APPROVED":
        return {
          label: "Duyệt",
          icon: Check,
          style:
            "bg-success hover:bg-emerald-600 text-white focus-visible:ring-success",
        };
      case "REJECTED":
        return {
          label: "Từ chối",
          icon: X,
          style:
            "bg-danger hover:bg-red-600 text-white focus-visible:ring-danger",
        };
      default:
        return {
          label: "Đưa về chờ",
          icon: RotateCcw,
          style:
            "bg-warning hover:bg-amber-600 text-white focus-visible:ring-warning",
        };
    }
  };

  // Format ngày tháng
  const formattedDate = place.createdAt
    ? new Date(place.createdAt).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "Chưa cập nhật";

  const handleConfirmReason = () => {
    changePlaceStatus(
      {
        placeId: place.id,
        formData: { status: "REJECTED", rejectReason: reason },
      },
      { onSuccess: () => setIsReasonModalOpen(false) },
    );
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 p-4 md:p-5 bg-white border border-slate-100 rounded-xl hover:border-slate-300 hover:shadow-md transition-all duration-200">
      {/* CỘT TRÁI: Hình ảnh & Thông tin */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-start flex-1 min-w-0">
        {/* Ảnh Cover (Thumbnail) */}
        <div className="relative shrink-0 w-full sm:w-28 h-40 sm:h-24 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
          <img
            src={place.coverImageUrl || IMAGE_DEFAULT}
            alt={place.title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          {/* Badge trạng thái */}
          <div className="absolute top-2 left-2 sm:hidden">
            {getStatusBadge(place.status)}
          </div>
        </div>

        {/* Cụm thông tin chi tiết */}
        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
          {/* Tiêu đề & ID */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center justify-center px-1.5 py-0.5 bg-slate-50 text-slate-500 font-bold text-xs rounded border border-slate-200 shrink-0">
              #{place.id}
            </span>
            <h3 className="font-heading font-bold text-slate-900 text-base md:text-lg truncate">
              {place.title}
            </h3>
          </div>

          {/* Địa chỉ */}
          <div className="flex items-start gap-1.5 text-sm text-slate-600">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <span className="line-clamp-1">
              {place.address || "Chưa cập nhật địa chỉ"}
            </span>
          </div>

          {/* Dòng dưới cùng: Ngày tạo & Badge */}
          <div className="flex items-center gap-4 mt-1 sm:mt-2">
            <div className="hidden sm:block">
              {getStatusBadge(place.status)}
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Đề xuất ngày {formattedDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* CỘT PHẢI: Các nút hành động */}
      <div className="flex items-center gap-2 sm:items-start shrink-0 pt-3 border-t border-slate-100 sm:border-0 sm:pt-0">
        {buttonList.map((status) => {
          const config = getActionConfig(status);
          const Icon = config.icon;

          return (
            <div key={status}>
              <button
                type="button"
                disabled={isPending}
                onClick={() => {
                  if (status === "REJECTED") {
                    setIsReasonModalOpen(true);
                  } else {
                    changePlaceStatus({
                      placeId: place.id,
                      formData: { status },
                    });
                  }
                }}
                className={`
                    flex items-center gap-1.5 px-3 md:px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
                    ${config.style}
                  `}
              >
                {isPending && status !== "REJECTED" ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Icon className="w-3.5 h-3.5" />
                )}
                <span className="hidden lg:inline">{config.label}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* REJECT MODAL */}
      {isReasonModalOpen && (
        <ReasonModal
          isPending={isPending}
          setIsReasonModalOpen={setIsReasonModalOpen}
          setReason={setReason}
          handleConfirmReason={handleConfirmReason}
          reason={reason}
          title={{
            supTitle: "Từ chối địa điểm",
            subTitle: "Vui lòng nhập lý từ chối địa điểm này!",
            placeholder: "Ví dụ: Địa điểm chưa có ảnh cụ thể...",
          }}
        ></ReasonModal>
      )}
    </div>
  );
};

export default AdminPlaceItem;
