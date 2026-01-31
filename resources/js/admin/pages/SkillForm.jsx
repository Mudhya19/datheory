import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

export default function SkillForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({}); // For field-specific errors

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    proficiency: "",
    description: "",
    icon: "",
    color: "",
    order: 0
  });

  // Fetch skill data if editing
  useEffect(() => {
    if (id) {
      const fetchSkillData = async () => {
        try {
          setLoading(true);
          const response = await api.get(`/skills/${id}`, {
            headers: {
              'X-ADMIN-TOKEN': sessionStorage.getItem("admin_token")
            }
          });
          const skill = response.data.data;

          setFormData({
            name: skill.name || "",
            category: skill.category || "",
            proficiency: skill.proficiency || "",
            description: skill.description || "",
            icon: skill.icon || "",
            color: skill.color || "",
            order: skill.order || 0
          });
        } catch (err) {
          setError("Failed to load skill data");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchSkillData();
    }
  }, [id]);

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

    if (!formData.name.trim()) {
      newErrors.name = 'Skill name is required';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    if (!formData.proficiency.trim()) {
      newErrors.proficiency = 'Proficiency is required';
    } else if (!['beginner', 'intermediate', 'advanced', 'expert'].includes(formData.proficiency.toLowerCase())) {
      newErrors.proficiency = 'Proficiency must be one of: beginner, intermediate, advanced, expert';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
        // Update existing skill
        await api.put(`/skills/${id}`, formData, {
          headers: {
            'X-ADMIN-TOKEN': sessionStorage.getItem("admin_token")
          }
        });
      } else {
        // Create new skill
        await api.post('/skills', formData, {
          headers: {
            'X-ADMIN-TOKEN': sessionStorage.getItem("admin_token")
          }
        });
      }

      navigate("/admin/skills");
    } catch (err) {
      if (err.response?.data?.errors) {
        // Handle validation errors from backend
        setErrors(err.response.data.errors);
        setError("Please fix the errors below");
      } else {
        setError(err.response?.data?.message || "Failed to save skill");
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
        <h2 className="text-2xl font-bold text-gray-900">{id ? "Edit Skill" : "Create Skill"}</h2>
      </div>

      {error && (
        <div className="mb-4 p-4 rounded-md bg-red-50 text-red-70">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Skill Name *
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className={`mt-1 block w-full border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category *
              </label>
              <input
                type="text"
                name="category"
                id="category"
                value={formData.category}
                onChange={handleChange}
                className={`mt-1 block w-full border ${errors.category ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
              {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
            </div>

            <div>
              <label htmlFor="proficiency" className="block text-sm font-medium text-gray-700">
                Proficiency *
              </label>
              <select
                name="proficiency"
                id="proficiency"
                value={formData.proficiency}
                onChange={handleChange}
                className={`mt-1 block w-full border ${errors.proficiency ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              >
                <option value="">Select Proficiency</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
              {errors.proficiency && <p className="mt-1 text-sm text-red-600">{errors.proficiency}</p>}
            </div>

            <div>
              <label htmlFor="order" className="block text-sm font-medium text-gray-700">
                Order
              </label>
              <input
                type="number"
                name="order"
                id="order"
                value={formData.order}
                onChange={handleChange}
                min="0"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="icon" className="block text-sm font-medium text-gray-700">
                Icon (CSS class)
              </label>
              <input
                type="text"
                name="icon"
                id="icon"
                value={formData.icon}
                onChange={handleChange}
                placeholder="e.g., fa fa-react"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-50 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                Color (hex)
              </label>
              <input
                type="text"
                name="color"
                id="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="#3B82F6"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Saving...' : id ? 'Update Skill' : 'Create Skill'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/skills')}
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
