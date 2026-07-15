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
  const [category, setCategory] = useState("All");

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

    const matchSearch =
      competition.title?.toLowerCase().includes(search.toLowerCase()) ||
      competition.category?.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      category === "All" ||
      competition.category === category;

    return matchSearch && matchCategory;

  });

  if (loading) {
    return <Loading />;
  }

  return (

    <>

      <Navbar />

      <div className="competitions-page">
                {/* Hero Section */}

        <section className="competitions-hero">

          <div className="competitions-hero-left">

            <span className="hero-badge">
              🌍 Global Design Opportunities
            </span>

            <h1>
              Explore Amazing
              <span> Design Competitions</span>
            </h1>

            <p>
              Browse national and international design competitions,
              participate, showcase your creativity and build a
              professional portfolio that stands out.
            </p>

          </div>

          <div className="competitions-hero-right">

            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900"
              alt="Competitions"
            />

          </div>

        </section>

        {/* Statistics */}

        <section className="competition-stats">

          <div className="dashboard-card">

            <h2>{competitions.length}</h2>

            <p>Total Competitions</p>

          </div>

          <div className="dashboard-card">

            <h2>50K+</h2>

            <p>Students Joined</p>

          </div>

          <div className="dashboard-card">

            <h2>₹10M+</h2>

            <p>Prize Pool</p>

          </div>

          <div className="dashboard-card">

            <h2>100+</h2>

            <p>Organizations</p>

          </div>

        </section>

        {/* Search */}

        <section className="featured-section">

          <h2>Browse Competitions</h2>

          <SearchBar
            search={search}
            setSearch={setSearch}
          />

          <div className="filter-buttons">

            <button onClick={() => setCategory("All")}>
              All
            </button>

            <button onClick={() => setCategory("UI/UX")}>
              UI/UX
            </button>

            <button onClick={() => setCategory("Graphic Design")}>
              Graphic Design
            </button>

            <button onClick={() => setCategory("Architecture")}>
              Architecture
            </button>

          </div>
                    {filteredCompetitions.length === 0 ? (

            <div className="empty-projects">

              <h3>😔 No Competitions Found</h3>

              <p>
                Try searching with another keyword or category.
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

        {/* Why Participate */}

        <section className="achievement-section">

          <h2>Why Participate?</h2>

          <div className="achievement-grid">

            <div className="achievement-card">

              <h3>🏆 Win Exciting Prizes</h3>

              <p>
                Participate in competitions and earn certificates,
                cash prizes and recognition.
              </p>

            </div>

            <div className="achievement-card">

              <h3>🎨 Build Your Portfolio</h3>

              <p>
                Showcase your best work and strengthen your design portfolio.
              </p>

            </div>

            <div className="achievement-card">

              <h3>🌍 Get Global Exposure</h3>

              <p>
                Compete with talented designers from around the world.
              </p>

            </div>

          </div>

        </section>
              </div>

      <Footer />

    </>

  );

}

export default Competitions;