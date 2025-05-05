// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator  } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZConHb8WwdbyPF9hMbCiNqSWdnJONYYM",
  authDomain: "pantry-tracker-e914d.firebaseapp.com",
  projectId: "pantry-tracker-e914d",
  storageBucket: "pantry-tracker-e914d.firebasestorage.app",
  messagingSenderId: "1016572786951",
  appId: "1:1016572786951:web:5586d2dd2a5ce204456da2",
  measurementId: "G-G6PMK4VBE4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator (auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8080);
}

export {auth, analytics, db}