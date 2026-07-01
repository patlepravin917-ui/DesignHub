import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Temp";
import { logoutUser } from "../services/auth";
import toast from "react-hot-toast";

function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();

      toast.success("Logged out successfully 👋");

      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className="navbar">
      <h2 className="logo">DesignHub</h2>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/competitions">Competitions</Link>
        </li>

        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link to="/submit">Submit Project</Link>
        </li>

        <li>
          <Link to="/profile">Profile</Link>
        </li>

        {user ? (
          <li>
            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;