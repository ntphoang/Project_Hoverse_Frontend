import { Check, Edit3, HelpCircle, X, Tag as TagIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import updateTagSchema from "../schemas/updateTagSchema";
import useUpdateTag from "../hooks/useUpdateTag";
import { zodResolver } from "@hookform/resolvers/zod";
import useChangeTagStatus from "../hooks/useChangeTagStatus";

const AdminTagItem = ({ tag, isActive }) => {
  const TagDynamicIcon = LucideIcons[tag.iconName] || HelpCircle;
  const [isEditing, setIsEditing] = useState(false);
  const { mutate: updateTag, isPending } = useUpdateTag();
  const { mutate: changeTagStatus } = useChangeTagStatus();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(updateTagSchema),
    defaultValues: tag,
  });

  const badgeUI =
    isActive == "true"
      ? { text: "Hoạt động", style: "text-success bg-success/10" }
      : { text: "Ngừng hoạt động", style: "text-slate-500 bg-slate-100" };

  const actionUI =
    isActive == "true"
      ? {
          label: "Vô hiệu hóa",
          icon: X,
          style:
            "bg-danger border border-slate-200 text-white hover:bg-slate-50 hover:text-danger focus-visible:ring-slate-200",
        }
      : {
          label: "Kích hoạt",
          icon: Check,
          style:
            "bg-success text-white hover:bg-slate-800 focus-visible:ring-slate-900",
        };

  const onSubmit = (data) => {
    updateTag(
      { tagId: tag.id, formData: data },
      { onSuccess: () => setIsEditing(false) },
    );
  };

  return (
    <>
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-3 md:p-4 bg-white border border-slate-100 rounded-xl hover:border-slate-300 hover:shadow-sm transition-all duration-200">
            <div className="flex items-center gap-3.5 flex-1 min-w-0">
              {/* Khối Icon mini */}
              <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-slate-50 rounded-lg border border-slate-200 shrink-0 transition-colors hover:bg-slate-100">
                <TagDynamicIcon
                  className="w-5 h-5 md:w-6 md:h-6 text-slate-600"
                  strokeWidth={1.5}
                />
              </div>

              {/* Thông tin Tag */}
              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    className="font-heading font-bold text-slate-900 text-sm md:text-base truncate"
                    placeholder="Vui lòng nhập tên cho tag"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-danger">{errors.name.message}</p>
                  )}
                </div>

                {/* Thông tin phụ trợ */}
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <TagIcon className="w-3 h-3 shrink-0" />
                  <input className="truncate" {...register("iconName")} />
                  {errors.iconName && (
                    <p className="text-danger">{errors.iconName.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* CỘT PHẢI: Các nút hành động */}
            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto pt-3 sm:pt-0 border-t border-slate-100 sm:border-0">
              {/* Nút Sửa */}
              {isActive == "true" && (
                <button
                  onClick={() => {
                    setIsEditing(false);
                    reset();
                  }}
                  type="button"
                  className="flex items-center justify-center gap-1.5 flex-1 sm:flex-none px-3 py-1.5 text-xs md:text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Hủy</span>
                </button>
              )}

              {/* Nút Đổi trạng thái */}
              <button
                type="submit"
                disabled={isPending}
                className={`bg-success flex items-center justify-center gap-1.5 flex-1 sm:flex-none px-3 py-1.5 text-xs md:text-sm font-semibold rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ${actionUI.style}`}
              >
                <actionUI.icon className="w-3.5 h-3.5" />
                <span>Lưu</span>
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-3 md:p-4 bg-white border border-slate-100 rounded-xl hover:border-slate-300 hover:shadow-sm transition-all duration-200">
          <div className="flex items-center gap-3.5 flex-1 min-w-0">
            {/* Khối Icon mini */}
            <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-slate-50 rounded-lg border border-slate-200 shrink-0 transition-colors hover:bg-slate-100">
              <TagDynamicIcon
                className="w-5 h-5 md:w-6 md:h-6 text-slate-600"
                strokeWidth={1.5}
              />
            </div>

            {/* Thông tin Tag */}
            <div className="flex flex-col gap-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-slate-900 text-sm md:text-base truncate">
                  {tag.name}
                </h3>
                <span
                  className={`px-2 py-0.5 text-[10px] font-bold rounded-md uppercase tracking-wider shrink-0 ${badgeUI.style}`}
                >
                  {badgeUI.text}
                </span>
              </div>

              {/* Thông tin phụ trợ */}
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <TagIcon className="w-3 h-3 shrink-0" />
                <span className="truncate">
                  {tag.iconName || "Chưa có icon"}
                </span>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: Các nút hành động */}
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto pt-3 sm:pt-0 border-t border-slate-100 sm:border-0">
            {/* Nút Sửa */}
            {isActive == "true" && (
              <button
                onClick={() => setIsEditing(true)}
                type="button"
                className="flex items-center justify-center gap-1.5 flex-1 sm:flex-none px-3 py-1.5 text-xs md:text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Sửa</span>
              </button>
            )}

            {/* Nút Đổi trạng thái */}
            <button
              type="button"
              onClick={() => changeTagStatus({ tagId: tag.id })}
              className={`flex items-center justify-center gap-1.5 flex-1 sm:flex-none px-3 py-1.5 text-xs md:text-sm font-semibold rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ${actionUI.style}`}
            >
              <actionUI.icon className="w-3.5 h-3.5" />
              <span>{actionUI.label}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminTagItem;
