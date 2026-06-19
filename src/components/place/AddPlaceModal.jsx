import { useState } from "react";
import placeService from "../../services/placeService";
import "./AddPlaceModal.css";

const AddPlaceModal = ({ isOpen, onClose, onPlaceAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    description: "",
    categoryId: 1,
    userId: 1,
    latitude: 10.8231,
    longitude: 106.6297,
  });

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await placeService.createPlace(formData);
      onPlaceAdded();
      onClose();
      setFormData({ ...formData, title: "", address: "", description: "" });
    } catch (error) {
      alert("Có lỗi xảy ra khi thêm địa điểm: " + error.message);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Thêm địa điểm mới</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tên quán (*)</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Nhập tên địa điểm"
              required
            />
          </div>

          <div className="form-group">
            <label>Địa chỉ (*)</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Ví dụ: 12 Nguyễn Văn Bảo, Gò Vấp"
              required
            />
          </div>

          <div className="form-group">
            <label>Danh mục</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleInputChange}
            >
              <option value={1}>Cà phê</option>
              <option value={2}>Quán nhậu</option>
              <option value={3}>Boardgame</option>
            </select>
          </div>

          <div className="form-group">
            <label>Mô tả thêm</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              placeholder="Chia sẻ trải nghiệm của bạn..."
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Hủy bỏ
            </button>
            <button type="submit" className="btn-submit">
              Lưu địa điểm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPlaceModal;