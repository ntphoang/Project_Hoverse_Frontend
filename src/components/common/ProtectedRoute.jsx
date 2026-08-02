import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../features/auth/context/AuthContext";

const ProtectedRoute = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace="true"></Navigate>;
  }
  return <Outlet />;
};

export default ProtectedRoute;
