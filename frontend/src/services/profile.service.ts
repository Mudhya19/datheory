import { api } from './api';
import type { Profile, ApiResponse } from '../types';

export const getProfile = async (): Promise<Profile> => {
  try {
    console.log('Making API request to /profile');
    const response = await api.get<ApiResponse<Profile>>('/profile');
    console.log('API response:', response);

    // Handle potential data transformation if needed
    const profileData = response.data.data;

    // Parse social_links if it's a string
    if (typeof profileData.social_links === 'string') {
      try {
        profileData.social_links = JSON.parse(profileData.social_links);
      } catch (e) {
        console.warn('Could not parse social_links, setting to empty object:', e);
        profileData.social_links = {};
      }
    }

    return profileData;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};
