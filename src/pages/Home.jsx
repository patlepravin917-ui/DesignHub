import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaTrophy,
  FaUsers,
  FaAward,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import CompetitionCard from "../components/CompetitionCard";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";

import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
function Home() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    fetchCompetitions();
  }, []);

  const fetchCompetitions = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "competitions"));

      const list = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCompetitions(list);
    } catch (error) {
      console.error("Error fetching competitions:", error);
    }
  };

  const filteredCompetitions = competitions.filter((competition) => {
    const matchesSearch =
      competition.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      competition.category
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      competition.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />

      {/* Hero Section */}

      <section className="hero">

  <div className="hero-left">

    <span className="hero-badge">
      ⭐ Trusted by 5,000+ Designers Worldwide
    </span>

    <h1>
      Discover Amazing
      <span> Design Competitions</span>
    </h1>

    <p>
      Participate in national and international design competitions,
      showcase your creativity, win exciting prizes and build a
      professional portfolio that stands out.
    </p>

    <div className="hero-buttons">

      <button
        className="hero-btn"
        onClick={() => navigate("/competitions")}
      >
        Explore Competitions
        <FaArrowRight />
      </button>

      <button
        className="secondary-btn"
        onClick={() => navigate("/submit")}
      >
        Submit Project
      </button>

    </div>

    <div className="hero-stats">

      <div className="stat-card">
        <FaTrophy />
        <h2>500+</h2>
        <p>Competitions</p>
      </div>

      <div className="stat-card">
        <FaUsers />
        <h2>50K+</h2>
        <p>Students</p>
      </div>

      <div className="stat-card">
        <FaAward />
        <h2>₹10M+</h2>
        <p>Prize Pool</p>
      </div>

    </div>

  </div>

  <div className="hero-right">

    <img
      src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900"
      alt="DesignHub Hero"
    />

  </div>

</section>
      {/* Why Choose DesignHub */}

<section className="why-section">

  <h2>Why Choose DesignHub?</h2>

  <p className="why-subtitle">
    Everything you need to discover, participate and showcase your creativity.
  </p>

  <div className="why-grid">

    <div className="why-card">
      <div className="why-icon">🏆</div>

      <h3>Win Rewards</h3>

      <p>
        Participate in exciting competitions and win amazing prizes.
      </p>
    </div>

    <div className="why-card">
      <div className="why-icon">🌍</div>

      <h3>Global Opportunities</h3>

      <p>
        Discover national and international design competitions.
      </p>
    </div>

    <div className="why-card">
      <div className="why-icon">🚀</div>

      <h3>Build Portfolio</h3>

      <p>
        Showcase your projects and strengthen your professional portfolio.
      </p>
    </div>

  </div>

</section>
{/* How It Works */}

<section className="how-section">

  <h2>How It Works</h2>

  <p className="how-subtitle">
    Get started with DesignHub in just four simple steps.
  </p>

  <div className="how-grid">

    <div className="step-card">
      <span>1</span>
      <h3>Create Account</h3>
      <p>Sign up and create your DesignHub profile.</p>
    </div>

    <div className="step-card">
      <span>2</span>
      <h3>Explore</h3>
      <p>Browse national and international competitions.</p>
    </div>

    <div className="step-card">
      <span>3</span>
      <h3>Submit Project</h3>
      <p>Upload your project before the deadline.</p>
    </div>

    <div className="step-card">
      <span>4</span>
      <h3>Win Rewards</h3>
      <p>Get recognized and win exciting prizes.</p>
    </div>

  </div>

</section>

      {/* Featured */}

      <section className="featured-section">

        <h2>Featured Competitions</h2>

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <div className="filter-buttons">

          <button
            onClick={() => setSelectedCategory("All")}
          >
            All
          </button>

          <button
            onClick={() => setSelectedCategory("UI/UX")}
          >
            UI/UX
          </button>

          <button
            onClick={() => setSelectedCategory("Graphic Design")}
          >
            Graphic Design
          </button>

          <button
            onClick={() => setSelectedCategory("Architecture")}
          >
            Architecture
          </button>

        </div>

        <div className="competition-grid">

          {filteredCompetitions.length > 0 ? (

            filteredCompetitions.map((competition) => (
              <CompetitionCard
                key={competition.id}
                competition={competition}
              />
            ))

          ) : (

            <h3
              style={{
                textAlign: "center",
                width: "100%",
                color: "#666",
                marginTop: "40px",
              }}
            >
              No competitions available.
            </h3>

          )}

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Home;