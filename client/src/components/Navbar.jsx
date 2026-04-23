import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAdminLoggedIn, logoutAdmin } = useAuth();
  const navigate = useNavigate();

  const onAdminLogout = () => {
    logoutAdmin();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Home Tuition Hub
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/post-tuition">
                Post Tuition
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/vishal-kumar">
                Expert Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/tutor/register">
                Become Tutor
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/tutor/login">
                Tutor Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link fw-medium text-primary" to="/contact">
                Contact Us
              </NavLink>
            </li>
            {isAdminLoggedIn && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin/dashboard">
                  Admin Dashboard
                </NavLink>
              </li>
            )}
          </ul>
          {!isAdminLoggedIn ? (
            <Link className="btn btn-primary btn-sm" to="/admin/login">
              Admin Login
            </Link>
          ) : (
            <button className="btn btn-danger btn-sm" onClick={onAdminLogout}>
              Admin Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
