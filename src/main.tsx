import React from "react";
import ReactDOM from "react-dom/client";

import "./assets/css/reset.css";
import "./assets/css/global.css";
import "./assets/css/responsive.css";
import "./assets/css/themes.css";

import App from "./App";

ReactDOM.createRoot(
  document.getElementById("root")!,
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);