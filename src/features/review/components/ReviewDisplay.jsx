import React from "react";
import StarRating from "./StarRating";

const ReviewDisplay = ({ review }) => {
  return (
    <div className="flex flex-col">
      {/* Tầng 1: Header (User Info + Actions + Rating) */}
      <div className="flex items-start justify-between gap-4">
        {/* User Info */}
        <div className="flex items-center gap-3 md:gap-4">
          <img
            src={review.avatarUrl}
            alt={`Avatar của ${review.username}`}
            loading="lazy"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border border-slate-100 shrink-0 bg-slate-50"
          />
          <div className="flex flex-col">
            <h4 className="font-heading font-bold text-slate-900 text-base md:text-lg line-clamp-1">
              {review.authorFullname || review.username}
            </h4>
            <time
              dateTime={review.updatedAt}
              className="text-xs md:text-sm text-slate-500 font-medium"
            >
              {new Date(review.updatedAt).toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </time>
          </div>
        </div>

        {/* Rating Stars */}
        <div className="shrink-0 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
          <StarRating rating={review.rating} isDisabled={true} />
        </div>
      </div>

      {/* Tầng 2: Body (Nội dung text) */}
      <div className="mt-4 md:mt-5">
        <p className="text-slate-700 leading-relaxed text-sm md:text-base whitespace-pre-line break-words">
          {review.content}
        </p>
      </div>

      {/* Tầng 3: Gallery (Ảnh đính kèm) */}
      {review.reviewMediaList && review.reviewMediaList.length > 0 && (
        <div className="mt-5 pt-5 border-t border-slate-100">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {review.reviewMediaList.map((media) => (
              <button
                key={media.id}
                type="button"
                className="group relative aspect-square rounded-xl overflow-hidden bg-slate-100 cursor-pointer border border-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
                aria-label="Xem ảnh phóng to"
              >
                <img
                  src={media.url}
                  alt="Review attachment"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-300" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewDisplay;
