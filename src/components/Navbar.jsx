import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../AuthContext";
import { logoutUser } from "../services/auth";
import toast from "react-hot-toast";

function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();

      toast.success("Logged out successfully 👋");

      setMenuOpen(false);

      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className="navbar">

      <Link
        to="/"
        className="logo"
        onClick={() => setMenuOpen(false)}
      >
        DesignHub 🚀
      </Link>

      <button
        className="menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>

        <li>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
        </li>

        <li>
          <Link
            to="/competitions"
            onClick={() => setMenuOpen(false)}
          >
            Competitions
          </Link>
        </li>

        {user && (
          <>
            <li>
              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/submit"
                onClick={() => setMenuOpen(false)}
              >
                Submit Project
              </Link>
            </li>

            <li>
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link>
            </li>
          </>
        )}

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
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
            >
             Login →
            </Link>
          </li>
        )}

      </ul>

    </nav>
  );
}

export default Navbar;