// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyk41yYPysuvQmSAa9vwYnWP-sbU1qt54",
  authDomain: "media-webapp.firebaseapp.com",
  projectId: "media-webapp",
  storageBucket: "media-webapp.appspot.com",
  messagingSenderId: "804913660095",
  appId: "1:804913660095:web:1a30f3b01c72da9385460a",
  measurementId: "G-90Z60ZFVCL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
