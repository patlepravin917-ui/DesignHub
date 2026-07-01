import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

        <div className="hero-content">

          <h1>
            Discover Amazing <span>Design Competitions</span>
          </h1>

          <p>
            Find national and international design competitions,
            submit your creative work, win exciting prizes and
            build your professional portfolio.
          </p>

          <button
            className="hero-btn"
            onClick={() => navigate("/competitions")}
          >
            Explore Competitions 🚀
          </button>

        </div>

        <div className="hero-image">

          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900"
            alt="Design Competition"
          />

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