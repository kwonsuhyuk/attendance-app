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
import { ClipLoader } from "react-spinners";
import "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser, setUserType } from "./store/userSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { get, getDatabase, ref } from "firebase/database";
import { toggleMode } from "./store/darkmodeSlice";
import GuideFab from "./Components/GuideFab";
import Loading from "./Components/common/Loading";

function App() {
  const dispatch = useDispatch();

  const { currentUser, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        dispatch(setUser(user));
        // navigate(`/${currentUser?.photoURL}/companymain`);
      } else {
        dispatch(clearUser());
      }
    });
    return () => unsubscribe();
  }, [dispatch, isLoading, currentUser]);

  // 페이지를 불러올 때 로컬 스토리지에서 다크 모드 설정을 가져옴
  useEffect(() => {
    const savedMode = window.localStorage.getItem("darkMode");
    const body = document.body;
    if (savedMode === "true") {
      body.classList.add("dark");
      dispatch(toggleMode());
    } else {
      body.classList.remove("dark");
    }
  }, [dispatch]);

  useEffect(() => {
    async function getEmployeeInfo() {
      const snapshot = await get(
        ref(
          getDatabase(),
          "companyCode/" + currentUser?.photoURL + "/users/" + currentUser?.uid
        )
      );
      if (snapshot.val()) {
        const data = snapshot.val();
        dispatch(setUserType(data.userType));
      }
    }
    getEmployeeInfo();
  }, [currentUser?.photoURL, currentUser?.uid, dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <ToastContainer
        position="bottom-right"
        theme="light"
        pauseOnHover
        autoClose={1500}
      />
      <GuideFab />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/:id/*" element={<MainPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/managerfirst" element={<ManagerFirstPage />} />
        <Route path="/employeefirst" element={<EmployeeFirstPage />} />
        <Route
          path="/signin"
          element={
            currentUser ? (
              <Navigate to={`/${currentUser?.photoURL}/companymain`} />
            ) : (
              <LoginPage />
            )
          }
        />
        <Route path="/*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
