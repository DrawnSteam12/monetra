import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoadingSpinner from "../components/common/Loading/LoadingSpinner";

import ProtectedRoute from "./ProtectedRoute";

const LoginPage = lazy(() => import("../features/auth/pages/LoginPage"));

const SignupPage = lazy(() => import("../features/auth/pages/SignupPage"));

const DashboardPage = lazy(
  () => import("../features/dashboard/pages/DashboardPage"),
);

const TransactionsPage = lazy(
  () => import("../features/transactions/pages/TransactionsPage"),
);

const AnalyticsPage = lazy(
  () => import("../features/analytics/pages/AnalyticsPage"),
);

const ProfilePage = lazy(() => import("../features/profile/pages/ProfilePage"));

const SettingsPage = lazy(
  () => import("../features/settings/pages/SettingsPage"),
);
const GeneralSettingsPage = lazy(
  () => import("../features/settings/pages/GeneralSettingsPage"),
);

const ThemeSettingsPage = lazy(
  () => import("../features/settings/pages/ThemeSettingsPage"),
);

const NotificationSettingsPage = lazy(
  () => import("../features/settings/pages/NotificationSettingsPage"),
);

const SecuritySettingsPage = lazy(
  () => import("../features/settings/pages/SecuritySettingsPage"),
);

const BudgetAlertSettingsPage = lazy(
  () => import("../features/settings/pages/BudgetAlertSettingsPage"),
);

const DataPrivacySettingsPage = lazy(
  () => import("../features/settings/pages/DataPrivacySettingsPage"),
);

const DeleteAccountSettingsPage = lazy(
  () => import("../features/settings/pages/DeleteAccountSettingsPage"),
);

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <TransactionsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <AnalyticsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings/general"
            element={
              <ProtectedRoute>
                <GeneralSettingsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings/theme"
            element={
              <ProtectedRoute>
                <ThemeSettingsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings/notifications"
            element={
              <ProtectedRoute>
                <NotificationSettingsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings/security"
            element={
              <ProtectedRoute>
                <SecuritySettingsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings/budget-alert"
            element={
              <ProtectedRoute>
                <BudgetAlertSettingsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings/data-privacy"
            element={
              <ProtectedRoute>
                <DataPrivacySettingsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings/delete-account"
            element={
              <ProtectedRoute>
                <DeleteAccountSettingsPage />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/signup" element={<SignupPage />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
