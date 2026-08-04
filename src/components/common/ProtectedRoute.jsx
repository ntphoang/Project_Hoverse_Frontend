import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store";

const ProtectedRoute = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" replace="true"></Navigate>;
  }
  return <Outlet />;
};

export default ProtectedRoute;
