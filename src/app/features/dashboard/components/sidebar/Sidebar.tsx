import { NavLink } from "react-router-dom";

import {
  HiOutlineHome,
  HiOutlineChartBar,
  HiOutlineCreditCard,
  HiOutlineUser,
  HiOutlineCog,
  HiOutlineLogout,
} from "react-icons/hi";

import { useAuth } from "../../../auth/auth-context/AuthContext";

type SidebarProps = {
  sidebarOpen: boolean;

  setSidebarOpen: (value: boolean) => void;
};

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const { logout } = useAuth();

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar} />
      )}

      <aside className={`dashboard-sidebar ${sidebarOpen ? "open" : ""}`}>
        <h2>Monetra</h2>

        <nav className="sidebar-nav">
          <NavLink to="/" className="sidebar-link" onClick={closeSidebar}>
            <HiOutlineHome />
            Dashboard
          </NavLink>

          <NavLink
            to="/transactions"
            className="sidebar-link"
            onClick={closeSidebar}
          >
            <HiOutlineCreditCard />
            Transactions
          </NavLink>

          <NavLink
            to="/analytics"
            className="sidebar-link"
            onClick={closeSidebar}
          >
            <HiOutlineChartBar />
            Analytics
          </NavLink>

          <NavLink
            to="/profile"
            className="sidebar-link"
            onClick={closeSidebar}
          >
            <HiOutlineUser />
            Profile
          </NavLink>

          <NavLink
            to="/settings"
            className="sidebar-link"
            onClick={closeSidebar}
          >
            <HiOutlineCog />
            Settings
          </NavLink>

          <button className="logout-button" onClick={logout}>
            <HiOutlineLogout />
            Logout
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
