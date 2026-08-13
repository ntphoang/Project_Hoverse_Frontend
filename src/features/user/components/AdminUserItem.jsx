import { useState } from "react";
import {
  Loader2,
  MapPin,
  CalendarDays,
  LockKeyholeIcon,
  UnlockKeyhole,
  MailIcon,
} from "lucide-react";
import ReasonModal from "@/components/ui/ReasonModal";
import useChangeUserStatus from "../hooks/useChangeUserStatus";

const IMAGE_DEFAULT =
  "https://res.cloudinary.com/ty4mmnvd/image/upload/v1785929829/avatar-default_ziyif2.svg";

const AdminUserItem = ({ user, tab }) => {
  const { mutate: changeUserStatus, isPending } = useChangeUserStatus();

  const [isReasonModalOpen, setIsReasonModalOpen] = useState(false);
  const [reason, setReason] = useState("");

  const statusList = ["ACTIVE", "BANNED"];
  const buttonList = statusList.filter(
    (status) => status !== tab.toUpperCase(),
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case "BANNED":
        return (
          <span className="px-2.5 py-1 text-[11px] font-bold text-danger bg-danger/10 rounded-full uppercase tracking-wider">
            Đã khóa
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 text-[11px] font-bold text-success bg-success/10 rounded-full uppercase tracking-wider">
            Đang hoạt động
          </span>
        );
    }
  };

  const getActionConfig = (status) => {
    switch (status) {
      case "BANNED":
        return {
          label: "Khóa",
          icon: LockKeyholeIcon,
          style:
            "bg-danger hover:bg-red-600 text-white focus-visible:ring-danger",
        };
      default:
        return {
          label: "Mở khóa",
          icon: UnlockKeyhole,
          style:
            "bg-success hover:bg-emerald-600 text-white focus-visible:ring-success",
        };
    }
  };

  // Format ngày tháng
  const formattedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "Chưa cập nhật";

  const handleConfirmReason = () => {
    changeUserStatus(
      {
        userId: user.id,
        formData: { status: "BANNED", reason: reason },
      },
      { onSuccess: () => setIsReasonModalOpen(false) },
    );
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 p-4 md:p-5 bg-white border border-slate-100 rounded-xl hover:border-slate-300 hover:shadow-md transition-all duration-200">
      {/* CỘT TRÁI: Hình ảnh & Thông tin */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-start flex-1 min-w-0">
        {/* Ảnh Avatar */}
        <div className="relative shrink-0 w-full sm:w-20 h-40 sm:h-20 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
          <img
            src={user.avatarUrl || IMAGE_DEFAULT}
            alt={user.fullName}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          {/* Badge trạng thái */}
          <div className="absolute top-2 left-2 sm:hidden">
            {getStatusBadge(user.status)}
          </div>
        </div>

        {/* Cụm thông tin chi tiết */}
        <div className="flex flex-col gap-1.5 flex-1 min-w-0 mt-1">
          {/* Tiêu đề & ID */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center justify-center px-1.5 py-0.5 bg-slate-50 text-slate-500 font-bold text-xs rounded border border-slate-200 shrink-0">
              #{user.id}
            </span>
            <h3 className="font-heading font-bold text-slate-900 text-base md:text-lg truncate">
              {user.fullName}
            </h3>
          </div>

          {/* Địa chỉ email */}
          <div className="flex items-start gap-1.5 text-sm text-slate-600">
            <MailIcon className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <span className="line-clamp-1">
              {user.email || "Chưa cập nhật email"}
            </span>
          </div>

          {/* Dòng dưới cùng: Ngày tạo & Badge */}
          <div className="flex items-center gap-4 mt-1 sm:mt-2">
            <div className="hidden sm:block">{getStatusBadge(user.status)}</div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Tạo ngày {formattedDate}</span>
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
                  if (status === "BANNED") {
                    setIsReasonModalOpen(true);
                  } else {
                    changeUserStatus({
                      userId: user.id,
                      formData: { status },
                    });
                  }
                }}
                className={`
                  flex items-center gap-1.5 px-3 md:px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
                  ${config.style}
                `}
              >
                {isPending && status !== "BANNED" ? (
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

      {/* REASON MODAL */}
      {isReasonModalOpen && (
        <ReasonModal
          isPending={isPending}
          setIsReasonModalOpen={setIsReasonModalOpen}
          setReason={setReason}
          handleConfirmReason={handleConfirmReason}
          reason={reason}
          title={{
            supTitle: "Khóa tài khoản người dùng",
            subTitle: "Vui lòng nhập lý do khóa tài khoản người dùng này!",
            placeholder: "Ví dụ: Vi phạm tiêu chuẩn cộng đồng...",
          }}
        />
      )}
    </div>
  );
};

export default AdminUserItem;
