import { Navigate } from "react-router-dom";
import { hasPermission } from "../utils/permissions";

export default function ProtectedRoute({ children, permission }) {
  // Check if user has the required permission
  const hasRequiredPermission = hasPermission(permission);

  if (!hasRequiredPermission) {
    // Redirect to dashboard or show unauthorized page
    return <Navigate to="/admin" replace />;
  }

  return children;
}
