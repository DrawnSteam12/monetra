import API_BASE_URL from "../api/apiClient";

import type { AnalyticsResponse } from "../types/analytics.type";

export const getAnalytics = async (
  startDate?: string,
  endDate?: string,
): Promise<AnalyticsResponse> => {
  const token = localStorage.getItem("monetra-token");

  const query = new URLSearchParams();

  if (startDate) query.append("startDate", startDate);

  if (endDate) query.append("endDate", endDate);

  const response = await fetch(
    `${API_BASE_URL}/analytics?${query.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.message || "Failed to fetch analytics");
  }

  const data: AnalyticsResponse = await response.json();

  return data;
};
