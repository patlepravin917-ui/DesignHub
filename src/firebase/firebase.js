import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCoI3qx3gDZOcmr6JO_N457-nq3GvCiiOI",
  authDomain: "student-design-platform.firebaseapp.com",
  projectId: "student-design-platform",
  storageBucket: "student-design-platform.firebasestorage.app",
  messagingSenderId: "417756732431",
  appId: "1:417756732431:web:b7da05765f5fe06a1b577a",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;