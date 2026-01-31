import { Navigate, useLocation } from "react-router-dom";
import { getCurrentUser } from "./services/auth.service";

export default function AdminGuard({ children }) {
  const currentUser = getCurrentUser();
  const location = useLocation();

  if (!currentUser || !currentUser.token) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  // Check if token has expired, but be safe with the expiresAt value
 if (currentUser.expiresAt) {
    try {
      const expiresAt = Number(currentUser.expiresAt);
      if (isNaN(expiresAt)) {
        console.error('Invalid expiresAt value in token');
        sessionStorage.clear();
        return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
      }

      if (Date.now() / 1000 > expiresAt) {
        sessionStorage.clear();
        return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
      }
    } catch (e) {
      console.error('Error checking token expiration:', e);
      sessionStorage.clear();
      return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
    }
  } else {
    // If there's no expiration time, we'll assume the token is valid
    // In a real implementation, you might want to validate the token with the server
  }

  return children;
}
