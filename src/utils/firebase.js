// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApN4VEp7jbTy10VuglBtKnLbxvL1D2QPA",
  authDomain: "netflix-gpt-86b8e.firebaseapp.com",
  projectId: "netflix-gpt-86b8e",
  storageBucket: "netflix-gpt-86b8e.appspot.com",
  messagingSenderId: "350784219774",
  appId: "1:350784219774:web:90d672b460193a4258c62f",
  measurementId: "G-CC8H0MVL0M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
