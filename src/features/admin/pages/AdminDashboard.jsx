import PlaceTopRatingList from "@/features/place/components/PlaceTopRatingList";
import { TrendingUp } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-slate-900 tracking-tight">
            Tổng quan hệ thống
          </h1>
          <p className="text-sm text-slate-500 mt-1.5">
            Theo dõi các chỉ số quan trọng và nội dung nổi bật
          </p>
        </div>
      </div>

      {/* Danh sách Top Rating */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3 px-1">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-50 border border-amber-200/50 rounded-xl shadow-sm">
            <TrendingUp className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Top 5 địa điểm đánh giá cao
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Bảng xếp hạng dựa trên trải nghiệm người dùng
            </p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 md:p-7 min-h-[300px]">
          <PlaceTopRatingList />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
