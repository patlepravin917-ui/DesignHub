import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import { db } from "../firebase/firebase";
import Footer from "../components/Footer";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  orderBy,
  query,
} from "firebase/firestore";

function Admin() {
  const [competitionList, setCompetitionList] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [prize, setPrize] = useState("");
  const [deadline, setDeadline] = useState("");

  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [eligibility, setEligibility] = useState("");

  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [totalCompetitions, setTotalCompetitions] = useState(0);
  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const [totalPrize, setTotalPrize] = useState(0);

  useEffect(() => {
    fetchCompetitions();
    fetchSubmissions();
  }, []);

  const fetchCompetitions = async () => {
    const querySnapshot = await getDocs(collection(db, "competitions"));

    const list = querySnapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));

    setCompetitionList(list);
    setTotalCompetitions(list.length);

    const total = list.reduce((sum, item) => {
      const prize =
        Number(item.prize?.toString().replace(/[^\d]/g, "")) || 0;

      return sum + prize;
    }, 0);

    setTotalPrize(total);
  };

  const fetchSubmissions = async () => {
    const q = query(
      collection(db, "submissions"),
      orderBy("submittedAt", "desc")
    );

    const querySnapshot = await getDocs(q);

    const list = querySnapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));

    setSubmissions(list);
    setTotalSubmissions(list.length);
  };

  const addCompetition = async () => {
    if (
      !title ||
      !category ||
      !prize ||
      !deadline ||
      !image ||
      !description ||
      !eligibility
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      if (isEditing) {
        await updateDoc(doc(db, "competitions", editId), {
          title,
          category,
          prize,
          deadline,
          image,
          description,
          eligibility,
        });
        toast.success("Competition Updated Successfully ✅");

        setIsEditing(false);
        setEditId(null);

      } else {
        await addDoc(collection(db, "competitions"), {
          title,
          category,
          prize,
          deadline,
          image,
          description,
          eligibility,
        });
        toast.success("Competition Added Successfully ✅");
      }

      setTitle("");
      setCategory("");
      setPrize("");
      setDeadline("");
      setImage("");
      setDescription("");
      setEligibility("");

      fetchCompetitions();

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };
    const deleteCompetition = async (id) => {
    await deleteDoc(doc(db, "competitions", id));
    toast.success("Competition deleted successfully ✅");
    fetchCompetitions();
  };

  const deleteSubmission = async (id) => {
    await deleteDoc(doc(db, "submissions", id));
    toast.success("Submission deleted successfully ✅");
    fetchSubmissions();
  };

  const updateSubmissionStatus = async (id, status) => {
    await updateDoc(doc(db, "submissions", id), {
      status,
    });
     toast.success(`Project ${status}`);
    fetchSubmissions();
  };

  const editCompetition = (competition) => {
    setTitle(competition.title || "");
    setCategory(competition.category || "");
    setPrize(competition.prize || "");
    setDeadline(competition.deadline || "");
    setImage(competition.image || "");
    setDescription(competition.description || "");
    setEligibility(competition.eligibility || "");

    setEditId(competition.id);
    setIsEditing(true);
  };

  return (
    <>
      <Navbar />

      <div className="admin-container">
        <h1>Admin Dashboard 👨‍💼</h1>

        <p>Manage competitions from here.</p>

        <div className="admin-stats">
          <div className="stat-card">
            <h3>Total Competitions</h3>
            <h2>{totalCompetitions}</h2>
          </div>

          <div className="stat-card">
            <h3>Total Submissions</h3>
            <h2>{totalSubmissions}</h2>
          </div>

          <div className="stat-card">
            <h3>Total Prize</h3>
            <h2>₹ {totalPrize.toLocaleString()}</h2>
          </div>
        </div>

        <div className="admin-form">
          <input
            type="text"
            placeholder="Competition Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <input
            type="text"
            placeholder="Prize"
            value={prize}
            onChange={(e) => setPrize(e.target.value)}
          />

          <input
            type="text"
            placeholder="Deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />

          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <textarea
            rows="4"
            placeholder="Competition Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="text"
            placeholder="Eligibility"
            value={eligibility}
            onChange={(e) => setEligibility(e.target.value)}
          />

          <button onClick={addCompetition}>
            {isEditing ? "Update Competition" : "Add Competition"}
          </button>
        </div>

        <div className="competition-table">
          <h2>Manage Competitions</h2>

          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Prize</th>
                <th>Deadline</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {competitionList.map((competition) => (
                <tr key={competition.id}>
                  <td>{competition.title}</td>
                  <td>{competition.category}</td>
                  <td>{competition.prize}</td>
                  <td>{competition.deadline}</td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => editCompetition(competition)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteCompetition(competition.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
                <div className="competition-table">
          <h2>Student Project Submissions</h2>

          <table>
            <thead>
              <tr>
                <th>Project</th>
                <th>Email</th>
                <th>Competition</th>
                <th>Project Link</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {submissions.map((submission) => (
                <tr key={submission.id}>
                  <td>{submission.title}</td>
                  <td>{submission.email}</td>
                  <td>{submission.competition}</td>

                  <td>
                    <a
                      href={submission.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Project
                    </a>
                  </td>

                  <td>{submission.description}</td>
                  <td>{submission.status || "Submitted"}</td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() =>
                        updateSubmissionStatus(
                          submission.id,
                          "Approved"
                        )
                      }
                    >
                      Approve
                    </button>

                    <button
                      className="reject-btn"
                      onClick={() =>
                        updateSubmissionStatus(
                          submission.id,
                          "Rejected"
                        )
                      }
                    >
                      Reject
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteSubmission(submission.id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
      <Footer />
    </>
  );
}

export default Admin;