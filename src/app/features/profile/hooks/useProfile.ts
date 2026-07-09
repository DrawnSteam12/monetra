import { useEffect, useState } from "react";

import {
  getProfile,
  updateProfile as updateProfileService,
} from "../../../services/profile.service";

import type { UserProfile } from "../types/profile.types";

export const useProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    setLoading(true);

    setError(null);

    try {
      const data = await getProfile();

      setProfile(data);
    } catch (error) {
      console.error(error);

      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updatedProfile: UserProfile) => {
    try {
      const response = await updateProfileService(updatedProfile);

      setProfile(response.user);

      return true;
    } catch (error) {
      console.error(error);

      setError("Failed to update profile");

      return false;
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfile,
  };
};
