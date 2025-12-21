import { useState, useEffect } from "react";
import { api } from "../../services/api";

interface Profile {
  id: number;
  full_name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  url: string;
 avatar_url: string;
  location: string;
  social_links: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export default function AdminProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await api.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(response.data.data);
    } catch (err) {
      setError("Failed to load profile data");
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleSocialLinkChange = (platform: string, value: string) => {
    setProfile(prev => {
      if (!prev) return null;
      return {
        ...prev,
        social_links: {
          ...prev.social_links,
          [platform]: value
        }
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    try {
      setSaving(true);
      await api.put("/profile", profile, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      alert("Profile updated successfully!");
    } catch (err) {
      setError("Failed to update profile");
      console.error("Error updating profile:", err);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <div className="p-6 text-white">Loading...</div>;
  if (error) return <div className="p-6 text-white text-red-50">{error}</div>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Manage Profile</h1>

      {profile && (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="full_name" className="block mb-1">Full Name *</label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={profile.full_name}
                onChange={handleInputChange}
                required
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
            </div>
            <div>
              <label htmlFor="title" className="block mb-1">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={profile.title || ""}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="bio" className="block mb-1">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={profile.bio || ""}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="email" className="block mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={profile.email || ""}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block mb-1">Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={profile.phone || ""}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="url" className="block mb-1">Website URL</label>
              <input
                type="url"
                id="url"
                name="url"
                value={profile.url || ""}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
            </div>
            <div>
              <label htmlFor="location" className="block mb-1">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={profile.location || ""}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="github" className="block mb-1">GitHub</label>
              <input
                type="url"
                id="github"
                value={profile.social_links?.github || ""}
                onChange={(e) => handleSocialLinkChange('github', e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
            </div>
            <div>
              <label htmlFor="linkedin" className="block mb-1">LinkedIn</label>
              <input
                type="url"
                id="linkedin"
                value={profile.social_links?.linkedin || ""}
                onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
            </div>
            <div>
              <label htmlFor="twitter" className="block mb-1">Twitter</label>
              <input
                type="url"
                id="twitter"
                value={profile.social_links?.twitter || ""}
                onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="avatar_url" className="block mb-1">Avatar URL</label>
            <input
              type="url"
              id="avatar_url"
              name="avatar_url"
              value={profile.avatar_url || ""}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </form>
      )}
    </div>
  );
}
