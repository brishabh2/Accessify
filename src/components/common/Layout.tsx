import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import {
  FaTachometerAlt,
  FaUser,
  FaUsers,
  FaStore,
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.info("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <aside className="bg-dark text-white p-3" style={{ width: "240px" }}>
        {/* Brand */}
        <div className="mb-4">
          <h3 className="fw-bold">Accessify</h3>
          <span className="badge bg-primary text-uppercase">
            {user?.role || "Guest"}
          </span>
        </div>

        {/* Navigation */}
        <ul className="nav flex-column gap-1">
          <li className="nav-item">
            <NavLink
              className="nav-link text-white d-flex align-items-center gap-2"
              to="/dashboard"
            >
              <FaTachometerAlt /> Dashboard
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              className="nav-link text-white d-flex align-items-center gap-2"
              to="/profile"
            >
              <FaUser /> Profile
            </NavLink>
          </li>

          {user?.role === "superadmin" && (
            <li className="nav-item">
              <NavLink
                className="nav-link text-white d-flex align-items-center gap-2"
                to="/users"
              >
                <FaUsers /> User Management
              </NavLink>
            </li>
          )}

          <li className="nav-item">
            <NavLink
              className="nav-link text-white d-flex align-items-center gap-2"
              to="/shop"
            >
              <FaStore /> Shop
            </NavLink>
          </li>

          {user?.role === "user" && (
            <li className="nav-item">
              <NavLink
                className="nav-link text-white d-flex align-items-center gap-2"
                to="/cart"
              >
                <FaShoppingCart /> Cart
              </NavLink>
            </li>
          )}

          <li className="nav-item mt-4">
            <button
              className="btn btn-danger w-100 d-flex align-items-center gap-2"
              onClick={handleLogout}
            >
              <FaSignOutAlt /> Logout
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-grow-1 p-4 bg-light">{children}</main>
    </div>
  );
};

export default Layout;
