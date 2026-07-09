import API_BASE_URL from "../api/apiClient";

export const getProfile = async () => {
  const token = localStorage.getItem("monetra-token");

  const response = await fetch(`${API_BASE_URL}/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }

  return await response.json();
};

export const updateProfile = async (profileData: any) => {
  const token = localStorage.getItem("monetra-token");

  const response = await fetch(`${API_BASE_URL}/user/profile`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    throw new Error("Failed to update profile");
  }

  return await response.json();
};
