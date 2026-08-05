import { useState } from "react";
import profileService from "../services/profileService";
import { useAuthStore } from "@/store";
import { toast } from "react-toastify";

const useUpdateUserProfile = () => {
  const update = useAuthStore(state=>state.update)
  const [isLoading, setIsLoading] = useState(false);

  const updateUserProfile = async (formData) => {
    try {
      setIsLoading(true);
      const response = await profileService.updateUserProfile(formData);
      update(response);
      toast.success("Cập nhật thông tin cá nhân thành công!");
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        "Có lỗi xảy ra khi cập nhật thông tin!";
      toast.error(errorMsg)
    } finally {
      setIsLoading(false);
    }
  };

  return { updateUserProfile, isLoading };
};

export default useUpdateUserProfile;
