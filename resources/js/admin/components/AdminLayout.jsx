import { useState } from 'react';
import Sidebar from './Sidebar';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} md:hidden`}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:block fixed inset-y-0 w-64 bg-white border-r border-gray-200 z-10">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="md:ml-64">
        <button
          className="md:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-gray-800 text-white"
          onClick={() => setSidebarOpen(true)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <main className="p-4 md:p-8 pt-6">
          {children}
        </main>
      </div>
    </div>
  );
}
