import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyBm5sMZ8PlacmoBeJ-puo9-8QiOiwBcHo8",
  authDomain: "blog-site-855b8.firebaseapp.com",
  projectId: "blog-site-855b8",
  storageBucket: "blog-site-855b8.appspot.com",
  messagingSenderId: "1084588240167",
  appId: "1:1084588240167:web:c103d965034b636a858d02",
  measurementId: "G-BC44XGZXT3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export  {app}
