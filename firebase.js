// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAonaVYqnxB0_4h-9lxkQOEJ5733G57V5U",
  authDomain: "pc-shop-portfolio.firebaseapp.com",
  projectId: "pc-shop-portfolio",
  storageBucket: "pc-shop-portfolio.firebasestorage.app",
  messagingSenderId: "947838420993",
  appId: "1:947838420993:web:8e6d7539ae3b2049ac5800",
  measurementId: "G-FR6459JH2N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);