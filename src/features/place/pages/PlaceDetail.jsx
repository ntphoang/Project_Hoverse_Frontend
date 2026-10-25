import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { AddReviewModal, ReviewList, useReviewCreate } from "@/features/review";
import MapPicker from "../components/MapPicker";
import usePlaceDetail from "../hooks/usePlaceDetail";
import {
  MapPin,
  Star,
  Edit3,
  Heart,
  PenLine,
  Navigation,
  ExternalLink,
} from "lucide-react";
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

  const {
    data: place,
    isLoading,
    error: placeDetailError,
  } = usePlaceDetail(placeId);
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

  const handleGetDirections = () => {
    const { latitude, longitude } = place;

    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    const sessionStorageKey = `hasViewPlace_${placeId}`;
    const hasViewPlace = sessionStorage.getItem(sessionStorageKey);

    if (!hasViewPlace) {
      placeService.updateViewCount(placeId);
      sessionStorage.setItem(sessionStorageKey, true);
    }
  }, [placeId]);

  if (isLoading)
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-slate-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900"></div>
        <p className="mt-4 font-medium text-slate-600">Đang tải dữ liệu...</p>
      </div>
    );

  if (placeDetailError)
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-slate-50 px-4 text-center">
        <h2 className="mb-2 text-xl font-bold text-danger md:text-2xl">
          Đã xảy ra lỗi
        </h2>
        <p className="text-slate-600">{placeDetailError}</p>
      </div>
    );

  const isAuthor = user?.email === place.authorEmail || user?.role === "ADMIN";
  const isFavorite = favoriteIds.includes(place.id);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />

      <main className="-mt-[72px] flex-grow">
        <section className="relative h-[400px] w-full bg-slate-900 md:h-[500px] lg:h-[600px]">
          <img
            src={
              place.coverImageUrl ||
              "https://images.unsplash.com/photo-1554118811-1e0d58224f24"
            }
            alt={place.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>

          <div className="absolute bottom-0 left-0 w-full px-4 pb-12 sm:px-6 md:pb-16 lg:px-8">
            <div className="mx-auto flex max-w-7xl flex-col items-start gap-4">
              <span className="rounded-full border border-white/30 bg-white/20 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md md:text-sm">
                {place.categoryName || "Khám phá"}
              </span>
              <h1 className="max-w-4xl font-heading text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
                {place.title}
              </h1>
            </div>
          </div>

          {isAuthor && (
            <Link
              to={`/edit-place/${placeId}`}
              className="absolute right-4 top-24 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:bg-white md:right-8"
            >
              <Edit3 size={16} />
              Chỉnh sửa
            </Link>
          )}
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
            {/* CỘT TRÁI - CONTENT */}
            <div className="flex flex-col gap-10 md:gap-14 lg:col-span-2">
              {/* NHÓM 1: Thông tin Tác giả & Nguồn */}
              <div className="flex flex-col gap-4 md:gap-5">
                {/* Tác giả */}
                <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm md:p-5">
                  <div className="shrink-0">
                    {place.authorAvatarUrl ? (
                      <img
                        src={place.authorAvatarUrl}
                        alt="Author Avatar"
                        className="h-12 w-12 rounded-full bg-slate-100 object-cover"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-lg font-bold text-white">
                        {(place.authorName || "A").charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Đăng bởi
                    </p>
                    <p className="text-base font-bold text-slate-900">
                      {place.authorFullName ||
                        place.authorName ||
                        "Người ẩn danh"}
                    </p>
                  </div>
                </div>

                {/* Nguồn nội dung */}
                {place.placeSources && place.placeSources.length > 0 && (
                  <div className="flex flex-col gap-3">
                    {place.placeSources.map((source) => (
                      <a
                        key={source.id}
                        href={source.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:border-slate-300 hover:shadow-md md:p-5"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-slate-100 bg-slate-50 font-bold text-slate-900">
                            @
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-500">
                              Tác giả gốc
                            </p>
                            <p className="text-base font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                              {source.creatorUsername}
                            </p>
                          </div>
                        </div>
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-500 transition-colors group-hover:bg-blue-50 group-hover:text-blue-600">
                          <ExternalLink size={18} />
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* NHÓM 2: Giới thiệu */}
              <div>
                <h2 className="mb-4 font-heading text-2xl font-bold tracking-tight text-slate-900">
                  Giới thiệu
                </h2>
                <p className="whitespace-pre-line text-base leading-relaxed text-slate-600 md:text-lg">
                  {place.description ||
                    "Chưa có mô tả chi tiết cho địa điểm này."}
                </p>
              </div>

              {/* NHÓM 3: Hình ảnh nổi bật */}
              {place.placeMediaList && place.placeMediaList.length > 0 && (
                <div>
                  <h2 className="mb-5 font-heading text-2xl font-bold tracking-tight text-slate-900">
                    Hình ảnh nổi bật
                  </h2>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
                    {place.placeMediaList.map((media) => (
                      <div
                        key={media.id}
                        className="group relative aspect-square overflow-hidden rounded-xl bg-slate-100 md:rounded-2xl"
                      >
                        <img
                          src={media.url}
                          alt="Gallery"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* NHÓM 4: Tiện ích */}
              {place.tags && place.tags.length > 0 && (
                <div>
                  <h2 className="mb-4 font-heading text-2xl font-bold tracking-tight text-slate-900">
                    Tiện ích
                  </h2>
                  <div className="flex flex-wrap gap-2.5">
                    {place.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* NHÓM 5: Đánh giá */}
              <div className="border-t border-slate-200 pt-8 md:pt-12">
                <h2 className="mb-6 font-heading text-2xl font-bold tracking-tight text-slate-900 md:mb-8 md:text-3xl">
                  Đánh giá từ cộng đồng{" "}
                  <span className="text-xl font-normal text-slate-400">
                    ({place.reviewCount})
                  </span>
                </h2>
                <ReviewList
                  placeId={place.id}
                  refreshTrigger={refreshTrigger}
                />
              </div>
            </div>

            {/* CỘT PHẢI - SIDEBAR */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 flex flex-col gap-6">
                <div className="flex flex-col gap-5 rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm">
                  {/* Map */}
                  <div className="relative z-0 h-[200px] w-full overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 md:h-[250px]">
                    <MapPicker
                      latitude={place.latitude}
                      longitude={place.longitude}
                    />
                  </div>

                  {/* Địa chỉ */}
                  <div className="flex items-start gap-3.5">
                    <MapPin
                      className="mt-0.5 shrink-0 text-slate-400"
                      size={20}
                    />
                    <p className="leading-relaxed font-medium text-slate-700">
                      {place.address}
                    </p>
                  </div>

                  <button
                    onClick={handleGetDirections}
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
                  >
                    <Navigation size={16} className="text-slate-500" />
                    Mở Google Maps
                  </button>

                  {/* Rating */}
                  <div className="mt-1 flex items-center gap-3">
                    <Star
                      className="shrink-0 fill-slate-900 text-slate-900"
                      size={20}
                    />
                    <p className="text-lg font-bold text-slate-900">
                      {place.avgRating
                        ? `${place.avgRating} / 5.0`
                        : "Chưa có đánh giá"}
                    </p>
                  </div>

                  <div className="my-2 h-px w-full bg-slate-100"></div>

                  {/* Các nút hành động */}
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => withVerified(() => setIsModalOpen(true))}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-slate-800 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
                    >
                      <PenLine size={18} />
                      Viết đánh giá
                    </button>

                    <button
                      onClick={() => withAuth(() => toggleFavorite(place))}
                      className={`
                        flex w-full items-center justify-center gap-2 rounded-full px-4 py-3.5 text-sm font-semibold transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2
                        ${
                          isFavorite
                            ? "border border-slate-200 bg-slate-50 text-slate-900"
                            : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                        }
                      `}
                    >
                      <Heart
                        size={18}
                        className={`transition-all duration-300 ${
                          isFavorite
                            ? "scale-110 fill-slate-900 text-slate-900"
                            : "text-slate-400"
                        }`}
                      />
                      {isFavorite ? "Bỏ lưu địa điểm" : "Lưu địa điểm"}
                    </button>
                  </div>
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
