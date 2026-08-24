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
      className="group w-full bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
    >
      {/* 1. KHỐI LÝ DO AI */}
      <div className="bg-gradient-to-r from-primary-50 to-indigo-50/50 p-4 border-b border-primary-100 flex items-start gap-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary-200/20 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
        <div className="p-1.5 bg-white rounded-md shadow-sm border border-primary-100 shrink-0 mt-0.5 relative z-10">
          <Sparkles className="w-4 h-4 text-primary-600" />
        </div>
        <div className="relative z-10">
          <span className="text-[11px] font-bold uppercase tracking-wider text-primary-500 mb-0.5 block">
            Lý do đề xuất
          </span>
          <p className="text-sm font-medium text-primary-700 leading-relaxed line-clamp-3">
            {place.reason}
          </p>
        </div>
      </div>

      {/* 2. ẢNH BÌA */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100 border-b border-slate-100">
        <img
          src={displayImage}
          alt={place.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Category Badge */}
        {place.categoryName && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-900 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
            {place.categoryName}
          </div>
        )}
      </div>

      {/* 3. THÔNG TIN CHÍNH */}
      <div className="p-4 md:p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-3 mb-2">
          <h3
            className="text-lg font-heading font-bold text-slate-900 line-clamp-1 flex-1 group-hover:text-primary-600 transition-colors"
            title={place.title}
          >
            {place.title}
          </h3>
          <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md border border-slate-100 shrink-0">
            <Star size={14} className="fill-slate-900 text-slate-900" />
            <span className="text-sm font-semibold text-slate-900">
              {place.reviewCount > 0 ? place.avgRating : "Mới"}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-1.5 text-sm text-slate-500 mb-3 line-clamp-2 min-h-[2.5rem]">
          <MapPin size={16} className="shrink-0 mt-0.5 opacity-70" />
          <p>{place.address}</p>
        </div>

        {/* Tags */}
        {place.tags && place.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-100">
            {place.tags.map((tag, index) => (
              <span
                key={index}
                className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-50 px-2 py-1 rounded-md border border-slate-100"
              >
                <Hash className="w-3 h-3 text-slate-400" />
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
