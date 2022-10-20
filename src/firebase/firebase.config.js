// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBj7oZNnMTiI8_NqYyp7Mlz2cO4CS_9OE",
  authDomain: "photo-tagging-11145.firebaseapp.com",
  projectId: "photo-tagging-11145",
  storageBucket: "photo-tagging-11145.appspot.com",
  messagingSenderId: "434861328902",
  appId: "1:434861328902:web:b8cf8d4f72817fcef81187",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const store = getFirestore(app);
