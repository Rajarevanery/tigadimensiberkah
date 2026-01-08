import { Outlet, useNavigate } from "react-router";
import { useAuth } from "../context/use-auth";

export default function ProtectedRoute() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : navigate('/login') ;
}
