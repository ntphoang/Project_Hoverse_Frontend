import React, { useState, useEffect } from "react";
import { AddPlaceModal, PlaceItem, usePlaces } from "@/features/place";
import Layout from "@/layouts/Layout";
import { useNavigate } from "react-router-dom";
import IconDictionary from "@/components/ui/IconDictionary";
import { Search, Plus, Loader2, Sparkles, SlidersHorizontal } from "lucide-react";

const Home = () => {
  const {
    places,
    categories,
    draftFilter,
    appliedFilter,
    loading,
    hasMore,
    setDraftFilter,
    handleSearch,
    handleReadMore,
    handleSelectCategory,
    handlePlaceAdded,
  } = usePlaces();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Quản lý tiêu đề trang an toàn
  useEffect(() => {
    document.title = "Khám phá địa điểm | Hoverse";
  }, []);

  return (
    <Layout>
      <main className="min-h-screen bg-slate-50 py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10 md:space-y-12">
          
          {/* === HERO SECTION === */}
          <section className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-[2rem] p-8 md:p-14 overflow-hidden shadow-sm flex flex-col items-start gap-4">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
            
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border border-white/20">
              <Sparkles size={14} className="text-primary-400" />
              <span>Nền tảng đánh giá hàng đầu</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold font-heading tracking-tight max-w-2xl leading-tight">
              Khám phá thế giới quanh bạn
            </h1>
            
            <p className="text-slate-300 text-base md:text-lg max-w-xl font-normal leading-relaxed">
              Tìm kiếm hàng ngàn quán cà phê, trà sữa và địa điểm vui chơi lý tưởng được đánh giá bởi cộng đồng.
            </p>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="mt-2 px-8 py-3.5 bg-white text-slate-900 font-semibold text-sm rounded-full shadow-md hover:bg-slate-100 hover:scale-[1.02] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white flex items-center gap-2 group cursor-pointer"
            >
              <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
              Thêm địa điểm mới
            </button>
          </section>

          {/* === LỌC NHANH (CATEGORY SCROLL) === */}
          <section className="w-full">
            <div className="flex items-center gap-3 overflow-x-auto pb-3 pt-1 no-scrollbar">
              {categories?.map((cat) => {
                const isActive = appliedFilter.categoryId === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleSelectCategory(cat.id)}
                    className={`flex items-center gap-2.5 px-5 py-3 rounded-full text-sm font-medium shrink-0 transition-all duration-200 border cursor-pointer ${
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

          {/* === THANH TÌM KIẾM & LỌC === */}
          <section className="bg-white p-4 md:p-6 rounded-[2rem] border border-slate-200 shadow-sm">
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-center">
              
              {/* Input tìm kiếm tiêu đề */}
              <div className="relative flex-1 w-full">
                <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  className="w-full h-13 pl-12 pr-5 bg-slate-50 border border-slate-200 rounded-full text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-900/10 transition-all text-sm font-medium"
                  placeholder="Nhập tên địa điểm cần tìm..."
                  value={draftFilter.title || ""}
                  onChange={(e) =>
                    setDraftFilter((prev) => ({ ...prev, title: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                />
              </div>

              {/* Select lọc Rating */}
              <div className="relative w-full md:w-64">
                <SlidersHorizontal size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <select
                  className="w-full h-13 pl-12 pr-10 bg-slate-50 border border-slate-200 rounded-full text-slate-900 focus:bg-white focus:outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-900/10 transition-all appearance-none cursor-pointer text-sm font-medium"
                  name="rating"
                  value={draftFilter.minRating || ""}
                  onChange={(e) =>
                    setDraftFilter((prev) => ({ ...prev, minRating: e.target.value }))
                  }
                >
                  <option value="">Tất cả đánh giá</option>
                  <option value="4">Từ 4⭐ trở lên</option>
                  <option value="3">Từ 3⭐ trở lên</option>
                  <option value="2">Từ 2⭐ trở lên</option>
                  <option value="1">Từ 1⭐ trở lên</option>
                </select>
                <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Nút Tìm kiếm */}
              <button
                type="button"
                className="w-full md:w-auto px-8 h-13 bg-slate-900 text-white font-semibold text-sm rounded-full shadow-sm hover:bg-slate-800 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 disabled:opacity-70 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                onClick={handleSearch}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin text-white" />
                    <span>Đang tìm...</span>
                  </>
                ) : (
                  <span>Tìm kiếm</span>
                )}
              </button>
            </div>
          </section>

          {/* === DANH SÁCH QUÁN VÀ TRẠNG THÁI TRỐNG === */}
          <section className="w-full">
            {places.length === 0 && !loading ? (
              <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-[2rem] border border-slate-200 shadow-sm text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-2xl mb-4">
                  🔍
                </div>
                <h3 className="font-heading font-bold text-slate-900 text-lg mb-1">
                  Không tìm thấy kết quả
                </h3>
                <p className="text-slate-500 text-sm max-w-sm">
                  Không tìm thấy địa điểm nào phù hợp với yêu cầu của bạn. Hãy thử thay đổi từ khóa hoặc bộ lọc nhé!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {places.map((place) => (
                  <PlaceItem
                    key={place.id}
                    place={place}
                    onClick={() => navigate(`/places/${place.id}`)}
                  />
                ))}
              </div>
            )}
          </section>

          {/* === NÚT XEM THÊM === */}
          {hasMore && places.length > 0 && (
            <div className="flex justify-center pt-4">
              <button
                type="button"
                className="w-full sm:w-auto min-w-[220px] px-8 py-3.5 bg-white text-slate-700 font-semibold text-sm rounded-full border border-slate-200 shadow-sm hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group cursor-pointer"
                onClick={handleReadMore}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin text-slate-400" />
                    <span>Đang tải thêm dữ liệu...</span>
                  </>
                ) : (
                  <>
                    <span>Xem thêm địa điểm</span>
                    <svg 
                      className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
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