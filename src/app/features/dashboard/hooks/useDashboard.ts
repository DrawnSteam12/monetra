import { useEffect, useState } from "react";

import { getDashboard } from "../../../services/dashboard.service";

import type { DashboardResponse } from "../../../types/dashboard.types";

export const useDashboard = () => {
  const [dashboard, setDashboard] = useState<DashboardResponse | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = async () => {
    setLoading(true);

    setError(null);

    try {
      const data = await getDashboard();
      setDashboard(data);
    } catch {
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchDashboard();
  }, []);

  return {
    dashboard,
    loading,
    error,
    fetchDashboard,
  };
};
