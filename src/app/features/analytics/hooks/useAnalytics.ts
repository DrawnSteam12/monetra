import { useEffect, useState } from "react";

import { getAnalytics } from "../../../services/analytics.service";

import type { AnalyticsResponse } from "../../../types/analytics.type";

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async (startDate?: string, endDate?: string) => {
    setLoading(true);

    setError(null);

    try {
      const data = await getAnalytics(startDate, endDate);

      setAnalytics(data);
    } catch (err) {
      console.error(err);

      setError("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return {
    analytics,
    loading,
    error,
    fetchAnalytics,
  };
};
