import { MapPin, Star, Crown } from "lucide-react";
import { Link } from "react-router-dom";

const DEFAULT_COVER_IMAGE =
  "https://res.cloudinary.com/ty4mmnvd/image/upload/v1786459968/default_x7xwbw.jpg";

const PlaceTopRatingItem = ({ place, rank }) => {
  const isTop1 = rank === 1;

  const renderRankBadge = () => {
    if (isTop1) {
      return (
        <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-amber-500 to-amber-400 text-white rounded-lg shadow-md border border-amber-300/50">
          <Crown className="w-3.5 h-3.5" strokeWidth={2.5} />
          <span className="text-[11px] font-bold tracking-wide uppercase">Top 1</span>
        </div>
      );
    }

    if (rank === 2 || rank === 3) {
      return (
        <div className="flex items-center gap-1 px-2 py-1 bg-white/90 text-slate-700 rounded-lg shadow-sm backdrop-blur-md border border-slate-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Top</span>
          <span className="text-[11px] font-bold">{rank}</span>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center min-w-[28px] h-7 bg-white/90 text-slate-500 rounded-lg shadow-sm backdrop-blur-md border border-slate-200">
        <span className="text-[11px] font-bold">#{rank}</span>
      </div>
    );
  };

  return (
    <Link
      to={`/places/${place.id}`}
      className={`group flex flex-col bg-white rounded-2xl overflow-hidden transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400
        ${
          isTop1
            ? "border-[1.5px] border-amber-200 shadow-md hover:shadow-xl hover:shadow-amber-100/50 hover:-translate-y-1.5"
            : "border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1"
        }
      `}
    >
      {/* Ảnh bìa */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 shrink-0 border-b border-slate-100">
        <img
          src={place.coverImageUrl || DEFAULT_COVER_IMAGE}
          alt={place.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="absolute top-2.5 left-2.5 z-20">
          {renderRankBadge()}
        </div>

        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-1 bg-white/95 backdrop-blur-md rounded-lg shadow-sm border border-slate-200/60 z-20">
          <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
          <span className="text-[11px] font-bold text-slate-800">
            {place.avgRating ? place.avgRating.toFixed(1) : "0.0"}
          </span>
        </div>
      </div>

      {/* Nội dung */}
      <div className="flex flex-col p-3.5 flex-1 bg-white relative z-10">
        <h3 className="font-heading font-bold text-slate-900 text-sm md:text-base line-clamp-1 mb-1.5 transition-colors group-hover:text-amber-600" title={place.title}>
          {place.title}
        </h3>

        <div className="flex items-start gap-1.5 text-slate-500 mb-3">
          <MapPin className="w-3.5 h-3.5 shrink-0 mt-[3px] opacity-70" />
          <span className="text-[12px] md:text-[13px] line-clamp-2 leading-snug">
            {place.address || "Chưa cập nhật địa chỉ"}
          </span>
        </div>

        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] font-medium text-slate-500">
            {place.reviewCount > 0
              ? `${place.reviewCount} bài đánh giá`
              : "Chưa đánh giá"}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PlaceTopRatingItem;