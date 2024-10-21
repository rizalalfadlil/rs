// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAFiCMJutWWkDBF52egOQMVRrK0wcw-Afc",
  authDomain: "rsbe-387fb.firebaseapp.com",
  projectId: "rsbe-387fb",
  storageBucket: "rsbe-387fb.appspot.com",
  messagingSenderId: "56363139770",
  appId: "1:56363139770:web:5cb69d5df3f1766324b883",
  measurementId: "G-DB8V9FQGSJ"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)