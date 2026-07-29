import { Star, MapPin } from "lucide-react";

const PlaceItem = ({ place, onClick }) => {
  const {
    title,
    address,
    categoryName,
    avgRating,
    reviewCount,
    coverImageUrl,
    authorName,
    createdAt,
  } = place;

  const fallbackImage =
    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop";
  const displayImage = coverImageUrl ? coverImageUrl : fallbackImage;
  const author = authorName || "Anonymous";

  return (
    <article
      onClick={onClick}
      tabIndex={0}
      role="button"
      className="group w-full bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={displayImage}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-900 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
          {categoryName}
        </div>
      </div>

      <div className="p-4 md:p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-3 mb-2">
          <h3 className="text-lg font-bold font-heading text-slate-900 line-clamp-1 flex-1">
            {title}
          </h3>
          <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md border border-slate-100 shrink-0">
            <Star size={14} className="fill-slate-900 text-slate-900" />
            <span className="text-sm font-semibold text-slate-900">
              {reviewCount > 0 ? avgRating : "Mới"}
            </span>
            {reviewCount > 0 && (
              <span className="text-xs text-slate-500 ml-0.5">
                ({reviewCount})
              </span>
            )}
          </div>
        </div>

        <div className="flex items-start gap-1.5 text-sm text-slate-500 mb-4 line-clamp-2 min-h-[2.5rem]">
          <MapPin size={16} className="shrink-0 mt-0.5" />
          <p>{address}</p>
        </div>

        {/* Phần Footer của Card */}
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
          {/* Cụm Tác giả (Bên trái) */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
              {author.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-medium text-slate-600 truncate">
              Bởi {author}
            </span>
          </div>

          {/* Cụm Ngày đăng (Bên phải) */}
          <span className="text-xs text-slate-400 shrink-0">
            {new Date(createdAt).toLocaleDateString("vi-VN")}
          </span>
        </div>
      </div>
    </article>
  );
};

export default PlaceItem;
