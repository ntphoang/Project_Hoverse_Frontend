import React from "react";

const ProfileView = ({ profile }) => {
  // Trích xuất chữ cái đầu tiên cho Avatar Fallback
  const getInitial = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  // Format ngày tháng chuyên nghiệp (VD: 07/2026)
  const joinDate = profile?.createAt
    ? new Date(profile.createAt).toLocaleDateString("vi-VN", {
        month: "2-digit",
        year: "numeric",
      })
    : "N/A";

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden transition-all">
      {/* Tầng 1: Cover / Background (Tối giản, không rườm rà) */}
      <div className="h-32 md:h-48 bg-slate-100 border-b border-slate-200 w-full" />

      <div className="px-6 md:px-10 pb-8 md:pb-10">
        {/* Tầng 2: Avatar & Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 -mt-12 md:-mt-16 mb-6 md:mb-8">
          <div className="relative inline-block shrink-0">
            {profile?.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile?.username || "Avatar"}
                loading="lazy"
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-sm bg-white"
              />
            ) : (
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-sm bg-slate-900 text-white flex items-center justify-center text-3xl md:text-4xl font-bold font-heading">
                {getInitial(profile?.fullName || profile?.username)}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="px-6 py-2.5 bg-white text-slate-900 font-semibold text-sm rounded-full border border-slate-200 hover:bg-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
            >
              Liên hệ
            </button>
            <button
              type="button"
              className="px-6 py-2.5 bg-slate-900 text-white font-semibold text-sm rounded-full border border-slate-900 hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
            >
              Theo dõi
            </button>
          </div>
        </div>

        {/* Tầng 3: Thông tin cá nhân (Info Section) */}
        <div className="mb-8 md:mb-10">
          <div className="flex items-center gap-3 mb-1.5">
            <h1 className="text-2xl md:text-3xl font-bold font-heading text-slate-900 tracking-tight line-clamp-1">
              {profile?.fullName || profile?.username || "Người dùng"}
            </h1>
            <span className="px-2 py-0.5 border border-slate-900 text-slate-900 text-[10px] font-bold rounded uppercase tracking-widest shrink-0">
              Pro
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 text-slate-500 text-sm font-medium">
            <span>{profile?.email || "Chưa cập nhật email"}</span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-slate-300"></span>
            <span>Thành viên từ tháng {joinDate}</span>
          </div>
        </div>

        {/* Tầng 4: Số liệu thống kê (Stats Section - Dùng Typography thay Icon) */}
        <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-8">
          <div className="flex flex-col gap-1 md:gap-1.5">
            <span className="text-2xl md:text-3xl font-bold font-heading text-slate-900">
              2,985
            </span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Đánh giá
            </span>
          </div>
          <div className="flex flex-col gap-1 md:gap-1.5 border-l border-slate-100 pl-4 md:pl-6">
            <span className="text-2xl md:text-3xl font-bold font-heading text-slate-900">
              132
            </span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Đang theo dõi
            </span>
          </div>
          <div className="flex flex-col gap-1 md:gap-1.5 border-l border-slate-100 pl-4 md:pl-6">
            <span className="text-2xl md:text-3xl font-bold font-heading text-slate-900">
              548
            </span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Lượt thích
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
