import { useState } from "react";
import { toast } from "react-toastify";
import profileService from "../services/profileService";
import { useAuthStore } from "@/store";
import { useNavigate } from "react-router-dom";

const useChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const changePassword = async (formData) => {
    try {
      setIsLoading(true);
      const response = await profileService.changePassword(formData);
      toast.success("Đổi mật khẩu thành công!");
      logout();
      navigate("/login");
    } catch (error) {
      const errorMsg = error.response?.data?.message;
      toast(errorMsg);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, changePassword };
};

export default useChangePassword;