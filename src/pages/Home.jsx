import React, { useState, useEffect } from "react";
import {
  AddPlaceModal,
  PlaceItem,
  useFetchFavorites,
  useFetchPlaces,
  usePlaceFilter,
} from "@/features/place";
import { useFetchCategories } from "@/features/category";
import { useFetchTags } from "@/features/tag";
import Layout from "@/layouts/Layout";
import { useNavigate } from "react-router-dom";
import IconDictionary from "@/components/ui/IconDictionary";
import { Search, Plus, Loader2, Sparkles, Check } from "lucide-react";

const Home = () => {
  useFetchFavorites();
  const { categories } = useFetchCategories();
  const { tags } = useFetchTags();
  const {
    appliedFilter,
    draftFilter,
    setDraftFilter,
    handleSearch,
    handleSelectCategory,
    handleToggleTag,
    handleSelectSort,
    handleSelectMinRating,
  } = usePlaceFilter();

  const { places, isLoading, hasMore, handleReadMore, handlePlaceAdded } =
    useFetchPlaces(appliedFilter);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Khám phá địa điểm | Hoverse";
  }, []);

  return (
    <Layout>
      <main className="min-h-screen bg-slate-50 py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">
          {/* === 1. HERO SECTION === */}
          <section className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-[2rem] p-8 md:p-14 overflow-hidden shadow-sm flex flex-col items-start gap-4">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase border border-white/20">
              <Sparkles size={14} className="text-primary-400" />
              <span>Nền tảng đánh giá hàng đầu</span>
            </div>

            <h1 className="text-3xl text-white md:text-5xl font-bold font-heading tracking-tight max-w-2xl leading-tight">
              Khám phá thế giới quanh bạn
            </h1>

            <p className="text-slate-300 text-base md:text-lg max-w-xl font-normal leading-relaxed">
              Tìm kiếm hàng ngàn quán cà phê, trà sữa và địa điểm vui chơi lý
              tưởng được đánh giá bởi cộng đồng.
            </p>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="mt-4 px-8 py-3.5 bg-white text-slate-900 font-semibold text-sm rounded-full shadow-md hover:bg-slate-100 hover:scale-[1.02] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white flex items-center gap-2 group cursor-pointer"
            >
              <Plus
                size={18}
                className="group-hover:rotate-90 transition-transform duration-300"
              />
              Thêm địa điểm mới
            </button>
          </section>

          {/* === 2. LỌC CHÍNH: CATEGORIES === */}
          <section className="w-full">
            <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
              {[
                { id: null, name: "Tất cả", iconName: "All" },
                ...(categories || []),
              ].map((cat) => {
                const isActive = appliedFilter.categoryId === cat.id;
                return (
                  <button
                    key={cat.id || "all"}
                    type="button"
                    onClick={() => handleSelectCategory(cat.id)}
                    className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-medium shrink-0 transition-all duration-300 border cursor-pointer ${
                      isActive
                        ? "bg-slate-900 text-white border-slate-900 shadow-md scale-105"
                        : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-sm"
                    }`}
                  >
                    <IconDictionary
                      iconName={cat.iconName}
                      className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-500"}`}
                    />
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* === 3. CONTROL CENTER: TÌM KIẾM & LỌC PHỤ === */}
          <section className="bg-white p-4 md:p-6 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col gap-5">
            {/* Hàng 1: Inputs & Button */}
            <div className="flex flex-col md:flex-row gap-3 items-center">
              <div className="relative flex-1 w-full">
                <Search
                  size={18}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  className="w-full h-12 pl-12 pr-5 bg-slate-50 border border-slate-200 rounded-full text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-900/10 transition-all text-sm font-medium"
                  placeholder="Nhập tên địa điểm cần tìm..."
                  value={draftFilter.title || ""}
                  onChange={(e) =>
                    setDraftFilter((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                />
              </div>

              <div className="flex w-full md:w-auto gap-3">
                <select
                  className="h-12 px-5 bg-slate-50 border border-slate-200 rounded-full text-slate-700 focus:outline-none focus:bg-white text-sm font-medium cursor-pointer flex-1 md:flex-none md:w-40 appearance-none"
                  value={appliedFilter.minRating || ""}
                  onChange={(e) => handleSelectMinRating(e.target.value)}
                >
                  <option value="">Tất cả sao</option>
                  <option value="4">Từ 4⭐ trở lên</option>
                  <option value="3">Từ 3⭐ trở lên</option>
                </select>

                <select
                  className="h-12 px-5 bg-slate-50 border border-slate-200 rounded-full text-slate-700 focus:outline-none focus:bg-white text-sm font-medium cursor-pointer flex-1 md:flex-none md:w-40 appearance-none"
                  value={appliedFilter.sort || "createdAt,desc"}
                  onChange={(e) => handleSelectSort(e.target.value)}
                >
                  <option value="createdAt,desc">Mới nhất</option>
                  <option value="createdAt,asc">Cũ nhất</option>
                  <option value="avgRating,desc">Đánh giá cao</option>
                </select>

                <button
                  type="button"
                  className="h-12 px-6 md:px-8 bg-slate-900 text-white font-semibold text-sm rounded-full shadow-sm hover:bg-slate-800 transition-all focus-visible:outline-none flex items-center justify-center gap-2 shrink-0 disabled:opacity-70 cursor-pointer"
                  onClick={handleSearch}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 size={16} className="animate-spin text-white" />
                  ) : (
                    <Search size={16} />
                  )}
                  <span className="hidden md:inline">Tìm</span>
                </button>
              </div>
            </div>

            {/* Hàng 2: TAGS */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
              <span className="text-sm font-semibold text-slate-500 mr-2 shrink-0">
                Tiện ích:
              </span>
              {tags?.map((tag) => {
                const isActive = appliedFilter.tags?.includes(tag.id);
                return (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => handleToggleTag(tag.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs transition-all duration-200 border cursor-pointer select-none shrink-0 ${
                      isActive
                        ? "bg-slate-50 text-slate-900 border-slate-900 font-bold shadow-sm"
                        : "bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50 font-medium"
                    }`}
                  >
                    {isActive && (
                      <Check
                        size={14}
                        strokeWidth={3}
                        className="text-slate-900"
                      />
                    )}
                    <span>{tag.name}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* === 4. DANH SÁCH QUÁN === */}
          <section className="w-full">
            {places?.length === 0 && !isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 px-4 bg-white rounded-[2rem] border border-slate-200 shadow-sm text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-2xl mb-4">
                  🔍
                </div>
                <h3 className="font-heading font-bold text-slate-900 text-lg mb-1">
                  Không tìm thấy kết quả
                </h3>
                <p className="text-slate-500 text-sm max-w-sm">
                  Không tìm thấy địa điểm nào phù hợp với yêu cầu. Hãy thử thay
                  đổi bộ lọc nhé!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {places?.map((place) => (
                  <PlaceItem
                    key={place.id}
                    place={place}
                    onClick={() => navigate(`/places/${place.id}`)}
                  />
                ))}
              </div>
            )}
          </section>

          {/* === 5. NÚT XEM THÊM === */}
          {hasMore && places?.length > 0 && (
            <div className="flex justify-center pt-2 pb-8">
              <button
                type="button"
                className="w-full sm:w-auto min-w-[220px] px-8 py-3.5 bg-white text-slate-700 font-semibold text-sm rounded-full border border-slate-200 shadow-sm hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 flex items-center justify-center gap-2 group cursor-pointer"
                onClick={handleReadMore}
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
                    <Plus
                      size={16}
                      className="text-slate-400 group-hover:text-slate-600 transition-colors"
                    />
                  </>
                )}
              </button>
            </div>
          )}

          {/* Modal Thêm địa điểm */}
          <AddPlaceModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onPlaceAdded={handlePlaceAdded}
          />
        </div>
      </main>
    </Layout>
  );
};

export default Home;
