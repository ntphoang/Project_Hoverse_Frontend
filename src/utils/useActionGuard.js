import { useAuthStore } from "@/store";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useActionGuard = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  // Yêu cầu login
  const withAuth = (actionFn) => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để thực hiện chức năng này!");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    actionFn();
  };

  // Yêu cầu login + xác thực email
  const withVerified = (actionFn) => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để thực hiện chức năng này!");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    if (!user.isEmailVerified) {
      toast.error("Vui lòng xác thực email để thực hiện chức năng này!");
      return;
    }

    actionFn();
  };

  return { withAuth, withVerified };
};

export default useActionGuard;
