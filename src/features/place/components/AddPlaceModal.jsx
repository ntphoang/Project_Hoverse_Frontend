import { useEffect, useState } from "react";
import placeService from "../services/placeService";
import { categoryService } from "@/features/category";
import geocodeService from "@/services/geocodeService";
import MapPicker from "./MapPicker";
import { tagService } from "@/features/tag";
import { X } from "lucide-react";

const AddPlaceModal = ({ isOpen, onClose, onPlaceAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    description: "",
    categoryId: 1,
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
      const response = await placeService.createPlace(formData, files);
      onPlaceAdded(response);
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm transition-all"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl flex flex-col max-h-[95vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 shrink-0">
          <h2 className="text-xl font-bold font-heading text-slate-900 tracking-tight">
            Thêm địa điểm mới
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto space-y-6 custom-scrollbar">
          <form
            id="add-place-form"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-700 ml-1">
                Tên quán <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="VD: The Coffee House"
                required
                className="w-full h-12 md:h-14 px-5 bg-slate-50 border border-slate-200 rounded-full text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-900/10 transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-700 ml-1">
                Danh mục
              </label>
              <div className="relative">
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  className="w-full h-12 md:h-14 px-5 bg-slate-50 border border-slate-200 rounded-full text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-900/10 transition-all appearance-none cursor-pointer"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
                  <svg
                    className="w-4 h-4 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-700 ml-1">
                Địa chỉ <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Nhập địa chỉ hoặc chọn trên bản đồ"
                required
                className="w-full h-12 md:h-14 px-5 mb-3 bg-slate-50 border border-slate-200 rounded-full text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-900/10 transition-all"
              />
              <div className="w-full h-[250px] md:h-[300px] rounded-[1.5rem] overflow-hidden border border-slate-200 shadow-sm relative z-0">
                <MapPicker
                  latitude={formData.latitude}
                  longitude={formData.longitude}
                  onSelectAddress={onSelectAddress}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-700 ml-1">
                Mô tả thêm
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                placeholder="Chia sẻ trải nghiệm, không gian, hoặc lưu ý về địa điểm này..."
                className="w-full p-5 bg-slate-50 border border-slate-200 rounded-[1.5rem] text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-900/10 transition-all resize-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-700 ml-1">
                Tiện ích
              </label>
              <div className="flex flex-wrap gap-2.5">
                {tags.map((tag) => {
                  const isSelected = formData.tagIds.includes(tag.id);
                  return (
                    <button
                      type="button"
                      key={tag.id}
                      onClick={() => handleSelectTag(tag.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-1 ${
                        isSelected
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

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-700 ml-1">
                Hình ảnh đính kèm
              </label>
              <div className="w-full">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-slate-500 
                    file:mr-4 file:py-3 file:px-6 
                    file:rounded-full file:border-0 
                    file:text-sm file:font-semibold 
                    file:bg-slate-900 file:text-white 
                    hover:file:bg-slate-800 
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/50 
                    transition-all cursor-pointer"
                />
              </div>
            </div>
          </form>
        </div>

        <div className="px-6 py-5 border-t border-slate-100 bg-white shrink-0 flex flex-col-reverse sm:flex-row justify-end gap-3 rounded-b-[2rem]">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 md:py-3.5 rounded-full text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
          >
            Hủy bỏ
          </button>
          <button
            type="submit"
            form="add-place-form"
            className="w-full sm:w-auto px-8 py-3 md:py-3.5 rounded-full text-sm font-medium text-white bg-black hover:bg-slate-800 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
          >
            Lưu địa điểm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPlaceModal;
