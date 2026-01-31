import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

export default function SkillForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    skill_type: "technical", // Default valid value
    category: "",
    proficiency: 50, // Default mid-value
    description: "",
    icon: "",
    color: "",
    order: 0
  });

  // Load categories on mount
  useEffect(() => {
    api.get('/skill-categories')
      .then(res => {
        // Handle both simple array or object response structure
        const data = res.data.data || res.data;
        if (Array.isArray(data)) {
            setCategories(data);
        } else if (typeof data === 'object') {
             // If enum is returned as object {value: label}, convert to array
             setCategories(Object.values(data));
        }
      })
      .catch(console.error);
  }, []);

  // Fetch skill data if editing
  useEffect(() => {
    if (id) {
      const fetchSkillData = async () => {
        try {
          setLoading(true);
          // Headers handled by interceptor
          const response = await api.get(`/skills/${id}`);
          const skill = response.data.data;

          setFormData({
            name: skill.name || "",
            skill_type: skill.skill_type || "technical",
            category: skill.category || "",
            proficiency: skill.proficiency || 0,
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

    if (!formData.name.trim()) newErrors.name = 'Skill name is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.skill_type) newErrors.skill_type = 'Type is required';

    // Validate Proficiency (0-100)
    const prof = Number(formData.proficiency);
    if (isNaN(prof) || prof < 0 || prof > 100) {
        newErrors.proficiency = 'Proficiency must be between 0 and 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      if (id) {
        await api.put(`/skills/${id}`, formData);
      } else {
        await api.post('/skills', formData);
      }
      navigate("/admin/skills");
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
        setError("Please fix the errors below");
      } else {
        setError(err.response?.data?.message || "Failed to save skill");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading && id) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{id ? "Edit Skill" : "Create Skill"}</h2>
      </div>

      {error && <div className="mb-4 p-4 rounded bg-red-50 text-red-700">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700">Skill Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`mt-1 block w-full border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3`}
              />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
            </div>

            <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700">Type *</label>
                <select
                    name="skill_type"
                    value={formData.skill_type}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="technical">Technical</option>
                    <option value="soft">Soft Skill</option>
                    <option value="tool">Tool</option>
                </select>
            </div>

            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700">Category *</label>
              {categories.length > 0 ? (
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${errors.category ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3`}
                  >
                      <option value="">Select Category</option>
                      {categories.map((cat, idx) => (
                          <option key={idx} value={cat.value || cat}>{cat.label || cat}</option>
                      ))}
                  </select>
              ) : (
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g. Frontend"
                    className={`mt-1 block w-full border ${errors.category ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3`}
                />
              )}
               {errors.category && <p className="mt-1 text-xs text-red-600">{errors.category}</p>}
            </div>

            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700">Proficiency (0-100) *</label>
              <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    name="proficiency"
                    min="0"
                    max="100"
                    value={formData.proficiency}
                    onChange={handleChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-gray-900 font-medium w-12 text-center">{formData.proficiency}%</span>
              </div>
              {errors.proficiency && <p className="mt-1 text-xs text-red-600">{errors.proficiency}</p>}
            </div>

            <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700">Order</label>
                <input
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                />
            </div>

            <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700">Color (Hex)</label>
                <div className="flex items-center space-x-2">
                    <input
                        type="color"
                        name="color"
                        value={formData.color || '#3B82F6'}
                        onChange={handleChange}
                        className="h-9 w-9 p-1 border border-gray-300 rounded shadow-sm"
                    />
                    <input
                        type="text"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        placeholder="#3B82F6"
                        className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    />
                </div>
            </div>

            <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Icon Class (FontAwesome/Devicon)</label>
                <input
                    type="text"
                    name="icon"
                    value={formData.icon}
                    onChange={handleChange}
                    placeholder="e.g. fab fa-react"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
              />
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/admin/skills')}
              className="mr-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 from-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Saving...' : id ? 'Update Skill' : 'Create Skill'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

