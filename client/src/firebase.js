// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-5cf0d.firebaseapp.com",
  projectId: "mern-estate-5cf0d",
  storageBucket: "mern-estate-5cf0d.appspot.com",
  messagingSenderId: "218923206023",
  appId: "1:218923206023:web:94a05e8a7fe7aca9efff22"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);