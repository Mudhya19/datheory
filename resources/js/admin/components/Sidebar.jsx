import { Link, useLocation } from 'react-router-dom';
import { logout, getCurrentUser } from '../services/auth.service';

// Define navigation items with required permissions
const navigationItems = [
  {
    path: '/admin',
    label: 'Dashboard',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-1l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    permissions: ['dashboard.view']
  },
  {
    path: '/admin/projects',
    label: 'Projects',
    icon: 'M19 1H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 1V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    permissions: ['projects.view']
  },
  {
    path: '/admin/skills',
    label: 'Skills',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    permissions: ['skills.view']
  },
  {
    path: '/admin/profile',
    label: 'Profile',
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    permissions: ['profile.view']
  },
  {
    path: '/admin/users',
    label: 'Users',
    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 0-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 0 015 0z',
    permissions: ['users.view']
  }
];

export default function Sidebar({ onClose }) {
  const location = useLocation();
  const currentUser = getCurrentUser();

  // Check if user has permission for a specific navigation item
  const hasPermission = (permissions) => {
    if (!currentUser || !currentUser.user || !currentUser.user.permissions) return false;

    // Check if user has wildcard permission
    if (currentUser.user.permissions.includes('*')) return true;

    // Check if user has any of the required permissions
    return permissions.some(permission => currentUser.user.permissions.includes(permission));
  };

  // Filter navigation items based on user permissions
 const allowedNavigationItems = navigationItems.filter(item => hasPermission(item.permissions));

  const handleClick = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (!currentUser) {
    return null; // Don't render sidebar if not authenticated
  }

  if (!currentUser.user) {
    console.error('Sidebar: currentUser exists but user data is missing');
    return null; // Don't render sidebar if user data is missing
  }

  return (
    <div className="h-full flex flex-col bg-gray-900 text-white">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold text-white">Admin Panel</h1>
        <div className="mt-2 text-sm text-gray-300">
          <p>{currentUser.user.name}</p>
          <p className="text-xs text-gray-400">{currentUser.user.role_display_name}</p>
        </div>
      </div>

      <nav className="flex-1 px-2 py-4">
        <ul className="space-y-1">
          {allowedNavigationItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                onClick={handleClick}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <svg
                  className="mr-3 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={item.icon}
                  />
                </svg>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-900 hover:text-white rounded-md transition-colors"
        >
          <svg
            className="mr-3 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
}
