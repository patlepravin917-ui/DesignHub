import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CompetitionCard from "../components/CompetitionCard";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";
import Footer from "../components/Footer";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

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
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCompetitions = competitions.filter((competition) =>
    competition.title
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />

      <section className="featured-section">
        <h2>All Competitions</h2>

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        {filteredCompetitions.length === 0 ? (
          <h3 style={{ textAlign: "center", marginTop: "40px" }}>
            😔 No competitions found.
          </h3>
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