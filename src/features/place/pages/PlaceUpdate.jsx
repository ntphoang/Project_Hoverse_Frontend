import Layout from "@/layouts/Layout";
import { useParams, useNavigate } from "react-router-dom";
import usePlaceUpdate from "../hooks/usePlaceUpdate";
import { useFetchCategories } from "@/features/category";
import MapPicker from "../components/MapPicker";
import { useFetchTags } from "@/features/tag";
import { X, UploadCloud, MapPin, Image as ImageIcon, Loader2 } from "lucide-react";

const PlaceUpdate = () => {
  const { placeId } = useParams();
  const navigate = useNavigate();
  const {
    formData,
    oldImages,
    newFiles,
    isLoading,
    isSubmitting,
    handleInputChange,
    handleToggleTag,
    handleFileChange,
    handleRemoveOldImage,
    handleRemoveNewFile,
    onSelectAddress,
    handleSubmit,
  } = usePlaceUpdate(placeId);
  
  const { categories } = useFetchCategories();
  const { tags } = useFetchTags();

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-50">
          <Loader2 className="w-10 h-10 text-slate-900 animate-spin" />
          <p className="mt-4 font-medium text-slate-600">Đang tải dữ liệu...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50 py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
          
          <header className="px-8 md:px-12 py-10 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
            <h1 className="text-slate-50 text-3xl md:text-4xl font-bold font-heading tracking-tight mb-2">
              Chỉnh sửa địa điểm
            </h1>
            <p className="text-slate-300">
              Cập nhật thông tin chi tiết và hình ảnh cho địa điểm của bạn.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
              
              {/* === CỘT 1: THÔNG TIN CƠ BẢN === */}
              <div className="space-y-8">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-900 ml-1">Tiêu đề</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title || ""}
                    onChange={handleInputChange}
                    placeholder="Nhập tên địa điểm..."
                    className="w-full h-14 px-5 bg-slate-50 border border-slate-200 rounded-full text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-900/10 transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-900 ml-1">Mô tả</label>
                  <textarea
                    name="description"
                    value={formData.description || ""}
                    onChange={handleInputChange}
                    rows="5"
                    placeholder="Mô tả chi tiết về địa điểm này..."
                    className="w-full p-5 bg-slate-50 border border-slate-200 rounded-[1.5rem] text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-900/10 transition-all resize-none"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-900 ml-1 flex items-center gap-2">
                    <MapPin size={16} /> Địa chỉ
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address || ""}
                    onChange={handleInputChange}
                    placeholder="VD: 123 Nguyễn Văn Cừ, Quận 5"
                    className="w-full h-14 px-5 mb-2 bg-slate-50 border border-slate-200 rounded-full text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-900/10 transition-all"
                  />
                  <div className="w-full h-[250px] md:h-[300px] rounded-[1.5rem] overflow-hidden border border-slate-200 shadow-sm relative z-0">
                    <MapPicker
                      latitude={formData.latitude}
                      longitude={formData.longitude}
                      onSelectAddress={onSelectAddress}
                    />
                  </div>
                </div>
              </div>

              {/* === CỘT 2: PHÂN LOẠI & HÌNH ẢNH === */}
              <div className="space-y-8">
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-900 ml-1">Danh mục</label>
                  <div className="relative">
                    <select
                      name="categoryId"
                      value={formData.categoryId || ""}
                      onChange={handleInputChange}
                      className="w-full h-14 px-5 bg-slate-50 border border-slate-200 rounded-full text-slate-900 focus:bg-white focus:outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-900/10 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled>-- Chọn danh mục --</option>
                      {categories?.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-900 ml-1">Tiện ích</label>
                  <div className="flex flex-wrap gap-2.5">
                    {tags?.map((tag) => {
                      const isActive = formData.tagIds?.includes(tag.id);
                      return (
                        <button
                          type="button"
                          key={tag.id}
                          onClick={() => handleToggleTag(tag.id)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-1 ${
                            isActive
                              ? "bg-slate-900 text-white border-slate-900 shadow-md"
                              : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          {tag.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-sm font-semibold text-slate-900 ml-1 flex items-center gap-2">
                    <ImageIcon size={16} /> Thư viện hình ảnh
                  </label>
                  
                  {/* Grid Hình ảnh */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                    {/* Ảnh cũ từ Server */}
                    {oldImages?.map((image) => (
                      <div key={image.id} className="relative aspect-square rounded-2xl overflow-hidden group border border-slate-200 bg-slate-100">
                        <img src={image.url} alt="Cũ" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveOldImage(image.id)}
                          className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-600 hover:text-danger hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <X size={14} strokeWidth={3} />
                        </button>
                      </div>
                    ))}

                    {/* Ảnh mới (Preview) */}
                    {newFiles?.map((file, index) => {
                      const previewUrl = URL.createObjectURL(file);
                      return (
                        <div key={index} className="relative aspect-square rounded-2xl overflow-hidden group border-2 border-primary-500/30 bg-primary-50">
                          <img src={previewUrl} alt="Mới" className="w-full h-full object-cover opacity-90" />
                          <span className="absolute bottom-2 left-2 bg-success text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                            Mới
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveNewFile(index)}
                            className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-600 hover:text-danger hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <X size={14} strokeWidth={3} />
                          </button>
                        </div>
                      );
                    })}

                    {/* Nút Upload Ảnh */}
                    <label className="relative aspect-square rounded-2xl border-2 border-dashed border-slate-300 hover:border-slate-400 bg-slate-50 hover:bg-slate-100 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors text-slate-500 hover:text-slate-700">
                      <UploadCloud size={24} />
                      <span className="text-xs font-semibold">Thêm ảnh</span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        multiple
                        accept="image/*"
                      />
                    </label>
                  </div>
                </div>

              </div>
            </div>

            {/* === FOOTER ACTIONS === */}
            <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4">
              <button 
                type="button" 
                onClick={() => navigate(-1)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
              >
                Hủy bỏ
              </button>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full sm:w-auto px-10 py-3.5 rounded-full text-sm font-semibold text-white bg-black hover:bg-slate-800 shadow-sm transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Đang xử lý...
                  </>
                ) : (
                  "Cập nhật địa điểm"
                )}
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default PlaceUpdate;