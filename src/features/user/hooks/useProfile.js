import { useEffect, useState } from "react";
import profileService from "../services/profileService";

const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await profileService.getUserProfile();
      setProfile(response);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Đã xảy ra lỗi khi tải thông tin cá nhân!";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return { profile, isLoading, error };
};

export default useProfile;
