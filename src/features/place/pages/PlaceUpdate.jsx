import Layout from "@/layouts/Layout";
import { useParams, useNavigate } from "react-router-dom";
import usePlaceUpdate from "../hooks/usePlaceUpdate";
import { useFetchCategories } from "@/features/category";
import MapPicker from "../components/MapPicker";
import { useFetchTags } from "@/features/tag";
import "./PlaceUpdate.css"; // Nhớ import file CSS nhé!

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
        <div className="loading-container">
          <h2>Đang tải dữ liệu...</h2>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="place-update-wrapper">
        <header className="place-update-header">
          <h1>Chỉnh sửa địa điểm</h1>
          <p>Cập nhật thông tin chi tiết cho địa điểm của bạn</p>
        </header>

        <form className="place-update-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* CỘT 1: Thông tin cơ bản */}
            <div className="form-column">
              <div className="form-group">
                <label>Tiêu đề</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.title}
                  name="title"
                  onChange={handleInputChange}
                  placeholder="Nhập tên địa điểm..."
                />
              </div>

              <div className="form-group">
                <label>Mô tả</label>
                <textarea
                  className="form-input textarea"
                  value={formData.description}
                  name="description"
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Mô tả chi tiết về địa điểm này..."
                />
              </div>

              <div className="form-group">
                <label>Địa chỉ</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.address}
                  name="address"
                  onChange={handleInputChange}
                  placeholder="VD: 123 Nguyễn Văn Cừ, Quận 5"
                />
              </div>

              <div className="form-group map-container">
                <label>Vị trí trên bản đồ</label>
                <MapPicker
                  latitude={formData.latitude}
                  longitude={formData.longitude}
                  onSelectAddress={onSelectAddress}
                />
              </div>
            </div>

            {/* CỘT 2: Phân loại & Hình ảnh */}
            <div className="form-column">
              <div className="form-group">
                <label>Danh mục</label>
                <select
                  className="form-input"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>-- Chọn danh mục --</option>
                  {categories?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Tiện ích</label>
                <div className="tags-container">
                  {tags?.map((tag) => {
                    // Logic xác định xem tag đã được chọn chưa
                    const isActive = formData.tagIds.includes(tag.id);
                    return (
                      <button
                        type="button"
                        key={tag.id}
                        className={`tag-btn ${isActive ? "active" : ""}`}
                        onClick={() => handleToggleTag(tag.id)}
                      >
                        {tag.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="form-group">
                <label>Hình ảnh</label>
                <div className="image-gallery">
                  {/* Ảnh cũ từ Server */}
                  {oldImages?.map((image) => (
                    <div className="image-item" key={image.id}>
                      <img src={image.url} alt="Cũ" />
                      <button
                        type="button"
                        className="btn-remove-img"
                        onClick={() => handleRemoveOldImage(image.id)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}

                  {/* Ảnh mới chuẩn bị Upload */}
                  {newFiles.map((file, index) => {
                    const previewUrl = URL.createObjectURL(file);
                    return (
                      <div className="image-item new-item" key={index}>
                        <img src={previewUrl} alt="Mới" />
                        <span className="badge-new">Mới</span>
                        <button
                          type="button"
                          className="btn-remove-img"
                          onClick={() => handleRemoveNewFile(index)}
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })}
                </div>
                
                <div className="file-upload-wrapper">
                  <input
                    type="file"
                    id="file-upload"
                    className="file-input-hidden"
                    onChange={handleFileChange}
                    multiple
                    accept="image/*"
                  />
                  <label htmlFor="file-upload" className="btn-upload">
                    + Thêm ảnh mới
                  </label>
                </div>
              </div>
            </div>
          </div>

          <footer className="form-actions">
            <button 
              type="button" 
              className="btn-secondary" 
              onClick={() => navigate(-1)}
            >
              Hủy
            </button>
            <button 
              type="submit" 
              className="btn-primary" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Đang xử lý..." : "Cập nhật địa điểm"}
            </button>
          </footer>
        </form>
      </div>
    </Layout>
  );
};

export default PlaceUpdate;