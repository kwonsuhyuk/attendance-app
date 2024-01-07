
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect } from "react";
import "./App.css";
import SignupPage from "./Page/SignupPage";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./Page/LoginPage";
import Notfound from "./Page/Notfound";
import MainPage from "./Page/MainPage";
import ManagerFirstPage from "./Page/signupProcessPage/ManagerFirstPage";
import EmployeeFirstPage from "./Page/signupProcessPage/EmployeeFirstPage";
import IndexPage from "./Page/IndexPage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { SyncLoader } from "react-spinners";
import "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "./store/userSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useEffect } from 'react';
import './App.css';
import SignupPage from './Page/SignupPage';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './Page/LoginPage';
import Notfound from './Page/Notfound';
import MainPage from './Page/MainPage';
import ManagerFirstPage from './Page/signupProcessPage/ManagerFirstPage';
import EmployeeFirstPage from './Page/signupProcessPage/EmployeeFirstPage';
import IndexPage from './Page/IndexPage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { SyncLoader } from 'react-spinners';
import './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, setUser } from './store/userSlice';
import QrScan from './Components/QR/QrScan';
import QrGenerator from './Components/QR/QrGenerator';


function App() {
  // const dispatch = useDispatch();
  // const { currentUser, isLoading } = useSelector((state) => state.user);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
  //     if (user) {
  //       dispatch(setUser(user));
  //     } else {
  //       dispatch(clearUser());
  //     }
  //   });
  //   return () => unsubscribe();
  // }, [dispatch, isLoading, currentUser]);

  // if (isLoading) {
  //   return (
  //     <div className='absolute top-1/2 left-1/2 flex flex-col gap-10'>
  //       <h3>로딩 중입니다.</h3>
  //       <SyncLoader />
  //     </div> // 로딩 스피너
  //   );
  // }
  // return (
  //   <Routes>
  //     <Route path='/' element={!currentUser ? <IndexPage /> : <MainPage />} />
  //     <Route path='/signup' element={<SignupPage />} />
  //     <Route path='/managerfirst' element={<ManagerFirstPage />} />
  //     <Route path='/employeefirst' element={<EmployeeFirstPage />} />
  //     <Route
  //       path='/signin'
  //       element={currentUser ? <Navigate to='/' /> : <LoginPage />}
  //     />
  //     <Route path='/*' element={<Notfound />} />
  //   </Routes>
  // );
  return (
    <>

      <ToastContainer
        position="bottom-right"
        theme="light"
        pauseOnHover
        autoClose={1500}
      />
      <Routes>
        <Route path="/" element={!currentUser ? <IndexPage /> : <MainPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/managerfirst" element={<ManagerFirstPage />} />
        <Route path="/employeefirst" element={<EmployeeFirstPage />} />
        <Route
          path="/signin"
          element={currentUser ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route path="/*" element={<Notfound />} />
      </Routes>

      <QrGenerator />
      <QrScan />

    </>
  );
}

export default App;
