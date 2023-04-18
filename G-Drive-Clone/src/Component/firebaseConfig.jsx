// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDXMvgCvkYyaGXzRJnEq2o6crgqAInk_sY",
  authDomain: "g-drive-clone-8de4e.firebaseapp.com",
  projectId: "g-drive-clone-8de4e",
  storageBucket: "g-drive-clone-8de4e.appspot.com",
  messagingSenderId: "561282244603",
  appId: "1:561282244603:web:3f06a36050cb03973b355e",
  measurementId: "G-0MJWCTYHE6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);