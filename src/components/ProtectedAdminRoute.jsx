import { useEffect } from "react";
import useAuth from "../context/AuthContext";

function ProtectedAdminRoute({ children }) {
  const { getCurrentUser } = useAuth();
  const user = getCurrentUser();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      window.location.href = "/";
    }
  }, [user]);

  return user ? <>{children}</> : null;
}

export default ProtectedAdminRoute;
