import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
 const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  async function fetchSkills() {
    try {
      const response = await api.get('/skills');
      setSkills(response.data.data || response.data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this skill?")) return;

    setDeletingId(id);

    try {
      await api.delete(`/skills/${id}`, {
        headers: {
          'X-ADMIN-TOKEN': sessionStorage.getItem("admin_token")
        }
      });
      setSkills(prev => prev.filter(s => s.id !== id));
    } catch (error) {
      alert("Failed to delete skill: " + (error.response?.data?.message || "Unknown error"));
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <p className="text-gray-600">Loading skills...</p>
          <div className="mt-2 inline-block align-middle">
            <div className="w-8 h-8 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show empty state if no skills exist
  if (!loading && skills.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Skills Admin</h2>
        </div>

        <div className="mb-4">
          <Link to="/admin/skills/create" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            + New Skill
          </Link>
        </div>

        <div className="text-center py-12">
          <p className="text-lg mb-4">No skills found</p>
          <Link to="/admin/skills/create" className="text-blue-600 hover:underline">
            Create your first skill
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Skills Admin</h2>
      </div>

      <div className="mb-6">
        <Link to="/admin/skills/create" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          + New Skill
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Proficiency
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {skills.map((skill) => (
              <tr key={skill.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{skill.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{skill.category || 'N/A'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{skill.proficiency || 'N/A'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <Link to={`/admin/skills/${skill.id}/edit`} className="text-indigo-600 hover:text-indigo-900">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(skill.id)}
                      disabled={deletingId === skill.id}
                      className={`${
                        deletingId === skill.id ? "opacity-50 cursor-not-allowed text-gray-400" : "text-red-600 hover:text-red-900"
                      }`}
                    >
                      {deletingId === skill.id ? "Deleting..." : "Delete"}
                    </button>
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
