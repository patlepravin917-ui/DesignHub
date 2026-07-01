import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import Footer from "../components/Footer";

import { auth, db } from "../firebase/firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import toast from "react-hot-toast";

function Dashboard() {
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
        where("email", "==", auth.currentUser.email)
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

      <div className="dashboard-header">

        <h1>
          Welcome, {auth.currentUser?.displayName || "Student"} 👋
        </h1>

        <p>
          Track your submitted projects, monitor their status,
          and participate in exciting design competitions.
        </p>

        <div className="dashboard-cards">

          <div className="dashboard-card">
            <h2>{submissionCount}</h2>
            <p>Projects Submitted</p>
          </div>

          <div className="dashboard-card">
            <h2>{recentProjects.length}</h2>
            <p>Recent Projects</p>
          </div>

          <div className="dashboard-card">
            <h2>🟢 Active</h2>
            <p>Account Status</p>
          </div>

        </div>

        <div className="recent-projects">

          <h2>📂 My Recent Projects</h2>

          {recentProjects.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "40px",
              }}
            >
              <h3>No projects submitted yet.</h3>

              <p style={{ color: "#666" }}>
                Submit your first project to see it here.
              </p>
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

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Dashboard;