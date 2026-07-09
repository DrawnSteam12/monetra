import { Navigate } from "react-router-dom";

import type { ReactNode } from "react";

import { useAuth } from "../features/auth/auth-context/AuthContext";

import LoadingSpinner from "../components/common/Loading/LoadingSpinner";

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
