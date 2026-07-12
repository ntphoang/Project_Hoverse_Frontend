import { useEffect, useState } from "react";
import placeService from "../services/placeService";
import {categoryService} from "@/features/category";
import geocodeService from "@/services/geocodeService";
import "./AddPlaceModal.css";
import MapPicker from "./MapPicker";

const AddPlaceModal = ({ isOpen, onClose, onPlaceAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    description: "",
    categoryId: 1,
    userId: 1,
    latitude: null,
    longitude: null,
  });
  const [files, setFiles] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await categoryService.getAllCategories();
        setCategories(response);
      } catch (error) {
        console.error("Lỗi khi load data:" + error.message);
      }
    };
    fetchData();
  }, []);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await placeService.createPlace(formData, files);
      onPlaceAdded();
      onClose();
      setFormData({ ...formData, title: "", address: "", description: "" });
    } catch (error) {
      alert("Có lỗi xảy ra khi thêm địa điểm: " + error.message);
    }
  };

  const onSelectAddress = async (latitude, longitude) => {
    const response = await geocodeService.reverseGeocode(latitude, longitude);
    console.log(response);

    setFormData({
      ...formData,
      latitude: latitude,
      longitude: longitude,
      address: response.displayName,
    });
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
            <div>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Nhập địa chỉ"
              />
              <MapPicker
                latitude={formData.latitude}
                longitude={formData.longitude}
                onSelectAddress={onSelectAddress}
              ></MapPicker>
            </div>
          </div>

          <div className="form-group">
            <label>Danh mục</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleInputChange}
            >
              {categories.map((category) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                );
              })}
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

          <div className="form-group">
            <label>Tệp đính kèm</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
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
