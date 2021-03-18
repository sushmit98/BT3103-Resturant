import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8TA-58F-Q_TVCCJEXQE6D-SebbAOYhc8",
  authDomain: "bt3103-week-6-6c9d5.firebaseapp.com",
  projectId: "bt3103-week-6-6c9d5",
  storageBucket: "bt3103-week-6-6c9d5.appspot.com",
  messagingSenderId: "140587369130",
  appId: "1:140587369130:web:91070da9da3e9a86cb86d3",
  measurementId: "G-TMRXMFX1PL",
};

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;
