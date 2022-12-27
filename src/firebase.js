// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPwm1EA2V179BXiSOgwosbl9fc0xfCwtM",
  authDomain: "croptok-prod-7e7d9.firebaseapp.com",
  projectId: "croptok-prod-7e7d9",
  storageBucket: "croptok-prod-7e7d9.appspot.com",
  messagingSenderId: "165627113713",
  appId: "1:165627113713:web:b846eb557ff6474d18b950",
  measurementId: "G-XEPE5B1QV5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);