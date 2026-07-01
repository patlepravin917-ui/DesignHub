import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          Discover Amazing <span>Design Competitions</span>
        </h1>

        <p>
          Find national and international design competitions,
          showcase your creativity, and win exciting prizes.
        </p>

        <Link to="/competitions">
          <button className="hero-btn">
            Explore Competitions 🚀
          </button>
        </Link>
      </div>

      <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900"
          alt="Design Competition"
        />
      </div>
    </section>
  );
}

export default Hero;