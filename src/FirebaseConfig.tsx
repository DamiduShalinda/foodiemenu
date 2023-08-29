// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCbVlVATNftx1OsZiiVyWSIWiMDQ2iFvf4",
  authDomain: "foodie-menu-7e97b.firebaseapp.com",
  projectId: "foodie-menu-7e97b",
  storageBucket: "foodie-menu-7e97b.appspot.com",
  messagingSenderId: "795238632358",
  appId: "1:795238632358:web:a13863dbaa57e399a15d67",
  measurementId: "G-GD5X3BWQN7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)