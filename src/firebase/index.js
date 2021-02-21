import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBSV8DS-wVajKzMhnSSprjp-cePBXEnNkI",
    authDomain: "mythings-portfolio.firebaseapp.com",
    databaseURL: "https://mythings-portfolio-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "mythings-portfolio",
    storageBucket: "mythings-portfolio.appspot.com",
    messagingSenderId: "990006245023",
    appId: "1:990006245023:web:6fe168767f7e6481dd94aa",
    measurementId: "G-7EXBVMC2PC"
  };

  firebase.initializeApp(firebaseConfig)

  const storage = firebase.storage();

  console.log(storage)

  

  const fireAuth = firebase.auth();

  export { fireAuth, storage, firebase as default };



