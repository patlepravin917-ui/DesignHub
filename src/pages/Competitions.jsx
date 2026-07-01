import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CompetitionCard from "../components/CompetitionCard";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";
import Footer from "../components/Footer";

import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

import toast from "react-hot-toast";

function Competitions() {
  const [competitions, setCompetitions] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompetitions();
  }, []);

  const fetchCompetitions = async () => {
    try {
      const snapshot = await getDocs(collection(db, "competitions"));

      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCompetitions(list);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load competitions.");
    } finally {
      setLoading(false);
    }
  };

  const filteredCompetitions = competitions.filter((competition) => {
    return (
      competition.title
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      competition.category
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />

      <section className="featured-section">

        <h2>🏆 Explore All Design Competitions</h2>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "25px",
          }}
        >
          Discover national and international competitions,
          participate, showcase your creativity, and build
          your professional portfolio.
        </p>

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        {filteredCompetitions.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
            }}
          >
            <h3>😔 No competitions found.</h3>

            <p style={{ color: "#666" }}>
              Try searching with another keyword.
            </p>
          </div>
        ) : (
          <div className="competition-grid">
            {filteredCompetitions.map((competition) => (
              <CompetitionCard
                key={competition.id}
                competition={competition}
              />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}

export default Competitions;