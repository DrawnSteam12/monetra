import { HiOutlineBell, HiOutlineSearch, HiOutlineMenu } from "react-icons/hi";

import { useAuth } from "../../../auth/auth-context/AuthContext";

type TopNavbarProps = {
  setSidebarOpen: (value: boolean) => void;
};

const TopNavbar = ({ setSidebarOpen }: TopNavbarProps) => {
  const { user } = useAuth();

  return (
    <header className="top-navbar">
      <div className="top-navbar-left">
        <button className="menu-button" onClick={() => setSidebarOpen(true)}>
          <HiOutlineMenu />
        </button>

        <div>
          <h2>Dashboard</h2>

          <p>Welcome back, {user?.fullName}</p>
        </div>
      </div>

      <div className="top-navbar-right">
        <button className="navbar-icon-button">
          <HiOutlineSearch />
        </button>

        <button className="navbar-icon-button">
          <HiOutlineBell />
        </button>

        <div className="navbar-user">
          <div className="user-avatar">{user?.fullName?.charAt(0)}</div>

          <div className="user-info" >
            <strong>{user?.fullName}</strong>

            <p>{user?.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
