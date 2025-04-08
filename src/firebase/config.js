// Ensure db is exported
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0ADDDu9VxQJR7qINUX8JWJMTL_UO4h04",
  authDomain: "empolyeesystem.firebaseapp.com",
  projectId: "empolyeesystem",
  storageBucket: "empolyeesystem.firebasestorage.app",
  messagingSenderId: "490333178500",
  appId: "1:490333178500:web:0eaf0fc194dbc17c1410d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);

export { db };