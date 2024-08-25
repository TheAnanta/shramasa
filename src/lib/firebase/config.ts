// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIDM9iDU2AZHOjzbKnlUxiyQO3_plRl5o",
  authDomain: "shramasa-care.firebaseapp.com",
  projectId: "shramasa-care",
  storageBucket: "shramasa-care.appspot.com",
  messagingSenderId: "755136036470",
  appId: "1:755136036470:web:e81741063bec1690a6a957",
  measurementId: "G-8CRPQETYXT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

if (typeof window !== 'undefined') {
  const analytics = getAnalytics(app);
}

export { auth };
