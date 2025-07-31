import { Navigate } from "react-router-dom";
import { getToken, getUserFromToken } from "../Utils/Auth";

const ProtectedRoute = ({ children, role }) => {
  const token = getToken();
  const user = getUserFromToken();

  if (!token) return <Navigate to="/login" />;

  if (role && user?.role !== role) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
