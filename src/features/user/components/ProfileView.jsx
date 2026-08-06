import React, { useState } from "react";
import { useAuthStore } from "@/store";
import { Edit2 } from "lucide-react";
import EditProfileModal from "./EditProfileModal";
import EditAvatarModal from "./EditAvatarModal";

const ProfileView = ({ profile }) => {
  const user = useAuthStore((state) => state.user);
  const isOwner = user?.id === profile?.id;

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);

  const joinDate = profile?.createAt
    ? new Date(profile.createAt).toLocaleDateString("vi-VN", {
        month: "2-digit",
        year: "numeric",
      })
    : "N/A";

  return (
    <>
      <div className="w-full max-w-4xl mx-auto bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden transition-all">
        {/* COVER BACKGROUND */}
        <div className="h-32 md:h-48 bg-slate-100 border-b border-slate-200 w-full" />

        <div className="px-6 md:px-10 pb-8 md:pb-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 -mt-12 md:-mt-16 mb-6 md:mb-8">
            {/* AVATAR */}
            <div
              className="relative inline-block shrink-0 group cursor-pointer"
              onClick={() => setIsAvatarOpen(true)}
            >
              <img
                src={
                  user.avatarUrl ||
                  "https://res.cloudinary.com/ty4mmnvd/image/upload/v1785929829/avatar-default_ziyif2.svg"
                }
                alt={user?.username || "Avatar"}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-sm bg-white relative z-10 transition-transform duration-300 group-hover:scale-[1.02]"
              />
              {/* Icon Edit Avatar nổi ở góc dưới */}
              <div className="absolute bottom-1 right-1 z-20 bg-white p-2 rounded-full shadow-md border border-slate-100 text-slate-500 group-hover:text-slate-900 group-hover:bg-slate-50 transition-all">
                <Edit2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center gap-3 relative z-10">
              {isOwner ? (
                // Nút dành cho chủ sở hữu
                <button
                  onClick={() => setIsEditOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white font-semibold text-sm rounded-full border border-slate-900 hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
                >
                  <Edit2 className="w-4 h-4" />
                  Chỉnh sửa hồ sơ
                </button>
              ) : (
                // Nút dành cho khách vào xem
                <>
                  <button className="px-6 py-2.5 bg-white text-slate-900 font-semibold text-sm rounded-full border border-slate-200 hover:bg-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-200">
                    Liên hệ
                  </button>
                  <button className="px-6 py-2.5 bg-slate-900 text-white font-semibold text-sm rounded-full border border-slate-900 hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2">
                    Theo dõi
                  </button>
                </>
              )}
            </div>
          </div>

          {/* INFO SECTION */}
          <div className="mb-8 md:mb-10">
            <div className="flex items-center gap-3 mb-1.5">
              <h1 className="text-2xl md:text-3xl font-bold font-heading text-slate-900 tracking-tight line-clamp-1">
                {user?.fullName || profile?.username || "Người dùng"}
              </h1>
              <span className="px-2.5 py-0.5 border border-slate-900 text-slate-900 text-[10px] font-bold rounded-full uppercase tracking-widest shrink-0">
                {user.role}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 text-slate-500 text-sm font-medium">
              <span>{user?.email || "Chưa cập nhật email"}</span>
              <span className="hidden sm:block w-1 h-1 rounded-full bg-slate-300"></span>
              <span>Thành viên từ tháng {joinDate}</span>
            </div>
          </div>

          {/* STATS SECTION */}
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

      {isEditOpen && <EditProfileModal onClose={() => setIsEditOpen(false)} />}
      {isAvatarOpen && <EditAvatarModal onClose={() => setIsAvatarOpen(false)} />}
    </>
  );
};

export default ProfileView;