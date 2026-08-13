import Pagination from "@/components/common/Pagination";
import { Loader2, Inbox } from "lucide-react";
import useAdminUsers from "../hooks/useAdminUsers";
import AdminUserItem from "./AdminUserItem";

const AdminUserList = ({ tab, page, onPageChange }) => {
  const { data, isLoading } = useAdminUsers({ tab, page });

  const users = data?.content || [];
  const totalPages = data?.totalPages || 0;

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
  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400 h-full min-h-[300px]">
        <Inbox className="w-12 h-12 mb-3 opacity-50" />
        <p className="text-sm font-medium text-slate-500">
          Chưa có người dùng nào trong mục này.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Danh sách User */}
      {users.map((user) => (
        <AdminUserItem key={user.id} user={user} tab={tab} />
      ))}

      {/* Phân trang */}
      <Pagination
        onPageChange={onPageChange}
        totalPages={totalPages}
        currentPage={data?.pageable?.pageNumber}
      />
    </div>
  );
};

export default AdminUserList;
