import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { auth, db } from "../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import Footer from "../components/Footer";

function Profile() {
  const [projectCount, setProjectCount] = useState(0);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const q = query(
        collection(db, "submissions"),
        where("email", "==", auth.currentUser.email)
      );

      const snapshot = await getDocs(q);

      setProjectCount(snapshot.size);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-avatar">
            👤
          </div>

          <h1>
            {auth.currentUser?.displayName || "Student"}
          </h1>

          <p>{auth.currentUser?.email}</p>

          <div className="profile-info">

            <div className="info-box">
              <h3>Total Projects</h3>
              <p>{projectCount}</p>
            </div>

            <div className="info-box">
              <h3>Status</h3>
              <p>Active ✅</p>
            </div>

            <div className="info-box">
              <h3>User ID</h3>
              <small>{auth.currentUser?.uid}</small>
            </div>

          </div>
        </div>
      </div>
    <Footer />
    </>
  );
}

export default Profile;

