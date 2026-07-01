import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import Footer from "../components/Footer";

import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

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
      const docRef = doc(db, "competitions", id);

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

        <div
          style={{
            textAlign: "center",
            padding: "80px 20px",
          }}
        >
          <h1>😔 Competition Not Found</h1>

          <p style={{ marginTop: "15px" }}>
            This competition doesn't exist or may have been removed.
          </p>

          <Link to="/competitions">
            <button
              className="apply-btn"
              style={{ marginTop: "30px" }}
            >
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

      <div className="details-container">

        <img
          src={
            competition.image ||
            "https://via.placeholder.com/900x500?text=DesignHub"
          }
          alt={competition.title}
          className="details-image"
        />

        <div className="details-content">

          <span className="category">
            {competition.category}
          </span>

          <h1>{competition.title}</h1>

          <p>
            <strong>🏆 Prize:</strong>{" "}
            {competition.prize || "To Be Announced"}
          </p>

          <p>
            <strong>📅 Deadline:</strong>{" "}
            {competition.deadline || "Coming Soon"}
          </p>

          <p>
            <strong>📝 Description:</strong>
            <br />
            {competition.description ||
              "No description available."}
          </p>

          <p>
            <strong>✅ Eligibility:</strong>
            <br />
            {competition.eligibility || "Open for everyone"}
          </p>

          <p
            style={{
              color: "#16a34a",
              fontWeight: "bold",
              marginTop: "20px",
            }}
          >
            🟢 Registration Open
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

      </div>

      <Footer />
    </>
  );
}

export default CompetitionDetails;