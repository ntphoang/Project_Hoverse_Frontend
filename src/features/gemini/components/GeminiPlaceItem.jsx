// GeminiPlaceItem.jsx
import { Link } from "react-router-dom";
import { Star, MapPin, Sparkles, Hash } from "lucide-react";

const GeminiPlaceItem = ({ place }) => {
  if (!place) return null;

  const fallbackImage =
    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop";
  const displayImage = place.coverImageUrl || fallbackImage;

  return (
    <Link
      to={`/places/${place.id}`}
      className="group w-full bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col overflow-hidden transition-all hover:shadow-md hover:-translate-y-1"
    >
      {/* 1. KHỐI LÝ DO AI */}
      <div className="bg-gradient-to-r from-primary-50 to-indigo-50/50 p-2 md:p-2.5 border-b border-primary-100 flex items-start gap-2 relative">
        <Sparkles className="w-3.5 h-3.5 text-primary-600 mt-0.5 shrink-0" />
        <div>
          <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-primary-500 mb-0.5 block">
            Lý do đề xuất
          </span>
          <p className="text-xs font-medium text-primary-700 leading-snug line-clamp-2">
            {place.reason}
          </p>
        </div>
      </div>

      {/* 2. ẢNH BÌA */}
      <div className="relative w-full h-35 md:h-48 overflow-hidden bg-slate-100 border-b border-slate-100 shrink-0">
        <img
          src={displayImage}
          alt={place.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {place.categoryName && (
          <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md text-slate-900 text-[9px] font-bold uppercase px-2 py-0.5 rounded-full shadow-sm">
            {place.categoryName}
          </div>
        )}
      </div>

      {/* 3. THÔNG TIN CHÍNH */}
      <div className="p-3 flex flex-col flex-1 gap-1.5">
        <div className="flex justify-between items-start gap-2">
          <h3
            className="text-sm font-bold text-slate-900 line-clamp-1 flex-1 group-hover:text-primary-600 transition-colors"
            title={place.title}
          >
            {place.title}
          </h3>
          <div className="flex items-center gap-1 bg-slate-50 px-1.5 py-0.5 rounded-md border border-slate-100 shrink-0">
            <Star size={10} className="fill-slate-900 text-slate-900" />
            <span className="text-[10px] font-semibold text-slate-900">
              {place.reviewCount > 0 ? place.avgRating : "Mới"}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-1 text-xs text-slate-500 line-clamp-1">
          <MapPin size={12} className="shrink-0 mt-0.5 opacity-70" />
          <p className="line-clamp-1">{place.address}</p>
        </div>

        {place.tags && place.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto pt-2 border-t border-slate-50">
            {place.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="flex items-center gap-0.5 text-[9px] font-semibold text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded-md border border-slate-100"
              >
                <Hash className="w-2 h-2 text-slate-400" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default GeminiPlaceItem;
