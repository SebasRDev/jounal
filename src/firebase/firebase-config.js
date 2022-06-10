import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDx3kOgUxEvX9_2zPdgsfZCgdUxFbqvW7Y",
  authDomain: "react-journal-3934e.firebaseapp.com",
  projectId: "react-journal-3934e",
  storageBucket: "react-journal-3934e.appspot.com",
  messagingSenderId: "375611220021",
  appId: "1:375611220021:web:0a225a668d4d218920117c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const googleAuthProvider = new GoogleAuthProvider();

export {
  db,
  googleAuthProvider
}