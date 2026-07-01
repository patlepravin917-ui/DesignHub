import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function NotFound() {
  return (
    <>
      <Navbar />

      <div className="notfound-container">
        <h1>404</h1>

        <h2>Page Not Found 😔</h2>

        <p>
          Sorry, the page you are looking for doesn't exist.
        </p>

        <Link to="/">
          <button className="home-btn">
            Go Back Home 🏠
          </button>
        </Link>
      </div>
    </>
  );
}

export default NotFound;