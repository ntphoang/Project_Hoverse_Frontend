import { useAuthStore } from "@/store";
import useUpdateUserProfile from "../hooks/useUpdateUserProfile";
import { useState } from "react";
import { Loader2, X } from "lucide-react";

const EditProfileModal = ({ onClose }) => {
  const user = useAuthStore((state) => state.user);
  const { updateUserProfile, isLoading } = useUpdateUserProfile();

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUserProfile(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header Modal */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Chỉnh sửa hồ sơ</h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Họ và tên
            </label>
            <input
              type="text"
              name="fullName"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-all"
              value={formData.fullName}
              onChange={(e) => setFormData({ fullName: e.target.value })}
              placeholder="Nhập tên hiển thị của bạn..."
            />
          </div>

          {/* Footer Modal */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center min-w-[100px] px-5 py-2.5 text-sm font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:bg-slate-900/50 transition-colors"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
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

export default EditProfileModal;
