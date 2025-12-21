import { useState, useEffect } from "react";
import { api } from "../../services/api";

interface Project {
  id: number;
  title: string;
  description: string;
  short_description: string;
  content: string;
  image_url: string;
  slug: string;
  thumbnail?: string;
  github_url?: string;
  demo_url?: string;
  tech_stack: string[];
  is_published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
 const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    slug: "",
    thumbnail: "",
    github_url: "",
    demo_url: "",
    is_published: true
  });

  const token = localStorage.getItem("token");

 const fetchProjects = async () => {
    try {
      const response = await api.get("/projects-all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjects(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'is_published' ? value === 'true' : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProject) {
        // Update existing project
        await api.put(`/projects/${editingProject.id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        // Create new project
        await api.post("/projects", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      // Reset form and refresh projects
      setFormData({
        title: "",
        description: "",
        content: "",
        slug: "",
        thumbnail: "",
        github_url: "",
        demo_url: "",
        is_published: true
      });
      setEditingProject(null);
      setShowForm(false);
      fetchProjects();
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      content: project.content,
      slug: project.slug,
      thumbnail: project.thumbnail || "",
      github_url: project.github_url || "",
      demo_url: project.demo_url || "",
      is_published: project.is_published
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await api.delete(`/projects/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchProjects();
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  const handleTogglePublish = async (project: Project) => {
    try {
      await api.put(`/projects/${project.id}`, {
        ...project,
        is_published: !project.is_published
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProjects();
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/admin/login";
  };

  useEffect(() => {
    const loadProjects = async () => {
      await fetchProjects();
    };

    loadProjects();
 }, []);

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Panel - Projects</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>

        <div className="mb-6">
          <button
            onClick={() => {
              setEditingProject(null);
              setFormData({
                title: "",
                description: "",
                content: "",
                slug: "",
                thumbnail: "",
                github_url: "",
                demo_url: "",
                is_published: true
              });
              setShowForm(!showForm);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            {showForm ? "Cancel" : "Add New Project"}
          </button>
        </div>

        {showForm && (
          <div className="bg-gray-800 p-6 rounded mb-6">
            <h2 className="text-xl font-bold mb-4">
              {editingProject ? "Edit Project" : "Create New Project"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="title" className="block mb-1">Title *</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 rounded bg-gray-700 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="slug" className="block mb-1">Slug *</label>
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 rounded bg-gray-700 text-white"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block mb-1">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="content" className="block mb-1">Content *</label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="thumbnail" className="block mb-1">Thumbnail URL</label>
                  <input
                    type="text"
                    id="thumbnail"
                    name="thumbnail"
                    value={formData.thumbnail}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="github_url" className="block mb-1">GitHub URL</label>
                  <input
                    type="text"
                    id="github_url"
                    name="github_url"
                    value={formData.github_url}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="demo_url" className="block mb-1">Demo URL</label>
                  <input
                    type="text"
                    id="demo_url"
                    name="demo_url"
                    value={formData.demo_url}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="is_published" className="block mb-1">Published</label>
                  <select
                    id="is_published"
                    name="is_published"
                    value={formData.is_published.toString()}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
              >
                {editingProject ? "Update Project" : "Create Project"}
              </button>
            </form>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 rounded">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Published</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-gray-700 hover:bg-gray-750">
                  <td className="py-3 px-4">{project.title}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      project.is_published ? "bg-green-600" : "bg-red-600"
                    }`}>
                      {project.is_published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(project)}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white py-1 px-3 rounded text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleTogglePublish(project)}
                        className={`${
                          project.is_published ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
                        } text-white py-1 px-3 rounded text-sm`}
                      >
                        {project.is_published ? "Unpublish" : "Publish"}
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
