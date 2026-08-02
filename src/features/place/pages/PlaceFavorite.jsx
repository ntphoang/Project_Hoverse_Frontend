import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Loader2, Heart, Search, ArrowRight } from "lucide-react";
import useFetchFavorites from "../hooks/useFetchFavorites";
import PlaceItem from "../components/PlaceItem";
import Layout from "@/layouts/Layout";
import { useFavoritesStore } from "@/store";

const PlaceFavorite = () => {
  const { favorites, isLoading, error, hasMore, handleHasMore } =
    useFetchFavorites();
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Địa điểm yêu thích | Hoverse";
  }, []);

  if (error) {
    return (
      <Layout>
        <main className="min-h-screen bg-slate-50 py-8 md:py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="bg-white border border-red-100 p-8 rounded-[2rem] shadow-sm flex flex-col items-center text-center gap-4 max-w-md w-full">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-bold text-slate-900 tracking-tight">
                Đã xảy ra lỗi
              </h2>
              <p className="text-base text-slate-500 mt-2">{error}</p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-8 py-3 bg-slate-900 text-white rounded-full text-sm font-semibold hover:bg-slate-800 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 cursor-pointer"
            >
              Thử lại ngay
            </button>
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="min-h-screen bg-slate-50 py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">
          {/* === 2. PAGE HEADER SECTION === */}
          <section className="bg-white rounded-[2rem] p-6 md:p-10 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 bg-accent-50 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase border border-accent-100 text-accent-600 mb-2 w-fit">
                <Heart size={14} className="fill-accent-500" />
                <span>Bộ sưu tập cá nhân</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 tracking-tight">
                Địa điểm yêu thích
              </h1>
              <p className="text-slate-500 text-base md:text-lg max-w-xl">
                Lưu giữ những góc quán quen thuộc và những địa điểm bạn dự định
                sẽ ghé thăm.
              </p>
            </div>

            <div className="hidden md:flex items-center justify-center w-24 h-24 bg-slate-50 rounded-full border border-slate-100 shrink-0">
              <span className="text-3xl font-heading font-bold text-slate-700">
                {favoriteIds?.length || 0}
              </span>
            </div>
          </section>

          {/* === 3. DANH SÁCH QUÁN === */}
          <section className="w-full">
            {favorites?.length === 0 && !isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 px-4 bg-white rounded-[2rem] border border-slate-200 shadow-sm text-center">
                <div className="w-16 h-16 bg-accent-50 rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-accent-300" />
                </div>
                <h3 className="font-heading font-bold text-slate-900 text-lg mb-2">
                  Bạn chưa lưu địa điểm nào
                </h3>
                <p className="text-slate-500 text-sm max-w-sm mb-6">
                  Hãy quay lại trang chủ, lướt tìm những quán ưng ý và nhấn biểu
                  tượng trái tim để lưu lại nhé.
                </p>
                <button
                  onClick={() => navigate("/")}
                  className="px-8 py-3 bg-slate-900 text-white rounded-full text-sm font-semibold hover:bg-slate-800 transition-all flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                >
                  <Search size={16} />
                  Khám phá ngay
                </button>
              </div>
            ) : (
              /* GRID LIST */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {favorites?.map((place) => (
                  <PlaceItem
                    key={place.id}
                    place={place}
                    onClick={() => navigate(`/places/${place.id}`)}
                  />
                ))}
              </div>
            )}
          </section>

          {/* === 4. NÚT XEM THÊM === */}
          {hasMore && favorites?.length > 0 && (
            <div className="flex justify-center pt-2 pb-8">
              <button
                type="button"
                className="w-full sm:w-auto min-w-[220px] px-8 py-3.5 bg-white text-slate-700 font-semibold text-sm rounded-full border border-slate-200 shadow-sm hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 flex items-center justify-center gap-2 group cursor-pointer"
                onClick={handleHasMore}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin text-slate-400"
                    />
                    <span>Đang tải thêm...</span>
                  </>
                ) : (
                  <>
                    <span>Xem thêm địa điểm</span>
                    <ArrowRight
                      size={16}
                      className="text-slate-400 group-hover:text-slate-600 transition-colors"
                    />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default PlaceFavorite;
