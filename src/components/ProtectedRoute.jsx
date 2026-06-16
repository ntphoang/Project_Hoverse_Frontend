import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { user } = useAuth();
  console.log(user);

  if (!user) {
    return <Navigate to="/login" replace="true"></Navigate>;
  }
  return <Outlet />;
};

export default ProtectedRoute;
