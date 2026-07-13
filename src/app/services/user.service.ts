import API_BASE_URL from "../api/apiClient";

import type { UserProfile } from "../types/user-profile.type";
import type { ChangePasswordRequest } from "../types/change-password.type";

const getToken = () => {
  return localStorage.getItem("monetra-token");
};

export const getUserProfile = async (): Promise<UserProfile> => {
  const response = await fetch(`${API_BASE_URL}/user/profile`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }

  return await response.json();
};

export const updateUserProfile = async (
  profile: UserProfile,
): Promise<UserProfile> => {
  const response = await fetch(`${API_BASE_URL}/user/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(profile),
  });

  if (!response.ok) {
    throw new Error("Failed to update profile");
  }

  const data = await response.json();

  return data.user;
};

export const changePassword = async (
  passwordData: ChangePasswordRequest,
): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/user/change-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(passwordData),
  });

  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.message);
  }
};

export const deleteAccount = async (): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/user`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.message);
  }
};
