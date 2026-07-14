import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFolderOpen,
  FaRocket,
  FaTrophy,
  FaCheckCircle,
  FaPlusCircle,
  FaCompass,
  FaUserEdit,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import { auth, db } from "../firebase/firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import toast from "react-hot-toast";

function Dashboard() {
  const navigate = useNavigate();
  const [submissionCount, setSubmissionCount] = useState(0);
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchDashboard();
  }, []);
  const fetchDashboard = async () => {
    try {
      if (!auth.currentUser) return;
      const q = query(
        collection(db, "submissions"),
        where(
          "email",
          "==",
          auth.currentUser.email
        )
      );
      const snapshot = await getDocs(q);
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      list.reverse();
      setSubmissionCount(list.length);
      setRecentProjects(list.slice(0, 5));
    } catch (error) {
      console.error(error);
      toast.error("Unable to load dashboard.");
    } finally {
      setLoading(false);

    }
  };
  if (loading) {
    return <Loading />;
  }
    return (
    <>
      <Navbar />

      <div className="dashboard-page">

        {/* Hero */}

        <section className="dashboard-hero">

          <div className="dashboard-hero-left">

            <span className="dashboard-badge">
              🚀 Welcome Back
            </span>

            <h1>
              Hello,{" "}
              {auth.currentUser?.displayName || "Student"} 👋
            </h1>

            <p>
              Manage your submitted projects, discover new design
              competitions and keep building your creative portfolio.
            </p>

            <div className="dashboard-actions">

              <button
                className="hero-btn"
                onClick={() => navigate("/submit")}
              >
                <FaPlusCircle />
                Submit Project
              </button>

              <button
                className="secondary-btn"
                onClick={() => navigate("/competitions")}
              >
                <FaCompass />
                Explore
              </button>

              <button
                className="secondary-btn"
                onClick={() => navigate("/profile")}
              >
                <FaUserEdit />
                Profile
              </button>

            </div>
              <div className="dashboard-hero-right">

              <img
                 src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900"
                 alt="Dashboard"
              />

             </div>
          </div>

        </section>

        {/* Statistics */}

        <section className="dashboard-stats">

          <div className="dashboard-card">

            <FaFolderOpen className="dashboard-icon" />

            <h2>{submissionCount}</h2>

            <p>Projects Submitted</p>

          </div>

          <div className="dashboard-card">

            <FaRocket className="dashboard-icon" />

            <h2>{recentProjects.length}</h2>

            <p>Recent Projects</p>

          </div>

          <div className="dashboard-card">

            <FaCheckCircle className="dashboard-icon" />

            <h2>Active</h2>

            <p>Account Status</p>

          </div>

          <div className="dashboard-card">

            <FaTrophy className="dashboard-icon" />

            <h2>100%</h2>

            <p>Profile Ready</p>

          </div>

        </section>

        {/* Recent Projects */}

        <section className="recent-projects">

          <div className="section-title">

            <h2>📂 Recent Projects</h2>

            <p>
              Your latest competition submissions.
            </p>

          </div>

          {recentProjects.length === 0 ? (

            <div className="empty-projects">

              <h3>No Projects Yet 🚀</h3>

              <p>
                Submit your first project and it will appear here.
              </p>

              <button
                className="hero-btn"
                onClick={() => navigate("/submit")}
              >
                Submit First Project
              </button>

            </div>

          ) : (

            <div className="recent-projects-grid">

              {recentProjects.map((project) => (

                <div
                  className="project-card"
                  key={project.id}
                >

                  <h3>{project.title}</h3>

                  <p>

                    <strong>Competition:</strong>{" "}

                    {project.competition}

                  </p>

                  <p>

                    <strong>Status:</strong>{" "}

                    <span
                      className={
                        project.status === "Approved"
                          ? "approved"
                          : project.status === "Rejected"
                          ? "rejected"
                          : "submitted"
                      }
                    >
                      {project.status}
                    </span>

                  </p>

                </div>

              ))}

            </div>

          )}

        </section>

        {/* Achievement */}

        <section className="achievement-section">

          <h2>🏆 Achievements</h2>

          <div className="achievement-grid">

            <div className="achievement-card">

              <h3>🥇 First Submission</h3>

              <p>
                Congratulations on becoming a DesignHub creator.
              </p>

            </div>

            <div className="achievement-card">

              <h3>🎨 Creative Designer</h3>

              <p>
                Keep participating to unlock more achievements.
              </p>

            </div>

            <div className="achievement-card">

              <h3>🚀 Active Member</h3>

              <p>
                Stay active and build your professional portfolio.
              </p>

            </div>

          </div>

        </section>

      </div>

      <Footer />

    </>
  );

}

export default Dashboard;