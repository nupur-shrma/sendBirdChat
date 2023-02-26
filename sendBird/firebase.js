// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBw9qIsajv2T-KhjZtaN5VOrhIEoxc5pY8",
  authDomain: "sendbirdchat-56317.firebaseapp.com",
  projectId: "sendbirdchat-56317",
  storageBucket: "sendbirdchat-56317.appspot.com",
  messagingSenderId: "343077566046",
  appId: "1:343077566046:web:716ab86b734c800b5466cf",
  measurementId: "G-SRB72MGZXM"
};

// Initialize Firebase
export const App1 = initializeApp(firebaseConfig);
export const analytics = getAnalytics(App1);