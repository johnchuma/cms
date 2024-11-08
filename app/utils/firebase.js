// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgND6WhevA9z2uyRrOHrz5nh3kvKI8EZQ",
  authDomain: "cmsproject-27cc6.firebaseapp.com",
  projectId: "cmsproject-27cc6",
  storageBucket: "cmsproject-27cc6.appspot.com",
  messagingSenderId: "810111056050",
  appId: "1:810111056050:web:929ccc4d97f8d3f065f1ab",
  measurementId: "G-DJWF7YDN7T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
