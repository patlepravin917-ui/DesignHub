import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CompetitionCard from "../components/CompetitionCard";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

function Home() {
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
      competition.title.toLowerCase().includes(search.toLowerCase()) ||
      competition.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      competition.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />

      <section className="hero">
        <div className="hero-content">
          <h1>
            Discover Amazing <span>Design Competitions</span>
          </h1>

          <p>
            Find national and international competitions, submit your creative
            work, track deadlines, and build an outstanding design portfolio.
          </p>

          <button className="hero-btn" onClick={() => window.location.href = "/competitions"}>
            Explore Competitions
          </button>
        </div>
      </section>

      <section className="featured-section">
        <h2>Featured Competitions</h2>

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <div className="filter-buttons">
          <button onClick={() => setSelectedCategory("All")}>
            All
          </button>

          <button onClick={() => setSelectedCategory("UI/UX")}>
            UI/UX
          </button>

          <button onClick={() => setSelectedCategory("Graphic Design")}>
            Graphic Design
          </button>

          <button onClick={() => setSelectedCategory("Architecture")}>
            Architecture
          </button>
        </div>

        <div className="competition-grid">
          {filteredCompetitions.map((competition) => (
            <CompetitionCard
              key={competition.id}
              competition={competition}
            />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Home;