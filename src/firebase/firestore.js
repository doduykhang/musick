import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDmpSmuwGD65GNOdTRq3f9-ZChLt6yFlIQ",
  authDomain: "musick-1f41a.firebaseapp.com",
  projectId: "musick-1f41a",
  storageBucket: "musick-1f41a.appspot.com",
  messagingSenderId: "123209367037",
  appId: "1:123209367037:web:fac0d6f8075f0457f66d94",
  measurementId: "G-VDYE19LXG1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;