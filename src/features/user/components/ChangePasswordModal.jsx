import { X, Loader2 } from "lucide-react"; // Thêm Loader2 để làm icon xoay
import { useForm } from "react-hook-form";
import changePasswordSchema from "../schemas/changePasswordSchema.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import useChangePassword from "../hooks/useChangePassword";

const ChangePasswordModal = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({ resolver: zodResolver(changePasswordSchema) });

  const { isLoading, changePassword } = useChangePassword();

  const onSubmit = async (data) => {
    try {
      await changePassword(data);
    } catch (error) {
      if (error.response?.data?.code === "400")
        setError("oldPassword", {
          type: "server",
          message: error.response?.data?.message,
        });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Modal */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Đổi mật khẩu</h2>
          <button 
            onClick={onClose} 
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Body Modal (Form Fields) */}
          <div className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Mật khẩu cũ
              </label>
              <input
                type="password"
                placeholder="Nhập mật khẩu cũ"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-all text-sm"
                {...register("oldPassword")}
              />
              {errors.oldPassword && (
                <p className="text-accent-500 text-xs font-medium mt-1.5">
                  {errors.oldPassword?.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Mật khẩu mới
              </label>
              <input
                type="password"
                placeholder="Nhập mật khẩu mới"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-all text-sm"
                {...register("newPassword")}
              />
              {errors.newPassword && (
                <p className="text-accent-500 text-xs font-medium mt-1.5">
                  {errors.newPassword?.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Xác nhận mật khẩu mới
              </label>
              <input
                type="password"
                placeholder="Xác nhận mật khẩu mới"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-all text-sm"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-accent-500 text-xs font-medium mt-1.5">
                  {errors.confirmPassword?.message}
                </p>
              )}
            </div>
          </div>

          {/* Footer Modal (Buttons) */}
          <div className="flex justify-end gap-3 px-6 py-4 bg-slate-50/50 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center min-w-[120px] px-5 py-2.5 text-sm font-semibold bg-slate-900 text-white rounded-full hover:bg-slate-800 disabled:bg-slate-900/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Đang lưu...
                </>
              ) : (
                "Lưu thay đổi"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;