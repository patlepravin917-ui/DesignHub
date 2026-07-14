import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-about">

          <h2>🎨 DesignHub</h2>

          <p>
            Discover, participate and showcase your creativity through
            national and international design competitions.
          </p>

        </div>

        <div className="footer-links">

          <h3>Quick Links</h3>

          <Link to="/">Home</Link>

          <Link to="/competitions">
            Competitions
          </Link>

          <Link to="/submit">
            Submit Project
          </Link>

          <Link to="/profile">
            Profile
          </Link>

        </div>

        <div className="footer-contact">

          <h3>Contact</h3>

          <p>Email: support@designhub.com</p>

          <div className="social-icons">

            <a href="#">
              <FaGithub />
            </a>

            <a href="#">
              <FaLinkedin />
            </a>

            <a href="mailto:support@designhub.com">
              <FaEnvelope />
            </a>

          </div>

        </div>

      </div>

      <hr />

      <p className="footer-copy">
        © 2026 DesignHub. All Rights Reserved.
      </p>

    </footer>
  );
}

export default Footer;