import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { AddReviewModal, ReviewList, useReviewCreate } from "@/features/review";
import MapPicker from "../components/MapPicker";
import usePlaceDetail from "../hooks/usePlaceDetail";
import { MapPin, Star, Edit3, Heart, PenLine } from "lucide-react";
import { useAuthStore, useFavoritesStore } from "@/store";
import useActionGuard from "@/utils/useActionGuard";
import placeService from "../services/placeService";
import { toast } from "react-toastify";

const PlaceDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const { placeId } = useParams();

  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const user = useAuthStore((state) => state.user);

  const { place, isLoading, error: placeDetailError } = usePlaceDetail(placeId);
  const {
    isSubmitting,
    error: reviewCreateError,
    submitReview,
  } = useReviewCreate();

  const { withAuth, withVerified } = useActionGuard();

  const handleCreateReview = async ({ rating, content, files }) => {
    try {
      await submitReview(placeId, { rating, content }, files);
      setIsModalOpen(false);
      setRefreshTrigger((prev) => prev + 1);
      toast.success("Cảm ơn đánh giá của bạn!");
    } catch (err) {
      toast.error("Có lỗi xảy ra khi thêm review!");
    }
  };

  useEffect(() => {
    const sessionStorageKey = `hasViewPlace_${placeId}`;
    const hasViewPlace = sessionStorage.getItem(sessionStorageKey);

    if (!hasViewPlace) {
      // Dùng cờ ở SessionStorage để tránh user spam F5 liên tục gọi API làm chết DB
      placeService.updateViewCount(placeId);
      sessionStorage.setItem(sessionStorageKey, true);
    }
  }, [placeId]);

  if (isLoading)
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin"></div>
        <p className="mt-4 font-medium text-slate-600">Đang tải dữ liệu...</p>
      </div>
    );

  if (placeDetailError)
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
        <h2 className="text-xl md:text-2xl font-bold text-danger mb-2">
          Đã xảy ra lỗi
        </h2>
        <p className="text-slate-600">{placeDetailError}</p>
      </div>
    );

  if (reviewCreateError) {
    console.log("Thêm review thất bại: " + reviewCreateError);
  }

  const isAuthor = user?.email === place.authorEmail || user?.role === "ADMIN";
  const isFavorite = favoriteIds.includes(place.id); // Trích xuất state để code UI clean hơn

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />

      <main className="flex-grow -mt-16">
        <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] bg-slate-900">
          <img
            src={
              place.coverImageUrl ||
              "https://images.unsplash.com/photo-1554118811-1e0d58224f24"
            }
            alt={place.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>

          <div className="absolute bottom-0 left-0 w-full px-4 sm:px-6 lg:px-8 pb-10 md:pb-16">
            <div className="max-w-7xl mx-auto flex flex-col items-start gap-4">
              <span className="bg-white/20 backdrop-blur-md text-white text-xs md:text-sm font-semibold px-3 py-1.5 rounded-full border border-white/30">
                {place.categoryName || "Khám phá"}
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-heading text-white tracking-tight leading-tight max-w-4xl">
                {place.title}
              </h1>
            </div>
          </div>

          {isAuthor && (
            <Link
              to={`/edit-place/${placeId}`}
              className="absolute top-24 right-4 md:right-8 bg-white/90 backdrop-blur-md text-slate-900 text-sm font-semibold px-4 py-2 rounded-full shadow-lg flex items-center gap-2 hover:bg-white hover:scale-105 transition-all"
            >
              <Edit3 size={16} />
              Chỉnh sửa
            </Link>
          )}
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-10 md:space-y-12">
              <div className="flex items-center gap-4 p-4 md:p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
                  {(place.authorName || "A").charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Đăng bởi</p>
                  <p className="text-base font-bold text-slate-900">
                    {place.authorName || "Người ẩn danh"}
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold font-heading text-slate-900 mb-4 tracking-tight">
                  Giới thiệu
                </h2>
                <p className="text-slate-600 leading-relaxed text-base md:text-lg whitespace-pre-line">
                  {place.description ||
                    "Chưa có mô tả chi tiết cho địa điểm này."}
                </p>
              </div>

              {place.placeMediaList && place.placeMediaList.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold font-heading text-slate-900 mb-4 tracking-tight">
                    Hình ảnh nổi bật
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    {place.placeMediaList.map((media) => (
                      <div
                        key={media.id}
                        className="relative aspect-square rounded-xl md:rounded-2xl overflow-hidden bg-slate-100 group"
                      >
                        <img
                          src={media.url}
                          alt="Gallery"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {place.tags && place.tags.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold font-heading text-slate-900 mb-4 tracking-tight">
                    Tiện ích
                  </h2>
                  <div className="flex flex-wrap gap-2.5">
                    {place.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-full shadow-sm"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-6 md:pt-10 border-t border-slate-200">
                <h2 className="text-2xl md:text-3xl font-bold font-heading text-slate-900 mb-6 md:mb-8 tracking-tight">
                  Đánh giá từ cộng đồng{" "}
                  <span className="text-slate-400 text-xl font-normal">
                    ({place.reviewCount})
                  </span>
                </h2>
                <ReviewList
                  placeId={place.id}
                  refreshTrigger={refreshTrigger}
                />
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 flex flex-col gap-6">
                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col gap-6">
                  <div className="w-full h-[200px] md:h-[250px] rounded-2xl overflow-hidden relative z-0 border border-slate-100 bg-slate-50">
                    <MapPicker
                      latitude={place.latitude}
                      longitude={place.longitude}
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin
                      className="text-slate-400 shrink-0 mt-0.5"
                      size={20}
                    />
                    <p className="text-slate-700 font-medium leading-relaxed">
                      {place.address}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Star
                      className="fill-slate-900 text-slate-900 shrink-0"
                      size={20}
                    />
                    <p className="text-slate-900 font-bold text-lg">
                      {place.avgRating
                        ? `${place.avgRating} / 5.0`
                        : "Chưa có đánh giá"}
                    </p>
                  </div>

                  <div className="w-full h-px bg-slate-100 my-1"></div>

                  <button
                    onClick={() => withVerified(() => setIsModalOpen(true))}
                    className="w-full py-3.5 px-4 bg-slate-900 text-white rounded-full font-semibold text-sm hover:bg-slate-800 active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 flex items-center justify-center gap-2"
                  >
                    <PenLine size={18} />
                    Viết đánh giá
                  </button>

                  {/* NÚT LƯU ĐỊA ĐIỂM ĐÃ ĐƯỢC TỐI ƯU */}
                  <button
                    onClick={() => withAuth(() => toggleFavorite(place))}
                    className={`
                      w-full py-3.5 px-4 rounded-full font-semibold text-sm flex items-center justify-center gap-2 
                      transition-all duration-200 active:scale-[0.98]
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2
                      ${
                        isFavorite
                          ? "bg-slate-50 text-slate-900 border border-slate-200"
                          : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                      }
                    `}
                  >
                    <Heart
                      size={18}
                      className={`transition-all duration-300 ${
                        isFavorite
                          ? "fill-slate-900 text-slate-900 scale-110"
                          : "text-slate-400"
                      }`}
                    />
                    {isFavorite ? "Bỏ lưu địa điểm" : "Lưu địa điểm"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {isModalOpen && (
        <AddReviewModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateReview}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
};

export default PlaceDetail;
