import CssBaseline from "@mui/material/CssBaseline";
import { useEffect } from "react";
import "./App.css";
import SignupPage from "./Page/SignupPage";

import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useRoutes,
} from "react-router-dom";
import LoginPage from "./Page/LoginPage";
import Notfound from "./Page/Notfound";
import MainPage from "./Page/MainPage";
import ManagerFirstPage from "./Page/signupProcessPage/ManagerFirstPage";
import EmployeeFirstPage from "./Page/signupProcessPage/EmployeeFirstPage";
import IndexPage from "./Page/IndexPage";
import AccessCameraPage from "./Page/AccessCameraPage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ClipLoader } from "react-spinners";
import "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser, setUserType } from "./store/userSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { get, getDatabase, ref } from "firebase/database";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        dispatch(setUser(user));
        navigate(`/${currentUser?.photoURL}/`);
      } else {
        dispatch(clearUser());
      }
    });
    return () => unsubscribe();
  }, [dispatch, isLoading, currentUser]);

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
  console.log(currentUser);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen w-screen">
        <ClipLoader
          color="black"
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <h3>로딩 중 입니다.</h3>
      </div> // 로딩 스피너
    );
  }

  return (
    <>
      <ToastContainer
        position="bottom-right"
        theme="light"
        pauseOnHover
        autoClose={1500}
      />
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
              <Navigate to={`/${currentUser?.photoURL}/main`} />
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
