import { useState, useEffect } from "react";
import { api } from "../../services/api";

interface Skill {
  id: number;
  name: string;
 category: string;
 level: string;
  proficiency: number;
  icon_url: string;
}

export default function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    level: "",
    proficiency: 50,
    icon_url: ""
  });

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const response = await api.get("/skills", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSkills(response.data.data);
    } catch (err) {
      setError("Failed to load skills data");
      console.error("Error fetching skills:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'proficiency' ? Number(value) : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      if (editingSkill) {
        // Update existing skill
        await api.put(`/skills/${editingSkill.id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      } else {
        // Create new skill
        await api.post("/skills", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }

      // Reset form and refresh skills
      setFormData({
        name: "",
        category: "",
        level: "",
        proficiency: 50,
        icon_url: ""
      });
      setEditingSkill(null);
      setShowForm(false);
      fetchSkills();
    } catch (err) {
      setError("Failed to save skill");
      console.error("Error saving skill:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category || "",
      level: skill.level || "",
      proficiency: skill.proficiency || 50,
      icon_url: skill.icon_url || ""
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      try {
        await api.delete(`/skills/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchSkills();
      } catch (err) {
        setError("Failed to delete skill");
        console.error("Error deleting skill:", err);
      }
    }
  };

  useEffect(() => {
    fetchSkills();
 }, []);

  if (loading) return <div className="p-6 text-white">Loading...</div>;
  if (error) return <div className="p-6 text-white text-red-50">{error}</div>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Manage Skills</h1>

      <div className="mb-6">
        <button
          onClick={() => {
            setEditingSkill(null);
            setFormData({
              name: "",
              category: "",
              level: "",
              proficiency: 50,
              icon_url: ""
            });
            setShowForm(!showForm);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          {showForm ? "Cancel" : "Add New Skill"}
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-800 p-6 rounded mb-6">
          <h2 className="text-xl font-bold mb-4">
            {editingSkill ? "Edit Skill" : "Create New Skill"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="name" className="block mb-1">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
              </div>
              <div>
                <label htmlFor="category" className="block mb-1">Category</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="level" className="block mb-1">Level</label>
                <select
                  id="level"
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                >
                  <option value="">Select level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
              <div>
                <label htmlFor="proficiency" className="block mb-1">Proficiency (0-100)</label>
                <input
                  type="number"
                  id="proficiency"
                  name="proficiency"
                  min="0"
                  max="100"
                  value={formData.proficiency}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="icon_url" className="block mb-1">Icon URL</label>
              <input
                type="url"
                id="icon_url"
                name="icon_url"
                value={formData.icon_url}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-gray-70 text-white"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded disabled:opacity-50"
            >
              {saving ? "Saving..." : editingSkill ? "Update Skill" : "Create Skill"}
            </button>
          </form>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Level</th>
              <th className="py-3 px-4 text-left">Proficiency</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill) => (
              <tr key={skill.id} className="border-b border-gray-700 hover:bg-gray-750">
                <td className="py-3 px-4">{skill.name}</td>
                <td className="py-3 px-4">{skill.category}</td>
                <td className="py-3 px-4">{skill.level}</td>
                <td className="py-3 px-4">
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${skill.proficiency}%` }}
                    ></div>
                  </div>
                  <span className="text-xs">{skill.proficiency}%</span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(skill)}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white py-1 px-3 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(skill.id)}
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
  );
}
