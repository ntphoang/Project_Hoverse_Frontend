import { useEffect, useState } from "react";
import verifyService from "../services/verifyService";
import { toast } from "react-toastify";

const useResendVerify = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [countdown, setCountDown] = useState(0);

  // Chống spam gửi mail
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  // Hàm gửi lại mail xác thực
  const resendVerify = async () => {
    if (countdown > 0 || isLoading) return;
    try {
      setIsLoading(true);
      setError(null);
      const response = await verifyService.resendVerify();
      setCountDown(60);
      toast.success("Đã gửi mail xác thực, vui lòng kiểm tra hộp thư!");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Có lỗi xảy ra khi gửi email xác thực";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return { resendVerify, countdown, isLoading, error };
};

export default useResendVerify;
