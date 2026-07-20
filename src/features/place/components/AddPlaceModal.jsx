import { useEffect, useState } from "react";
import placeService from "../services/placeService";
import { categoryService } from "@/features/category";
import geocodeService from "@/services/geocodeService";
import "./AddPlaceModal.css";
import MapPicker from "./MapPicker";
import { tagService } from "@/features/tag";

const AddPlaceModal = ({ isOpen, onClose, onPlaceAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    description: "",
    categoryId: 1,
    userId: 1,
    latitude: null,
    longitude: null,
    tagIds: [],
  });
  const [files, setFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCategory = await categoryService.getAllCategories();
        setCategories(responseCategory);

        const responseTag = await tagService.getAllTags();
        setTags(responseTag);
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
      setFormData({
        ...formData,
        title: "",
        address: "",
        description: "",
        tagIds: [],
      });
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

  const handleSelectTag = (tagId) => {
    setFormData((prev) => {
      const exist = prev.tagIds.includes(tagId);

      return {
        ...prev,
        tagIds: exist
          ? prev.tagIds.filter((id) => id !== tagId)
          : [...prev.tagIds, tagId],
      };
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

          <div className="form-group">
            <label>Tiện ích</label>
            {tags.map((tag) => (
              <button
                type="button"
                key={tag.id}
                className={`btn-tag ${formData.tagIds.includes(tag.id) ? "selected" : ""}`}
                onClick={() => handleSelectTag(tag.id)}
              >
                {tag.name}
              </button>
            ))}
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
