import {
  Check,
  Edit3,
  Loader2,
  X,
  HelpCircle,
  Link as LinkIcon,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import useChangeCategoryStatus from "../hooks/useChangeCategoryStatus";
import { useState } from "react";
import UpdateCategoryModal from "./UpdateCategoryModal";

const AdminCategoryItem = ({ category, isActive }) => {
  const { mutate: changeCategoryStatus, isPending } = useChangeCategoryStatus();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  // Kỹ thuật Render Component Động
  const CategoryIcon = LucideIcons[category.iconName] || HelpCircle;

  const getStatusBadge = (status) => {
    switch (status) {
      case "true":
        return (
          <span className="px-2.5 py-1 text-[11px] font-bold text-success bg-success/10 rounded-full uppercase tracking-wider">
            Đang hoạt động
          </span>
        );
      case "false":
        return (
          <span className="px-2.5 py-1 text-[11px] font-bold text-danger bg-danger/10 rounded-full uppercase tracking-wider">
            Ngừng hoạt động
          </span>
        );
    }
  };

  const getActionConfig = (status) => {
    switch (status) {
      case "true":
        return {
          label: "Kích hoạt",
          icon: Check,
          style:
            "bg-success hover:bg-emerald-600 text-white focus-visible:ring-success",
        };
      case "false":
        return {
          label: "Vô hiệu hóa",
          icon: X,
          style:
            "bg-danger hover:bg-red-600 text-white focus-visible:ring-danger",
        };
    }
  };

  const buttonStatus = isActive == "true" ? "false" : "true";
  const config = getActionConfig(buttonStatus);
  const Icon = config.icon;

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 p-4 md:p-5 bg-white border border-slate-100 rounded-xl hover:border-slate-300 hover:shadow-md transition-all duration-200">
      {/* CỘT TRÁI: Hình ảnh & Thông tin */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-start flex-1 min-w-0">
        {/* Khối hiển thị Icon Động */}
        <div className="relative shrink-0 flex items-center justify-center w-full sm:w-24 h-32 sm:h-24 bg-slate-50 rounded-xl border border-slate-200 transition-colors hover:bg-slate-100">
          <CategoryIcon
            className="w-10 h-10 text-slate-600"
            strokeWidth={1.5}
          />

          {/* Badge (Mobile) */}
          <div className="absolute top-2 left-2 sm:hidden">
            {getStatusBadge(category.isActive)}
          </div>
        </div>

        {/* Cụm thông tin chi tiết */}
        <div className="flex flex-col gap-1.5 flex-1 min-w-0 mt-1">
          {/* Tiêu đề & ID */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center justify-center px-1.5 py-0.5 bg-slate-50 text-slate-500 font-bold text-xs rounded border border-slate-200 shrink-0">
              #{category.id}
            </span>
            <h3 className="font-heading font-bold text-slate-900 text-base md:text-lg truncate">
              {category.name}
            </h3>
            <span className="hidden lg:inline-block px-2 py-0.5 ml-2 bg-slate-100 text-slate-500 text-[10px] font-mono rounded-md border border-slate-200">
              {category.iconName || "No-Icon"}
            </span>
          </div>

          {/* Địa chỉ Slug */}
          <div className="flex items-center gap-1.5 text-sm text-slate-600">
            <LinkIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="line-clamp-1 font-medium text-slate-700">
              {category.slug || "Chưa cập nhật slug"}
            </span>
          </div>

          {/* Badge */}
          <div className="flex items-center gap-4 mt-1 sm:mt-2">
            <div className="hidden sm:block">
              {getStatusBadge(category.isActive)}
            </div>
          </div>
        </div>
      </div>

      {/* CỘT PHẢI: Các nút hành động */}
      <div className="flex items-center gap-2 sm:items-start shrink-0 pt-3 border-t border-slate-100 sm:border-0 sm:pt-0">
        {isActive == "true" && (
          <div>
            <button
              type="button"
              onClick={() => setIsUpdateModalOpen(true)}
              className="flex items-center gap-1.5 px-3 md:px-4 py-2 text-xs md:text-sm font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Chỉnh sửa
            </button>
          </div>
        )}
        <div>
          <button
            type="button"
            disabled={isPending}
            onClick={() => {
              changeCategoryStatus(category.id);
            }}
            className={`
              flex items-center gap-1.5 px-3 md:px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
              ${config.style}
            `}
          >
            {isPending && buttonStatus !== "REJECTED" ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Icon className="w-3.5 h-3.5" />
            )}
            <span className="hidden lg:inline">{config.label}</span>
          </button>
        </div>
      </div>

      {/* UPDATE MODAL */}
      {isUpdateModalOpen && (
        <UpdateCategoryModal
          onClose={() => setIsUpdateModalOpen(false)}
          category={category}
        />
      )}
    </div>
  );
};

export default AdminCategoryItem;
