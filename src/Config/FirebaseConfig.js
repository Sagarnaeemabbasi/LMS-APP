// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMlvyus7OPt837GLlwZXWQtAF-ItRjpkY",
  authDomain: "registration-form-b527c.firebaseapp.com",
  databaseURL: "https://registration-form-b527c-default-rtdb.firebaseio.com",
  projectId: "registration-form-b527c",
  storageBucket: "registration-form-b527c.appspot.com",
  messagingSenderId: "824682790085",
  appId: "1:824682790085:web:893ef5c55f41e1310bc4ac",
  measurementId: "G-CDE8LBG1TC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBAeUvQ7iG19TDhXbv9Xl9xavriOMf_KC0",
//   authDomain: "hackathon-f8b37.firebaseapp.com",
//   projectId: "hackathon-f8b37",
//   storageBucket: "hackathon-f8b37.appspot.com",
//   messagingSenderId: "171192234841",
//   appId: "1:171192234841:web:8e31e43cda220157a1d248",
//   measurementId: "G-8ECB2QMDHY"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);