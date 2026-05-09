import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbhL0YFYKnwyc0GgvJ9Jo5NMEiPkD_syU",
  authDomain: "my-healthcare-nlu.firebaseapp.com",
  projectId: "my-healthcare-nlu",
  storageBucket: "my-healthcare-nlu.appspot.com",   // ✅ fixed domain
  messagingSenderId: "253648671735",
  appId: "1:253648671735:web:ad443b8a5d2ac985ae14f2"
  // measurementId is optional
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

