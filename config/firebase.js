// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0vmE5ZvTf8GObnDcG_-U0oNQzSXkc_cg",
  authDomain: "login-pruebas-94dc2.firebaseapp.com",
  databaseURL: "https://login-pruebas-94dc2-default-rtdb.firebaseio.com",
  projectId: "login-pruebas-94dc2",
  storageBucket: "login-pruebas-94dc2.firebasestorage.app",
  messagingSenderId: "719212751678",
  appId: "1:719212751678:web:eaa1b041102d024dfbda6f",
  measurementId: "G-YC44WC2RNZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//exportar y obtener la instancia de auth
const auth = getAuth(app);

const analytics = getAnalytics(app);
const database = getDatabase(app);

export { database, analytics, auth };
export default app;
