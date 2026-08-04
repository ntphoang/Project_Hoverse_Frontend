import { useEffect, useRef, useState } from "react";
import verifyService from "../services/verifyService";

const useVerifyEmail = (token) => {
  const [isVerify, setIsVerify] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const callOnce = useRef(false);

  useEffect(() => {
    if(callOnce.current)return;
    callOnce.current = true;

    if(!token){
      setError("Không tìm thấy token trên đường dẫn!");
      setIsLoading(false);
      return;
    }

    const verifyEmail = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await verifyService.verifyEmail(token);
        setIsVerify(true);
      } catch (err) {
        setError("Có lỗi xảy ra khi xác thực email: " + err);
      } finally {
        setIsLoading(false);
      }
    };

    verifyEmail();
  }, [token]);

  return { isVerify, isLoading, error };
};

export default useVerifyEmail;
