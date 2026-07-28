import React from "react";
import useProfile from "../hooks/useProfile";
import ProfileView from "./ProfileView";
import { Loader2, AlertTriangle, RefreshCcw } from "lucide-react";

const ProfileContainer = () => {
  const { profile, isLoading, error } = useProfile();

  // Trạng thái: Đang tải dữ liệu
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-slate-50 w-full animate-in fade-in duration-500">
        <Loader2 className="w-10 h-10 text-slate-900 animate-spin mb-4" />
        <h3 className="font-heading font-bold text-slate-900 text-lg mb-1">
          Đang tải hồ sơ
        </h3>
        <p className="text-slate-500 font-medium text-sm">
          Vui lòng đợi trong giây lát...
        </p>
      </div>
    );
  }

  // Trạng thái: Có lỗi xảy ra (Fetch thất bại)
  if (error !== null) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-slate-50 w-full px-4">
        <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-accent-100 shadow-sm max-w-md w-full flex flex-col items-center text-center transition-all">
          <div className="w-16 h-16 bg-accent-50 rounded-full flex items-center justify-center mb-5 shadow-inner">
            <AlertTriangle className="w-8 h-8 text-accent-500" />
          </div>
          
          <h3 className="font-heading font-bold text-slate-900 text-xl mb-2 tracking-tight">
            Không thể tải hồ sơ
          </h3>
          <p className="text-slate-600 text-sm mb-8 leading-relaxed">
            {error || "Đã xảy ra sự cố trong quá trình kết nối đến máy chủ. Vui lòng thử lại sau."}
          </p>
          
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3.5 px-6 bg-slate-900 text-white font-semibold text-sm rounded-full shadow-sm hover:bg-slate-800 hover:-translate-y-0.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 flex items-center justify-center gap-2 group"
          >
            <RefreshCcw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
            Thử lại ngay
          </button>
        </div>
      </div>
    );
  }

  // Trạng thái: Thành công (Render View)
  return (
    <div className="animate-in fade-in duration-500 slide-in-from-bottom-2">
      <ProfileView profile={profile} />
    </div>
  );
};

export default ProfileContainer;