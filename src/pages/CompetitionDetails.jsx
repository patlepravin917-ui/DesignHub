import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

import { db } from "../firebase/firebase";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import toast from "react-hot-toast";

function CompetitionDetails() {

  const { id } = useParams();

  const [competition, setCompetition] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompetition();
  }, []);

  const fetchCompetition = async () => {

    try {

      const docRef = doc(
        db,
        "competitions",
        id
      );

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {

        setCompetition({

          id: docSnap.id,

          ...docSnap.data(),

        });

      } else {

        setCompetition(null);

      }

    } catch (error) {

      console.error(error);

      toast.error("Failed to load competition.");

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return <Loading />;

  }

  if (!competition) {

    return (

      <>

        <Navbar />

        <div className="not-found-page">

          <h1>
            😔 Competition Not Found
          </h1>

          <p>
            This competition doesn't exist or may have been removed.
          </p>

          <Link to="/competitions">

            <button className="apply-btn">

              ← Back to Competitions

            </button>

          </Link>

        </div>

        <Footer />

      </>

    );

  }

  return (

    <>

      <Navbar />

      <div className="details-page">

        {/* Hero Section */}
        <section className="details-hero">

          <div className="details-left">

            <span className="details-category">
              {competition.category || "Design Competition"}
            </span>

            <h1>
              {competition.title}
            </h1>

            <p className="details-short">

              {competition.description ||

                "Showcase your creativity by participating in this exciting design competition and build your professional portfolio."

              }

            </p>

            <div className="details-buttons">

              <Link
                to="/submit"
                state={{
                  competition: competition.title,
                }}
              >

                <button className="apply-btn">

                  🚀 Apply Now

                </button>

              </Link>

              <Link to="/competitions">

                <button className="secondary-btn">

                  ← Back

                </button>

              </Link>

            </div>

          </div>

          <div className="details-right">

            <img

              src={
                competition.image ||
                "https://via.placeholder.com/900x500?text=DesignHub"
              }

              alt={competition.title}

            />

          </div>

        </section>

        {/* Information Cards */}

        <section className="details-info-grid">

          <div className="info-card">

            <h3>🏆 Prize</h3>

            <p>

              {competition.prize ||

                "To Be Announced"}

            </p>

          </div>

          <div className="info-card">

            <h3>📅 Deadline</h3>

            <p>

              {competition.deadline ||

                "Coming Soon"}

            </p>

          </div>

          <div className="info-card">

            <h3>✅ Eligibility</h3>

            <p>

              {competition.eligibility ||

                "Open for Everyone"}

            </p>

          </div>

        </section>
                {/* Description */}

        <section className="details-section">

          <div className="details-card">

            <h2>📝 Competition Description</h2>

            <p>
              {competition.description ||
                "No description available for this competition."}
            </p>
          </div>

          <div className="details-card">
            <h2>📌 Eligibility</h2>
            <p>
              {competition.eligibility ||
                "Open for all students and designers."}
            </p>
          </div>
        </section>

        {/* Highlights */}

        <section className="details-highlights">

          <h2>✨ Competition Highlights</h2>

          <div className="highlight-grid">

            <div className="highlight-card">
              <h3>🌍 Global Opportunity</h3>
              <p>
                Participate in national and international design competitions.
              </p>
            </div>

            <div className="highlight-card">
              <h3>🏆 Exciting Rewards</h3>
              <p>
                Win certificates, cash prizes and exciting recognition.
              </p>
            </div>

            <div className="highlight-card">
              <h3>🎨 Build Portfolio</h3>
              <p>
                Showcase your creativity and strengthen your professional portfolio.
              </p>
            </div>
          </div>
        </section>

        {/* Registration Status */}

        <section className="registration-section">
          <div className="registration-card">
            <h2>Registration Status</h2>
            <span className="registration-open">
              🟢 Registration Open
            </span>
            <p>
              Submit your project before the deadline to participate.
            </p>

            <Link
              to="/submit"
              state={{
                competition: competition.title,
              }}
            >
              <button className="apply-btn">
                Apply Now 🚀
              </button>
            </Link>
          </div>
        </section>
        </div>
      <Footer />
    </>
  );
}
export default CompetitionDetails;