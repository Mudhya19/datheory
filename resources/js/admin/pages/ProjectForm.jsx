import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProjectById, createProject, updateProject, fetchProjectTypes } from "../services/admin.project.service";

export default function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [projectTypes, setProjectTypes] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    project_type: "data_science",
    short_description: "",
    description: "",
    tech_stack: "", // Input as string, converted to array on submit
    tools_used: "", // Input as string, converted to array on submit
    github_url: "",
    demo_url: "",
    notebook_url: "",
    image_url: "",
    is_published: false,
    featured: false,
    display_order: 0,
    dataset_info: {
        name: "",
        source: "",
        size: "",
        format: ""
    }
  });

  // Load project types on mount
  useEffect(() => {
    fetchProjectTypes().then(types => {
        setProjectTypes(types);
    }).catch(console.error);
  }, []);

  // Fetch project data if editing
  useEffect(() => {
    if (id) {
      const fetchProjectData = async () => {
        try {
          setLoading(true);
          const project = await fetchProjectById(id);

          // Helper to convert array to comma-separated string
          const arrayToString = (arr) => Array.isArray(arr) ? arr.join(", ") : (arr || "");

          setFormData({
            title: project.title || "",
            slug: project.slug || "",
            project_type: project.project_type || "data_science",
            short_description: project.short_description || "",
            description: project.description || "",
            tech_stack: arrayToString(project.tech_stack),
            tools_used: arrayToString(project.tools_used),
            github_url: project.github_url || "",
            demo_url: project.demo_url || "",
            notebook_url: project.notebook_url || "",
            image_url: project.image_url || "",
            is_published: project.is_published || false,
            featured: project.featured || false,
            display_order: project.display_order || 0,
            dataset_info: {
                name: project.dataset_info?.name || "",
                source: project.dataset_info?.source || "",
                size: project.dataset_info?.size || "",
                format: project.dataset_info?.format || ""
            }
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

  // Auto-generate slug
  useEffect(() => {
    if (!id && formData.title) {
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

    // Clear error
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    // Handle nested dataset_info fields
    if (name.startsWith('dataset_info.')) {
        const fieldName = name.split('.')[1];
        setFormData(prev => ({
            ...prev,
            dataset_info: {
                ...prev.dataset_info,
                [fieldName]: value
            }
        }));
    } else {
        setFormData(prev => ({
          ...prev,
          [name]: type === 'checkbox' ? checked : value
        }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.slug.trim()) newErrors.slug = 'Slug is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';

    if (formData.github_url && !isValidUrl(formData.github_url)) newErrors.github_url = 'Invalid URL';
    if (formData.demo_url && !isValidUrl(formData.demo_url)) newErrors.demo_url = 'Invalid URL';
    if (formData.notebook_url && !isValidUrl(formData.notebook_url)) newErrors.notebook_url = 'Invalid URL';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url) => {
    try { new URL(url); return true; } catch (e) { return false; }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    // Prepare payload
    const payload = {
        ...formData,
        tech_stack: formData.tech_stack.split(',').map(s => s.trim()).filter(Boolean),
        tools_used: formData.tools_used.split(',').map(s => s.trim()).filter(Boolean),
        // Ensure dataset_info is clean (remove empty keys if needed, or keep for structure)
        dataset_info: formData.dataset_info
    };

    try {
      if (id) {
        await updateProject(id, payload);
      } else {
        await createProject(payload);
      }
      navigate("/admin/projects");
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
        setError("Please fix validation errors");
      } else {
        setError(err.response?.data?.message || "Failed to save project");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading && id) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">{id ? "Edit Project" : "Create Project"}</h2>
        <button
          type="button"
          onClick={() => navigate('/admin/projects')}
          className="text-gray-600 hover:text-gray-900"
        >
          Cancel
        </button>
      </div>

      {error && <div className="mb-4 p-4 rounded bg-red-50 text-red-700">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6 space-y-6">

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Project Type</label>
                    <select
                        name="project_type"
                        value={formData.project_type}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                    >
                        {projectTypes.map((type) => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                    </select>
                </div>

                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Display Order</label>
                    <input
                        type="number"
                        name="display_order"
                        value={formData.display_order}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    />
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`mt-1 block w-full border ${errors.title ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3`}
                    />
                    {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Slug</label>
                    <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        className={`mt-1 block w-full border ${errors.slug ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3`}
                    />
                    {errors.slug && <p className="mt-1 text-xs text-red-600">{errors.slug}</p>}
                </div>
            </div>

            {/* Descriptions */}
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Short Description</label>
                    <textarea
                        name="short_description"
                        rows={2}
                        value={formData.short_description}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Full Description (Markdown supported)</label>
                    <textarea
                        name="description"
                        rows={6}
                        value={formData.description}
                        onChange={handleChange}
                        className={`mt-1 block w-full border ${errors.description ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3`}
                    />
                     {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
                </div>
            </div>

            {/* Tech & Tools */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tech Stack (comma separated)</label>
                    <input
                        type="text"
                        name="tech_stack"
                        placeholder="e.g. Python, Pandas, AWS"
                        value={formData.tech_stack}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tools Used (comma separated)</label>
                    <input
                        type="text"
                        name="tools_used"
                        placeholder="e.g. Jupyter, Tableau, Git"
                        value={formData.tools_used}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    />
                </div>
            </div>

            {/* URLs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="col-span-2 font-medium text-gray-900">Project Links</h3>

                <div>
                    <label className="block text-sm font-medium text-gray-700">GitHub URL</label>
                    <input
                        type="url"
                        name="github_url"
                        value={formData.github_url}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Live Demo URL</label>
                    <input
                        type="url"
                        name="demo_url"
                        value={formData.demo_url}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Notebook URL (Jupyter/Colab)</label>
                    <input
                        type="url"
                        name="notebook_url"
                        value={formData.notebook_url}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Thumbnail/Image URL</label>
                    <input
                        type="url"
                        name="image_url"
                        value={formData.image_url}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    />
                </div>
            </div>

            {/* Dataset Info (Collapsible-like style) */}
            <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="mb-4 font-medium text-gray-900">Dataset Metadata</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-500">Dataset Name</label>
                        <input
                            type="text"
                            name="dataset_info.name"
                            value={formData.dataset_info.name}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-sm py-1 px-2 text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-500">Source (Kaggle, etc.)</label>
                        <input
                            type="text"
                            name="dataset_info.source"
                            value={formData.dataset_info.source}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-sm py-1 px-2 text-sm"
                        />
                    </div>
                     <div>
                        <label className="block text-xs font-medium text-gray-500">Size (e.g. 5GB)</label>
                        <input
                            type="text"
                            name="dataset_info.size"
                            value={formData.dataset_info.size}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-sm py-1 px-2 text-sm"
                        />
                    </div>
                     <div>
                        <label className="block text-xs font-medium text-gray-500">Format (CSV, Parquet)</label>
                        <input
                            type="text"
                            name="dataset_info.format"
                            value={formData.dataset_info.format}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-sm py-1 px-2 text-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Visibility */}
            <div className="flex space-x-6">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="is_published"
                        checked={formData.is_published}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label className="ml-2 block text-sm text-gray-900">Published</label>
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label className="ml-2 block text-sm text-gray-900">Featured Project</label>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end pt-6 border-t border-gray-200">
                <button
                    type="button"
                    onClick={() => navigate('/admin/projects')}
                    className="mr-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                    {loading ? "Saving..." : "Save Project"}
                </button>
            </div>
        </div>
      </form>
    </div>
  );
}

