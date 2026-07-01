import { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { auth, db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import toast from "react-hot-toast";

function SubmitProject() {
  const location = useLocation();

  const [title, setTitle] = useState("");
  const [competition, setCompetition] = useState(
    location.state?.competition || ""
  );
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !competition || !link || !description) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "submissions"), {
        title,
        competition,
        link,
        description,
        email: auth.currentUser?.email || "",
        uid: auth.currentUser?.uid || "",
        status: "Submitted",
        submittedAt: new Date(),
      });

      toast.success("Project Submitted Successfully 🚀");

      setTitle("");
      setCompetition("");
      setLink("");
      setDescription("");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <Navbar />

      <div className="submit-container">
        <div className="submit-card">
          <h1>🚀 Submit Your Project</h1>

          <p className="submit-subtitle">
            Submit your design project for evaluation.
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Project Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="text"
              placeholder="Competition Name"
              value={competition}
              onChange={(e) => setCompetition(e.target.value)}
            />

            <input
              type="url"
              placeholder="Project Link (GitHub / Drive)"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />

            <textarea
              rows="5"
              placeholder="Project Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button type="submit" className="submit-btn">
              Submit Project 🚀
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default SubmitProject;