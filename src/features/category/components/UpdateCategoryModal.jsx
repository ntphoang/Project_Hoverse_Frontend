import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import updateCategorySchema from "../schemas/updateCategorySchema";
import useUpdateCategory from "../hooks/useUpdateCategory";
import { X, Loader2 } from "lucide-react";

const UpdateCategoryModal = ({ onClose, category }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: category,
  });

  const { mutate: updateCategory, isPending } = useUpdateCategory();

  const onSubmit = (data) => {
    updateCategory({ categoryId: category.id, formData: data });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl p-6 shadow-xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header Modal */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-heading font-bold text-slate-900">
            Chỉnh sửa danh mục
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Tên danh mục
            </label>
            <input
              {...register("name")}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-all text-sm"
              type="text"
              placeholder="Ví dụ: Quán cà phê..."
            />
            {errors.name && (
              <p className="text-danger text-xs mt-1.5 font-medium">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Slug (Đường dẫn)
            </label>
            <input
              {...register("slug")}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-all text-sm"
              type="text"
              placeholder="Ví dụ: quan-ca-phe"
            />
            {errors.slug && (
              <p className="text-danger text-xs mt-1.5 font-medium">
                {errors.slug.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Tên Icon (Lucide React)
            </label>
            <input
              {...register("iconName")}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-all text-sm"
              type="text"
              placeholder="Ví dụ: Coffee"
            />
            {errors.iconName && (
              <p className="text-danger text-xs mt-1.5 font-medium">
                {errors.iconName.message}
              </p>
            )}
          </div>

          {/* Footer Modal */}
          <div className="flex items-center justify-end gap-3 mt-8 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-full transition-colors disabled:opacity-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center justify-center min-w-[120px] bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 rounded-full transition-colors disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Đang lưu...
                </>
              ) : (
                "Cập nhật"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategoryModal;
