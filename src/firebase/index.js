import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// config 그대로 사용
const firebaseConfig = {
  apiKey: "AIzaSyBWsGya53buGyFjmgeV-dNgd2XqeBXy4d0",
  authDomain: "britec-attd-app.firebaseapp.com",
  databaseURL: "https://britec-attd-app-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "britec-attd-app",
  storageBucket: "britec-attd-app.appspot.com",
  messagingSenderId: "723788106509",
  appId: "1:723788106509:web:4cb593996a6105ca1bfe44",
  measurementId: "G-P4SQ6BEGGM",
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// 필요한 서비스만 추출
const auth = getAuth(app);
const db = getDatabase(app);

export { db, auth };
