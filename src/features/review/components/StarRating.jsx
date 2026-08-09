import { Star } from "lucide-react";

const StarRating = ({ rating, onRatingChange, isDisabled }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= rating;

        return (
          <button
            key={star}
            type="button"
            disabled={isDisabled}
            onClick={() => onRatingChange && onRatingChange(star)}
            className={`
              transition-transform duration-200 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400
              ${
                isDisabled
                  ? "cursor-default opacity-90"
                  : "cursor-pointer hover:scale-110 active:scale-95"
              }
            `}
            aria-label={`Đánh giá ${star} sao`}
          >
            <Star
              size={22}
              strokeWidth={isActive ? 0 : 1.5}
              className={`transition-colors duration-200 ${
                isActive
                  ? "fill-warning text-warning"
                  : "fill-slate-50 text-slate-300"
              } ${!isDisabled && !isActive ? "hover:text-warning/50" : ""}`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
