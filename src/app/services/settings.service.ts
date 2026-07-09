import API_BASE_URL from "../api/apiClient";

export const getSettings = async () => {
  const token = localStorage.getItem("monetra-token");

  const response = await fetch(`${API_BASE_URL}/settings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fecth settings");
  }

  const data = await response.json();

  return data.settings;
};

export const updateSettings = async (settingData: any) => {
  const token = localStorage.getItem("monetra-token");

  const response = await fetch(`${API_BASE_URL}/setting`, {
    method: "PUT",

    headers: {
      "Content-type": "application/json",

      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(settingData),
  });

  if (!response.ok) {
    throw new Error("Failed to update settings");
  }

  const data = await response.json();

  return data.settings;
};
