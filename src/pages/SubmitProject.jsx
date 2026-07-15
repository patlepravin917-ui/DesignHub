import { useState } from "react";
import { useLocation } from "react-router-dom";

import {
  FaPaperPlane,
  FaLink,
  FaFileAlt,
  FaTrophy,
  FaLightbulb,
  FaCheckCircle,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { auth, db } from "../firebase/firebase";

import {
  collection,
  addDoc,
} from "firebase/firestore";

import toast from "react-hot-toast";

function SubmitProject() {

  const location = useLocation();

  const [title, setTitle] = useState("");

  const [competition, setCompetition] = useState(
    location.state?.competition || ""
  );

  const [link, setLink] = useState("");

  const [description, setDescription] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !title ||
      !competition ||
      !link ||
      !description
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    if (!auth.currentUser) {
      toast.error("Please login first.");
      return;
    }

    try {

      setSubmitting(true);

      await addDoc(collection(db, "submissions"), {
        title,
        competition,
        link,
        description,
        email: auth.currentUser.email,
        uid: auth.currentUser.uid,
        status: "Submitted",
        submittedAt: new Date(),
      });

      toast.success("🎉 Project submitted successfully!");

      setTitle("");
      setCompetition("");
      setLink("");
      setDescription("");

    } catch (error) {

      console.error(error);

      toast.error("Failed to submit project.");

    } finally {

      setSubmitting(false);

    }

  };

  return (

    <>

      <Navbar />

      <div className="submit-page">
              {/* Hero */}

        <section className="submit-hero">

          <div className="submit-hero-left">

            <span className="hero-badge">
              🚀 Showcase Your Creativity
            </span>

            <h1>
              Submit Your
              <span> Design Project</span>
            </h1>

            <p>
              Upload your project and participate in exciting design
              competitions. Build your portfolio, gain recognition,
              and win amazing rewards.
            </p>

            <div className="submit-features">

              <div className="feature-item">
                <FaTrophy />
                <span>Win Exciting Prizes</span>
              </div>

              <div className="feature-item">
                <FaLightbulb />
                <span>Show Your Creativity</span>
              </div>

              <div className="feature-item">
                <FaCheckCircle />
                <span>Professional Portfolio</span>
              </div>

            </div>

          </div>

          <div className="submit-form-card">

            <h2>📤 Submit Project</h2>

            <form onSubmit={handleSubmit}>

              <label>Project Title</label>

              <input
                type="text"
                placeholder="Enter your project title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={submitting}
              />

              <label>Competition Name</label>

              <input
                type="text"
                placeholder="Competition name"
                value={competition}
                onChange={(e) => setCompetition(e.target.value)}
                disabled={submitting}
              />

              <label>Project Link</label>

              <div className="input-icon">

                <FaLink />

                <input
                  type="url"
                  placeholder="GitHub / Google Drive / Website"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  disabled={submitting}
                />

              </div>
                            <label>Project Description</label>

              <div className="input-icon textarea-box">

                <FaFileAlt />

                <textarea
                  rows="6"
                  placeholder="Describe your project, technologies used, features and objectives..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={submitting}
                />

              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={submitting}
              >

                <FaPaperPlane />

                {submitting
                  ? "Submitting..."
                  : "Submit Project"}

              </button>

            </form>

          </div>

        </section>

        {/* Submission Tips */}

        <section className="tips-section">

          <h2>💡 Submission Tips</h2>

          <div className="tips-grid">

            <div className="tip-card">

              <h3>🎯 Clear Title</h3>

              <p>
                Use a meaningful project title that clearly describes your work.
              </p>

            </div>

            <div className="tip-card">

              <h3>🔗 Valid Link</h3>

              <p>
                Share a working GitHub repository, Google Drive or website link.
              </p>

            </div>

            <div className="tip-card">

              <h3>📝 Good Description</h3>

              <p>
                Explain your project, features, technologies and objectives clearly.
              </p>

            </div>

          </div>

        </section>
              </div>

      <Footer />

    </>

  );

}

export default SubmitProject;