import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProjectById, createProject, updateProject } from "../services/admin.project.service";

export default function ProjectForm() {
  const { id } = useParams();
 const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({}); // For field-specific errors

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    short_description: "",
    description: "",
    tech_stack: "",
    github_url: "",
    demo_url: "",
    image_url: "",
    is_published: false,
    featured: false,
    tags: []
  });

  // Fetch project data if editing
  useEffect(() => {
    if (id) {
      const fetchProjectData = async () => {
        try {
          setLoading(true);
          const project = await fetchProjectById(id);
          setFormData({
            title: project.title || "",
            slug: project.slug || "",
            short_description: project.short_description || "",
            description: project.description || "",
            tech_stack: project.tech_stack || "",
            github_url: project.github_url || "",
            demo_url: project.demo_url || "",
            image_url: project.image_url || "",
            is_published: project.is_published || false,
            featured: project.featured || false,
            tags: Array.isArray(project.tags) ? project.tags : (project.tags || "").split(",").map(tag => tag.trim()).filter(tag => tag)
          });
        } catch (err) {
          setError("Failed to load project data");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchProjectData();
    }
  }, [id]);

  // Auto-generate slug from title
  useEffect(() => {
    if (!id) { // Only auto-generate for new projects
      const generatedSlug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
    }
 }, [formData.title, id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = 'Slug can only contain lowercase letters, numbers, and hyphens';
    }

    if (!formData.short_description.trim()) {
      newErrors.short_description = 'Short description is required';
    } else if (formData.short_description.length > 255) {
      newErrors.short_description = 'Short description must be less than 255 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.tech_stack.trim()) {
      newErrors.tech_stack = 'Tech stack is required';
    }

    if (formData.github_url && !isValidUrl(formData.github_url)) {
      newErrors.github_url = 'Please enter a valid GitHub URL';
    }

    if (formData.demo_url && !isValidUrl(formData.demo_url)) {
      newErrors.demo_url = 'Please enter a valid Demo URL';
    }

    if (formData.image_url && !isValidUrl(formData.image_url)) {
      newErrors.image_url = 'Please enter a valid Image URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      if (id) {
        // Update existing project
        await updateProject(id, formData);
      } else {
        // Create new project
        await createProject(formData);
      }

      navigate("/admin/projects");
    } catch (err) {
      if (err.response?.data?.errors) {
        // Handle validation errors from backend
        setErrors(err.response.data.errors);
        setError("Please fix the errors below");
      } else {
        setError(err.response?.data?.message || "Failed to save project");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && id) {
    return <div className="p-8 text-center">Loading...</div>;
  }

 return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{id ? "Edit Project" : "Create Project"}</h2>
      </div>

      {error && (
        <div className="mb-4 p-4 rounded-md bg-red-50 text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title *
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className={`mt-1 block w-full border ${errors.title ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                Slug *
              </label>
              <input
                type="text"
                name="slug"
                id="slug"
                value={formData.slug}
                onChange={handleChange}
                className={`mt-1 block w-full border ${errors.slug ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
              {errors.slug && <p className="mt-1 text-sm text-red-600">{errors.slug}</p>}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="short_description" className="block text-sm font-medium text-gray-700">
                Short Description *
              </label>
              <textarea
                name="short_description"
                id="short_description"
                rows={3}
                value={formData.short_description}
                onChange={handleChange}
                className={`mt-1 block w-full border ${errors.short_description ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
              {errors.short_description && <p className="mt-1 text-sm text-red-600">{errors.short_description}</p>}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description *
              </label>
              <textarea
                name="description"
                id="description"
                rows={5}
                value={formData.description}
                onChange={handleChange}
                className={`mt-1 block w-full border ${errors.description ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="tech_stack" className="block text-sm font-medium text-gray-700">
                Tech Stack (comma separated) *
              </label>
              <input
                type="text"
                name="tech_stack"
                id="tech_stack"
                value={formData.tech_stack}
                onChange={handleChange}
                placeholder="e.g., React, Laravel, MySQL"
                className={`mt-1 block w-full border ${errors.tech_stack ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
              {errors.tech_stack && <p className="mt-1 text-sm text-red-600">{errors.tech_stack}</p>}
            </div>

            <div>
              <label htmlFor="github_url" className="block text-sm font-medium text-gray-700">
                GitHub URL
              </label>
              <input
                type="url"
                name="github_url"
                id="github_url"
                value={formData.github_url}
                onChange={handleChange}
                className={`mt-1 block w-full border ${errors.github_url ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
              {errors.github_url && <p className="mt-1 text-sm text-red-600">{errors.github_url}</p>}
            </div>

            <div>
              <label htmlFor="demo_url" className="block text-sm font-medium text-gray-700">
                Demo URL
              </label>
              <input
                type="url"
                name="demo_url"
                id="demo_url"
                value={formData.demo_url}
                onChange={handleChange}
                className={`mt-1 block w-full border ${errors.demo_url ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
              {errors.demo_url && <p className="mt-1 text-sm text-red-600">{errors.demo_url}</p>}
            </div>

            <div>
              <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="url"
                name="image_url"
                id="image_url"
                value={formData.image_url}
                onChange={handleChange}
                className={`mt-1 block w-full border ${errors.image_url ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
              {errors.image_url && <p className="mt-1 text-sm text-red-600">{errors.image_url}</p>}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                Tags (comma separated)
              </label>
              <input
                type="text"
                name="tags"
                id="tags"
                value={formData.tags.join(", ")}
                onChange={(e) => {
                  const tags = e.target.value.split(",").map(tag => tag.trim()).filter(tag => tag);
                  setFormData(prev => ({ ...prev, tags }));
                }}
                placeholder="e.g., React, JavaScript, API"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="is_published"
                id="is_published"
                checked={formData.is_published}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="is_published" className="ml-2 block text-sm text-gray-900">
                Published
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="featured"
                id="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                Featured
              </label>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Saving...' : id ? 'Update Project' : 'Create Project'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/projects')}
              className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
