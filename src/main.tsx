import React from "react";
import ReactDOM from "react-dom/client";

import { AuthProvider } from "./app/features/auth/auth-context/AuthContext";

import { ThemeProvider } from "./app/context/theme-context/ThemeContext";

import { AppDataProvider } from "./app/context/app-data-context/AppDataContext";

import "./assets/css/reset.css";
import "./assets/css/global.css";
import "./assets/css/responsive.css";
import "./assets/css/themes.css";
import "./assets/css/utilities.css";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <AppDataProvider>
          <App />
        </AppDataProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
