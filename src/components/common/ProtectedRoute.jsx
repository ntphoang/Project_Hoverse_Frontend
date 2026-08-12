import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store";
import { useEffect } from "react";
import { toast } from "react-toastify";

const ProtectedRoute = ({
  requireVerified = false,
  requireIsAdmin = false,
}) => {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  // Chưa login
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      ></Navigate>
    );
  }

  // Chưa xác thực email
  if (requireVerified && !user.isEmailVerified) {
    useEffect(() => {
      toast.error("Trang này yêu cầu tài khoản phải xác thực email!");
    }, []);

    return <Navigate to="/" replace></Navigate>;
  }

  // Yêu cầu quyền Admin
  if (requireIsAdmin && user.role !== "ADMIN") {
    return <Navigate to="/"></Navigate>;
  }

  return <Outlet />;
};

export default ProtectedRoute;
