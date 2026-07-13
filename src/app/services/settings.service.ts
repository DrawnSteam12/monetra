import API_BASE_URL from "../api/apiClient";

import type { Settings, SettingsUpdate, Theme } from "../types/settings.type";

export const getSettings = async (): Promise<Settings> => {
  const token = localStorage.getItem("monetra-token");
  const response = await fetch(`${API_BASE_URL}/settings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch settings");
  }

  const data = await response.json();

  return data.settings;
};

export const updateSettings = async (
  settingData: SettingsUpdate,
): Promise<Settings> => {
  const token = localStorage.getItem("monetra-token");

  const response = await fetch(`${API_BASE_URL}/settings`, {
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

export const updateTheme = async (theme: Theme) => {
  return updateSettings({
    theme,
  });
};
