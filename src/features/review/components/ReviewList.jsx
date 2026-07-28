import React from "react";
import ReviewItem from "./ReviewItem";
import useFetchReviews from "../hooks/useFetchReviews";
import { Loader2, MessageSquareDashed, AlertCircle } from "lucide-react";

const ReviewList = ({ placeId, refreshTrigger }) => {
  const { reviews, isLoading, error, hasMore, handleReadMore } = useFetchReviews(
    placeId,
    refreshTrigger
  );

  // Trạng thái: Đang tải lần đầu (chưa có data)
  if (isLoading && reviews?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-slate-400 animate-spin mb-3" />
        <p className="text-slate-500 font-medium text-sm">Đang tải đánh giá...</p>
      </div>
    );
  }

  // Trạng thái: Lỗi kết nối / Lỗi API
  if (error && reviews?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 px-4 bg-accent-50 rounded-2xl border border-accent-100">
        <AlertCircle className="w-8 h-8 text-accent-500 mb-3" />
        <p className="text-accent-600 font-medium text-center text-sm">{error}</p>
      </div>
    );
  }

  // Trạng thái: Chưa có đánh giá nào
  if (!reviews || reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 text-center">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
          <MessageSquareDashed className="w-6 h-6 text-slate-400" />
        </div>
        <h4 className="text-base font-bold text-slate-900 mb-1">Chưa có đánh giá</h4>
        <p className="text-sm text-slate-500 max-w-sm">
          Hãy trở thành người đầu tiên chia sẻ trải nghiệm của bạn về địa điểm này nhé!
        </p>
      </div>
    );
  }

  // Trạng thái: Hiển thị danh sách đánh giá
  return (
    <div className="w-full">
      {/* Danh sách Review */}
      <div className="flex flex-col gap-4 md:gap-6">
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </div>

      {/* Nút Xem thêm */}
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={handleReadMore}
            disabled={isLoading}
            aria-busy={isLoading}
            className="w-full sm:w-auto min-w-[200px] px-8 py-3.5 bg-white text-slate-700 font-semibold text-sm rounded-full border border-slate-200 shadow-sm hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin text-slate-400" />
                <span>Đang tải...</span>
              </>
            ) : (
              <>
                <span>Xem thêm đánh giá</span>
                <svg 
                  className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewList;