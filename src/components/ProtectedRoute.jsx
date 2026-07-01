import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Temp";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

function AdminRoute({ children }) {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdmin();
  }, [user]);

  const checkAdmin = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const adminRef = doc(db, "admins", user.uid);
      const adminSnap = await getDoc(adminRef);

      if (
        adminSnap.exists() &&
        adminSnap.data().role === "admin"
      ) {
        setIsAdmin(true);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  if (loading) {
    return <h2>Checking Access...</h2>;
  }

  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoute;