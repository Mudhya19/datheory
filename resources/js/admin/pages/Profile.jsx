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
      // Assuming the API returns an array and we want the first profile
      const profileData = Array.isArray(response.data.data)
        ? response.data.data[0] || {}
        : response.data.data || response.data;

      setProfile({
        name: profileData.name || '',
        title: profileData.title || '',
        email: profileData.email || '',
        phone: profileData.phone || '',
        bio: profileData.bio || '',
        location: profileData.location || '',
        website: profileData.website || '',
        github: profileData.github || '',
        linkedin: profileData.linkedin || '',
        twitter: profileData.twitter || '',
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

    if (!profile.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!profile.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(profile.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (profile.website && !isValidUrl(profile.website)) {
      newErrors.website = 'Please enter a valid Website URL';
    }

    if (profile.github && !isValidUrl(profile.github)) {
      newErrors.github = 'Please enter a valid GitHub URL';
    }

    if (profile.linkedin && !isValidUrl(profile.linkedin)) {
      newErrors.linkedin = 'Please enter a valid LinkedIn URL';
    }

    if (profile.twitter && !isValidUrl(profile.twitter)) {
      newErrors.twitter = 'Please enter a valid Twitter URL';
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

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');

    if (!validateForm()) {
      return;
    }

    setSaving(true);

    try {
      const response = await api.put('/profile', profile, {
        headers: {
          'X-ADMIN-TOKEN': sessionStorage.getItem("admin_token")
        }
      });

      setMessage('Profile updated successfully!');
    } catch (error) {
      if (error.response?.data?.errors) {
        // Handle validation errors from backend
        setErrors(error.response.data.errors);
        setMessage('Please fix the errors below');
      } else {
        console.error('Error updating profile:', error);
        setMessage('Error updating profile: ' + (error.response?.data?.message || 'Unknown error'));
      }
    } finally {
      setSaving(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <p className="text-gray-600">Loading profile...</p>
          <div className="mt-2 inline-block align-middle">
            <div className="w-8 h-8 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Profile Admin</h2>
      </div>

      {message && (
        <div className={`mb-4 p-4 rounded-md ${message.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={profile.name}
                onChange={handleChange}
                className={`mt-1 block w-full border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title/Position
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={profile.title}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email *
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={profile.email}
                onChange={handleChange}
                className={`mt-1 block w-full border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={profile.phone}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-50 sm:text-sm"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                name="bio"
                id="bio"
                rows={4}
                value={profile.bio}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-50 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                value={profile.location}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                Website
              </label>
              <input
                type="url"
                name="website"
                id="website"
                value={profile.website}
                onChange={handleChange}
                className={`mt-1 block w-full border ${errors.website ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
              {errors.website && <p className="mt-1 text-sm text-red-600">{errors.website}</p>}
            </div>

            <div>
              <label htmlFor="github" className="block text-sm font-medium text-gray-700">
                GitHub
              </label>
              <input
                type="url"
                name="github"
                id="github"
                value={profile.github}
                onChange={handleChange}
                className={`mt-1 block w-full border ${errors.github ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
              {errors.github && <p className="mt-1 text-sm text-red-600">{errors.github}</p>}
            </div>

            <div>
              <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
                LinkedIn
              </label>
              <input
                type="url"
                name="linkedin"
                id="linkedin"
                value={profile.linkedin}
                onChange={handleChange}
                className={`mt-1 block w-full border ${errors.linkedin ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
              {errors.linkedin && <p className="mt-1 text-sm text-red-600">{errors.linkedin}</p>}
            </div>

            <div>
              <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">
                Twitter
              </label>
              <input
                type="url"
                name="twitter"
                id="twitter"
                value={profile.twitter}
                onChange={handleChange}
                className={`mt-1 block w-full border ${errors.twitter ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
              {errors.twitter && <p className="mt-1 text-sm text-red-600">{errors.twitter}</p>}
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
