import { Loader2, MessageSquare } from "lucide-react";
import useAdminReviews from "../hooks/useAdminReviews";
import AdminReviewItem from "./AdminReviewItem";
import Pagination from "@/components/common/Pagination";

const AdminReviewList = ({ page, conditions, onPageChange }) => {
  const { data, isLoading } = useAdminReviews(conditions, page);
  const totalPages = data?.totalPages;
  const reviews = data?.content || [];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500 mb-4" />
        <p className="text-sm font-medium">Đang tải danh sách đánh giá...</p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      // Dùng rounded-card cho trạng thái trống
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-card border border-slate-200 border-dashed text-slate-400">
        <MessageSquare className="w-12 h-12 mb-3 opacity-30" />
        <p className="text-sm font-medium text-slate-500">
          Không tìm thấy đánh giá nào phù hợp.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <AdminReviewItem key={review.id} review={review} />
        ))}
      </div>

      <div className="flex justify-center">
        <Pagination
          currentPage={data?.pageable?.pageNumber || 0}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default AdminReviewList;
