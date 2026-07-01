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
      submit your creative work, track deadlines,
      and build an outstanding design portfolio.
    </p>

    <button
      className="hero-btn"
      onClick={() => window.location.href="/competitions"}
    >
      Explore Competitions 🚀
    </button>

  </div>

  <div className="hero-image">

    <img
      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900"
      alt="Hero"
    />

  </div>

</section>
  );
}

export default Hero;