import { useEffect, useState } from "react";
import "./App.css";
import SignupPage from "./Page/SignupPage";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./Page/LoginPage";
import Notfound from "./Page/Notfound";
import MainPage from "./Page/MainPage";
import ManagerFirstPage from "./Page/signupProcessPage/ManagerFirstPage";
import EmployeeFirstPage from "./Page/signupProcessPage/EmployeeFirstPage";
import IndexPage from "./Page/IndexPage";
import "./firebase";
import { useRecoilState } from "recoil";
import { isLoading, user } from "./RecoilState";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { SyncLoader } from "react-spinners";

function App() {
  const [currentUser, setCurrentUser] = useRecoilState(user);
  const [loading, setLoading] = useRecoilState(isLoading);

  useEffect(() => {
    console.log(isLoading);
    const unsubscribe = onAuthStateChanged(getAuth(), (userInfo) => {
      if (userInfo) {
        console.log(userInfo);
        setCurrentUser(userInfo);
        setLoading(false);
      } else {
        setCurrentUser();
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [setCurrentUser, setLoading]);

  if (loading) {
    return (
      <div className="absolute top-1/2 left-1/2 flex flex-col gap-10">
        <h3>로딩 중입니다.</h3>
        <SyncLoader />
      </div> // 로딩 스피너
    );
  }
  return (
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
  );
}

export default App;
