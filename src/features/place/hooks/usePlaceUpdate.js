import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import placeService from "../services/placeService";
import geocodeService from "@/services/geocodeService";

const usePlaceUpdate = (placeId) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    address: "",
    latitude: 0,
    longitude: 0,
    description: "",
    categoryId: "",
    tagIds: [],
  });

  const [oldImages, setOldImages] = useState([]);
  const [newFiles, setNewFiles] = useState([]);

  useEffect(() => {
    if (!placeId) return;

    const fetchOldData = async () => {
      try {
        setIsLoading(true);
        const response = await placeService.getPlaceDetail(placeId);
        console.log(response);

        setFormData({
          title: response.title || "",
          address: response.address || "",
          longitude: response.longitude || 0,
          latitude: response.latitude || 0,
          description: response.description || "",
          categoryId: response.categoryId || "",
          tagIds: response.tags?.map((tag) => tag.id) || [],
        });
        setOldImages(response.placeMediaList || []);
      } catch (error) {
        console.error("Lỗi tải thông tin", error);
        alert("Không thể tải thông tin địa điểm!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOldData();
  }, [placeId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setNewFiles((prev) => [...prev, ...files]);
  };

  const handleRemoveOldImage = (idToRemove) => {
    setOldImages((prev) => prev.filter((img) => img.id !== idToRemove));
  };

  const handleRemoveNewFile = (indexToRemove) => {
    setNewFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const onSelectAddress = async (latitude, longitude) => {
    const response = await geocodeService.reverseGeocode(latitude, longitude);
    setFormData((prev) => ({
      ...prev,
      latitude,
      longitude,
      address: response.displayName,
    }));
  };

  const handleToggleTag = (tagId) => {
    setFormData((prev) => {
      const existed = prev.tagIds.includes(tagId);

      if (existed) {
        return {
          ...prev,
          tagIds: prev.tagIds.filter((id) => id !== tagId),
        };
      }

      return { ...prev, tagIds: [...prev.tagIds, tagId] };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.address) {
      alert("Vui lỏng nhập đầy đủ các trường bắt buộc (*)");
      return;
    }

    try {
      setIsSubmitting(true);
      const submitData = new FormData();

      const placePayload = {
        ...formData,
        placeMediaIds: oldImages.map((img) => img.id),
      };

      submitData.append(
        "place",
        new Blob([JSON.stringify(placePayload)], { type: "application/json" }),
      );

      newFiles.forEach((file) => {
        submitData.append("files", file);
      });

      await placeService.updatePlace(placeId, submitData);
      alert("Cập nhật thành công!");
      navigate(`/places/${placeId}`);
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
      alert("Có lỗi xảy ra khi lưu: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    oldImages,
    newFiles,
    isLoading,
    isSubmitting,
    handleInputChange,
    handleFileChange,
    handleRemoveOldImage,
    handleRemoveNewFile,
    onSelectAddress,
    handleToggleTag,
    handleSubmit,
  };
};

export default usePlaceUpdate;
