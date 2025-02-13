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
import "./firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toggleMode } from "./store/darkmodeSlice";
import GuideFab from "./components/GuideFab";
import Loading from "./components/common/Loading";
import { getUser } from "./api";
import { useUserStore } from "./store/user.store";
import { useDispatch } from "react-redux";
import { useShallow } from "zustand/shallow";

const App = () => {
  const dispatch = useDispatch();
  const { currentUser, isLoading, setUser, clearUser } = useUserStore(
    useShallow(state => ({
      currentUser: state?.currentUser,
      isLoading: state?.isLoading,
      setUser: state.setUser,
      clearUser: state.clearUser,
    })),
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async user => {
      if (user) {
        try {
          const data = await getUser(user);
          setUser(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
          clearUser();
        }
      } else {
        clearUser();
      }
    });

    return () => unsubscribe();
  }, [setUser, clearUser]);

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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <ToastContainer position="bottom-right" theme="light" pauseOnHover autoClose={1500} />
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
              <Navigate to={`/${currentUser?.companyCode}/companymain`} />
            ) : (
              <LoginPage />
            )
          }
        />
        <Route path="/*" element={<Notfound />} />
      </Routes>
    </>
  );
};

export default App;
