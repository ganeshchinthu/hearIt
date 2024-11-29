import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { getCurrentUser } = useAuth();
  const user = getCurrentUser();

  useEffect(() => {
    if (!user) {
      navigate("/userlogin");
    }
  }, [user, navigate]);

  return user ? <>{children}</> : null;
}

export default ProtectedRoute;
