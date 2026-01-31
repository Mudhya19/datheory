import { useState, useEffect } from "react";
import api from "../../services/api";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    bio: '',
    location: '',
    website: '',
    github: '',
    linkedin: '',
    twitter: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const response = await api.get('/profile');
      const data = response.data.data || response.data;

      // Map nested backend resource to flat frontend state
      const social = data.social_links || {};
      const contact = data.contact || {};
      const links = data.links || {};

      setProfile({
        name: data.full_name || data.name || '',
        title: data.title || '',
        email: contact.email || data.email || '',
        phone: contact.phone || data.phone || '',
        bio: data.bio || '',
        location: data.location || '',
        website: links.website || data.url || '',
        github: social.github || '',
        linkedin: social.linkedin || '',
        twitter: social.twitter || '',
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      setMessage('Error loading profile data');
    } finally {
      setLoading(false);
    }
  }

  const validateForm = () => {
    const newErrors = {};

    if (!profile.name.trim()) newErrors.name = 'Name is required';
    if (!profile.email.trim()) newErrors.email = 'Email is required';

    // Simple URL validation if present
    const checkUrl = (val, field) => {
        if (val && !val.startsWith('http')) {
             // Maybe allow non-http? Better to enforce strict URL if it's a link
             // But for now let's just warn if it doesn't look like a url
        }
    };

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');
    setErrors({});

    if (!validateForm()) return;

    setSaving(true);

    // Prepare payload for backend (flattened -> nested/renamed)
    const payload = {
        full_name: profile.name,
        title: profile.title,
        email: profile.email,
        phone: profile.phone,
        bio: profile.bio,
        location: profile.location,
        url: profile.website,
        social_links: {
            github: profile.github,
            linkedin: profile.linkedin,
            twitter: profile.twitter
        }
    };

    try {
      // Headers handled by api.js interceptor
      await api.put('/profile', payload);
      setMessage('Profile updated successfully!');
    } catch (error) {
        if (error.response?.data?.errors) {
            setErrors(error.response.data.errors);
            setMessage('Please fix the errors below');
        } else {
            setMessage('Error updating profile: ' + (error.response?.data?.message || 'Unknown error'));
        }
    } finally {
      setSaving(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    setProfile(prev => ({ ...prev, [name]: value }));
  }

  if (loading) {
    return <div className="p-8 text-center">Loading profile...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Profile Admin</h2>
      </div>

      {message && (
        <div className={`mb-4 p-4 rounded-md ${message.includes('Error') || message.includes('fix') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name *</label>
              <input type="text" name="name" value={profile.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Title/Position</label>
              <input type="text" name="title" value={profile.title} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email *</label>
              <input type="email" name="email" value={profile.email} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input type="text" name="phone" value={profile.phone} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Bio</label>
              <textarea name="bio" rows={4} value={profile.bio} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input type="text" name="location" value={profile.location} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Website</label>
              <input type="url" name="website" value={profile.website} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">GitHub</label>
              <input type="url" name="github" value={profile.github} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
              <input type="url" name="linkedin" value={profile.linkedin} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Twitter</label>
              <input type="url" name="twitter" value={profile.twitter} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
            </div>
          </div>
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <button type="submit" disabled={saving} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
