import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/providers/auth-provider";

export function RequireAuth() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
}

export function RequireGuest() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
