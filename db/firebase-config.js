// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrCFJDG_pwsNrN-T5Vi6DVyF2sA5eNNXU",
  authDomain: "spice-and-dance.firebaseapp.com",
  projectId: "spice-and-dance",
  storageBucket: "spice-and-dance.appspot.com",
  messagingSenderId: "1083986831175",
  appId: "1:1083986831175:web:4c8c730c9c2dfee5938e62",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
