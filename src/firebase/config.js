// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAb2Ndz-fLWpdgXtpweG4kFE0RZLu3r_es",
  authDomain: "login-eadc5.firebaseapp.com",
  projectId: "login-eadc5",
  storageBucket: "login-eadc5.firebasestorage.app",
  messagingSenderId: "746997032303",
  appId: "1:746997032303:web:f5ef9fd986dabe6240b49a",
  measurementId: "G-FXW68DJK3N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export default app;
