import { useEffect, useState } from "react";
import { getProfile } from "../services/profile.service";
import { Profile } from "../types";

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log('Fetching profile...');
        const profileData = await getProfile();
        console.log('Profile fetched:', profileData);
        setProfile(profileData);
      } catch (err) {
        console.error('Error in useProfile hook:', err);
        setError("Failed to load profile: " + (err instanceof Error ? err.message : String(err)));
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading, error };
};
