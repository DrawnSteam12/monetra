import { useState } from "react";

import type { ReactNode } from "react";

import Sidebar from "../sidebar/Sidebar";

import TopNavbar from "../top-navbar/TopNavbar";

import "../../../../../assets/css/features/dashboard/dashboard-layout.css";

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="dashboard-main">
        <TopNavbar setSidebarOpen={setSidebarOpen} />

        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
