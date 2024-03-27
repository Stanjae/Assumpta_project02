// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZYnyLPKxLvrzCAnDRHpR89Cv_3JGR3KE",
  authDomain: "assumpta-ec37a.firebaseapp.com",
  projectId: "assumpta-ec37a",
  storageBucket: "assumpta-ec37a.appspot.com",
  messagingSenderId: "158994734115",
  appId: "1:158994734115:web:3af07b606a9ee1be562596",
  measurementId: "G-52X33MQCXQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const firebaseDb = getFirestore(app);
export const firebaseStorage = getStorage(app);
export const firebaseAuth = getAuth(app);