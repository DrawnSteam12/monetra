import API_BASE_URL from "../api/apiClient";

import type { DashboardResponse } from "../types/dashboard.types";

export const getDashboard = async (): Promise<DashboardResponse> => {
  const token = localStorage.getItem("monetra-token");

  const response = await fetch(`${API_BASE_URL}/analytics`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard data");
  }

  const data: DashboardResponse = await response.json();

  return data;
};
