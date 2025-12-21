import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/admin/login";
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">Admin Dashboard</div>
          <div className="flex items-center space-x-4">
            <Link
              to="/admin/projects"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Projects
            </Link>
            <Link
              to="/admin/profile"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Profile
            </Link>
            <Link
              to="/admin/skills"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Skills
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
