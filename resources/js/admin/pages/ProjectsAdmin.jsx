import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchAllProjects,
  deleteProject,
  restoreProject,
  toggleProjectStatus,
  getArchivedProjects
} from "../services/admin.project.service";

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [togglingId, setTogglingId] = useState(null);
  const [filter, setFilter] = useState('active'); // 'active', 'archived', 'all'

  useEffect(() => {
    fetchProjects();
  }, [filter]);

  async function fetchProjects() {
    setLoading(true);
    try {
      let data = [];
      if (filter === 'archived') {
        data = await getArchivedProjects();
      } else {
        // For active and all filters, we get all projects and filter locally
        data = await fetchAllProjects();
        if (filter === 'active') {
          // Filter out soft-deleted projects
          data = data.filter(p => !p.deleted_at);
        }
        // For 'all' filter, we return all projects including soft-deleted ones
      }
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <p className="text-gray-600">Loading projects...</p>
          <div className="mt-2 inline-block align-middle">
            <div className="w-8 h-8 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show empty state if no projects exist for the selected filter
  if (!loading && projects.length === 0) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Projects Admin</h2>
        </div>

        <div className="mb-6 flex flex-wrap gap-4 items-center">
          <Link to="/admin/projects/create" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            + New Project
          </Link>

          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('active')}
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                filter === 'active'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter('archived')}
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                filter === 'archived'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Archived
            </button>
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                filter === 'all'
                  ? 'bg-purple-100 text-purple-800'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              All
            </button>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              {filter === 'archived'
                ? 'No archived projects'
                : filter === 'all'
                  ? 'No projects found'
                  : 'No active projects'}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {filter === 'archived'
                ? 'Projects you archive will appear here.'
                : filter === 'all'
                  ? 'No projects match your current filter.'
                  : 'Get started by creating a new project.'}
            </p>
            {filter !== 'archived' && (
              <div className="mt-6">
                <Link
                  to="/admin/projects/create"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 0 011 1v5h5a1 1 0 110 2h-5v5a1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  New Project
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  async function handleArchiveOrRestore(id) {
    const project = projects.find(p => p.id === id);
    const action = project.deleted_at ? 'restore' : 'archive';
    if (!confirm(`Are you sure you want to ${action} this project?`)) return;

    setDeletingId(id);

    try {
      if (project.deleted_at) {
        // Restore the project
        await restoreProject(id);
        setProjects(prev => prev.filter(p => p.id !== id)); // Remove from archived list
      } else {
        // Archive the project
        await deleteProject(id);
        setProjects(prev => prev.map(p =>
          p.id === id ? { ...p, deleted_at: new Date().toISOString() } : p
        ));
      }
    } catch (error) {
      alert(`Failed to ${action} project: ` + (error.response?.data?.message || "Unknown error"));
    } finally {
      setDeletingId(null);
    }
  }

  async function handleToggle(id) {
    setTogglingId(id);
    try {
      const res = await toggleProjectStatus(id);

      setProjects(prev =>
        prev.map(p =>
          p.id === id ? { ...p, is_published: res.data.data.is_published } : p
        )
      );
    } catch (error) {
      console.error('Error toggling project status:', error);
      alert('Failed to update project status: ' + (error.response?.data?.message || 'Unknown error'));
    } finally {
      setTogglingId(null);
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Projects Admin</h2>
      </div>

      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <Link to="/admin/projects/create" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          + New Project
        </Link>

        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('active')}
            className={`px-3 py-1 text-sm font-medium rounded-md ${
              filter === 'active'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('archived')}
            className={`px-3 py-1 text-sm font-medium rounded-md ${
              filter === 'archived'
                ? 'bg-red-100 text-red-800'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            Archived
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-sm font-medium rounded-md ${
              filter === 'all'
                ? 'bg-purple-100 text-purple-800'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            All
          </button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Archive Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map(p => (
              <tr key={p.id} className={`hover:bg-gray-50 ${p.deleted_at ? 'bg-red-50' : ''}`}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{p.title}</div>
                  {p.deleted_at && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 mt-1">
                      ARCHIVED
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500 capitalize">{p.project_type?.replace('_', ' ') || 'Data Science'}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    p.is_published
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {p.is_published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {p.deleted_at ? 'Archived' : 'Active'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    {p.deleted_at ? (
                      <button
                        onClick={() => handleArchiveOrRestore(p.id)}
                        disabled={deletingId === p.id}
                        className={`${
                          deletingId === p.id
                            ? "opacity-50 cursor-not-allowed text-gray-400"
                            : "text-green-600 hover:text-green-900"
                        }`}
                      >
                        {deletingId === p.id ? "Restoring..." : "Restore"}
                      </button>
                    ) : (
                      <>
                        <Link
                          to={`/admin/projects/${p.id}/edit`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleToggle(p.id)}
                          disabled={togglingId === p.id}
                          className={`${
                            togglingId === p.id
                              ? 'opacity-50 cursor-not-allowed text-gray-400'
                              : p.is_published
                                ? 'text-yellow-600 hover:text-yellow-900'
                                : 'text-blue-600 hover:text-blue-900'
                          }`}
                        >
                          {togglingId === p.id
                            ? 'Updating...'
                            : p.is_published ? "Unpublish" : "Publish"}
                        </button>
                        <button
                          onClick={() => handleArchiveOrRestore(p.id)}
                          disabled={deletingId === p.id}
                          className={`${
                            deletingId === p.id
                              ? "opacity-50 cursor-not-allowed text-gray-400"
                              : "text-red-600 hover:text-red-900"
                          }`}
                        >
                          {deletingId === p.id ? "Processing..." : "Archive"}
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
