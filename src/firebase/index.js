// Import the functions you need from the SDKs you need
//import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBWsGya53buGyFjmgeV-dNgd2XqeBXy4d0',
  authDomain: 'britec-attd-app.firebaseapp.com',
  projectId: 'britec-attd-app',
  storageBucket: 'britec-attd-app.appspot.com',
  messagingSenderId: '723788106509',
  appId: '1:723788106509:web:4cb593996a6105ca1bfe44',
  measurementId: 'G-P4SQ6BEGGM',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };
