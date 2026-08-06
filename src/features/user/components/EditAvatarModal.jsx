import { useEffect, useState } from "react";
import useUploadAvatar from "../hooks/useUploadAvatar";
import { useAuthStore } from "@/store";
import { X, Loader2 } from "lucide-react";

const EditAvatarModal = ({ onClose }) => {
  const [prevUrl, setPrevUrl] = useState(null);
  const [file, setFile] = useState(null);

  const { isLoading, handleSubmitUploadAvatar } = useUploadAvatar();
  const user = useAuthStore((state) => state.user);

  const handleChangeFile = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    if (prevUrl) URL.revokeObjectURL(prevUrl);
    setFile(selectedFile);
    setPrevUrl(URL.createObjectURL(selectedFile));
  };

  const handleSaveAvatar = async () => {
    if (!file) return;

    try {
      await handleSubmitUploadAvatar(file);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      if (prevUrl) URL.revokeObjectURL(prevUrl);
    };
  }, [prevUrl]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header Modal */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">
            Cập nhật ảnh đại diện
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Modal */}
        <div className="p-6 flex flex-col items-center">
          {/* Avatar Preview */}
          <div className="relative mb-6">
            <img
              src={prevUrl || user.avatarUrl}
              alt="Avatar Preview"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover bg-slate-100 border-4 border-slate-50 shadow-sm"
            />
          </div>

          {/* Custom File Input */}
          <div className="w-full text-center">
            <input
              type="file"
              accept="image/jpeg, image/png, image/webp, image/jpg"
              onChange={(e) => handleChangeFile(e)}
              className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2.5 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-slate-900 file:text-white
                hover:file:bg-slate-800
                file:cursor-pointer cursor-pointer
                bg-slate-50 rounded-full border border-slate-200 transition-all"
            />
            <p className="mt-2 text-xs text-slate-400">
              Hỗ trợ định dạng: JPEG, PNG, WEBP, JPG
            </p>
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
            type="button"
            disabled={isLoading}
            onClick={handleSaveAvatar}
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
      </div>
    </div>
  );
};

export default EditAvatarModal;
