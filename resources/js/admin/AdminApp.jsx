import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingIndicator from './components/LoadingIndicator';

export default function AdminApp() {
  return (
    <div className="min-h-screen flex flex-col">
      <ErrorBoundary>
        <div className="flex flex-1">
          <aside className="w-56 bg-gray-900 text-white flex-shrink-0">
            <Sidebar />
          </aside>
          <main className="flex-1 p-6 bg-gray-50">
            <Outlet />
          </main>
        </div>
      </ErrorBoundary>
      <LoadingIndicator />
    </div>
  );
}
