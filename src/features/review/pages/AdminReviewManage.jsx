import { useState } from "react";
import { Filter } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import AdminReviewList from "../components/AdminReviewList";

const AdminReviewManage = () => {
  const now = new Date();
  const monthNow = now.getMonth() + 1;
  const yearNow = now.getFullYear();

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || "0";

  const [conditions, setConditions] = useState({
    month: monthNow,
    year: yearNow,
    status: "VISIBLE",
    rating: 5,
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setConditions((prev) => ({
      ...prev,
      [name]: name === "status" ? value : Number(value),
    }));
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-900 tracking-tight">
            Quản lý đánh giá
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Duyệt và quản lý các đánh giá từ cộng đồng người dùng
          </p>
        </div>
      </div>

      {/* FILTER */}
      <div className="bg-white p-4 rounded-card shadow-card border border-slate-200 flex flex-col md:flex-row items-center gap-4">
        <div className="flex items-center gap-2 text-slate-700 font-semibold mr-2 shrink-0">
          <Filter className="w-5 h-5" />
          <span>Bộ lọc:</span>
        </div>

        <div className="grid grid-cols-2 md:flex md:flex-row gap-3 w-full">
          <select
            name="month"
            value={conditions.month}
            onChange={handleFilterChange}
            className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-btn text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all cursor-pointer"
          >
            <option value={monthNow}>Tháng {monthNow}</option>
            <option value={monthNow - 1 === 0 ? 12 : monthNow - 1}>
              Tháng {monthNow - 1}
            </option>
            <option
              value={monthNow - 2 <= 0 ? 12 + (monthNow - 2) : monthNow - 2}
            >
              Tháng {monthNow - 2}
            </option>
          </select>

          <select
            name="year"
            value={conditions.year}
            onChange={handleFilterChange}
            className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-btn text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all cursor-pointer"
          >
            <option value={yearNow}>Năm {yearNow}</option>
            <option value={yearNow - 1}>Năm {yearNow - 1}</option>
            <option value={yearNow - 2}>Năm {yearNow - 2}</option>
          </select>

          <select
            name="status"
            value={conditions.status}
            onChange={handleFilterChange}
            className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-btn text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all cursor-pointer"
          >
            <option value="VISIBLE">Đang hiển thị</option>
            <option value="REPORTED">Bị báo cáo</option>
            <option value="HIDDEN">Đã ẩn</option>
          </select>

          <select
            name="rating"
            value={conditions.rating}
            onChange={handleFilterChange}
            className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-btn text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all cursor-pointer"
          >
            {[5, 4, 3, 2, 1].map((rating) => (
              <option key={rating} value={rating}>
                {rating} ⭐
              </option>
            ))}
          </select>
        </div>
      </div>

      <AdminReviewList
        page={page}
        conditions={conditions}
        onPageChange={(newPage) => setSearchParams({ page: newPage })}
      />
    </div>
  );
};

export default AdminReviewManage;
