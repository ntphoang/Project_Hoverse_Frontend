import { Inbox, Loader2 } from "lucide-react";
import useAdminCategories from "../hooks/useAdminCategories";
import AdminCategoryItem from "./AdminCategoryItem";

const AdminCategoryList = ({ isActive }) => {
  const { data, isLoading } = useAdminCategories({ isActive });
  const categories = data || [];

  // Trạng thái đang tải
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500 h-full min-h-[300px]">
        <Loader2 className="w-8 h-8 animate-spin text-slate-400 mb-4" />
        <p className="text-sm font-medium">Đang tải dữ liệu...</p>
      </div>
    );
  }

  // Trạng thái trống (Không có dữ liệu)
  if (categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400 h-full min-h-[300px]">
        <Inbox className="w-12 h-12 mb-3 opacity-50" />
        <p className="text-sm font-medium text-slate-500">
          Chưa có danh mục nào trong mục này.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {categories.map((category) => (
        <AdminCategoryItem
          key={category.id}
          category={category}
          isActive={isActive}
        />
      ))}
    </div>
  );
};

export default AdminCategoryList;
