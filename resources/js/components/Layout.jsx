import { Outlet, useLocation, Link } from "react-router-dom";

export default function Layout() {
  const location = useLocation();

  // Function to check if link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-gray-800/90 backdrop-blur-sm py-4 px-6 border-b border-gray-700">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent focus:outline-none focus:ring-2 focus:ring-green-500/50 rounded">
            Datheory
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50 rounded ${
                isActive("/")
                  ? "text-green-400 font-medium"
                  : "text-gray-300 hover:text-green-400"
              }`}
            >
              Home
            </Link>
            <Link
              to="/projects"
              className={`transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50 rounded ${
                isActive("/projects")
                  ? "text-green-400 font-medium"
                  : "text-gray-300 hover:text-green-400"
              }`}
            >
              Projects
            </Link>
            <Link
              to="/skills"
              className={`transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50 rounded ${
                isActive("/skills")
                  ? "text-green-400 font-medium"
                  : "text-gray-300 hover:text-green-400"
              }`}
            >
              Skills
            </Link>
            <Link
              to="/about"
              className={`transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50 rounded ${
                isActive("/about")
                  ? "text-green-400 font-medium"
                  : "text-gray-300 hover:text-green-400"
              }`}
            >
              About
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500/50 rounded p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800/90 backdrop-blur-sm py-8 px-4 border-t border-gray-700 mt-12">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="text-lg font-semibold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Datheory
              </div>
              <p className="text-gray-400 text-sm mt-1">
                Data Science & Machine Learning Enthusiast
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50 rounded p-2">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded p-2">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Datheory. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
