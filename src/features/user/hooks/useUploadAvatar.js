import { useState } from "react";
import profileService from "../services/profileService";
import { useAuthStore } from "@/store";
import { toast } from "react-toastify";

const useUploadAvatar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const update = useAuthStore((state) => state.update);

  const handleSubmitUploadAvatar = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      setIsLoading(true);
      const response = await profileService.uploadAvatar(formData);
      update(response);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Có lỗi xảy ra khi upload avatar!";
      toast.error(errorMsg);
    }finally{
        setIsLoading(false);
    }
  };

  return { isLoading, handleSubmitUploadAvatar };
};

export default useUploadAvatar;
