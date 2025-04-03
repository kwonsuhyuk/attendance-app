import CssBaseline from "@mui/material/CssBaseline";
import { useEffect } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Notfound from "./pages/common/Notfound";
import MainPage from "./pages/common/MainPage";
import ManagerFirstPage from "./pages/auth/signupProcessPage/ManagerFirstPage";
import EmployeeFirstPage from "./pages/auth/signupProcessPage/EmployeeFirstPage";
import IndexPage from "./pages/common/IndexPage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GuideFab from "./components/common/GuideFab";
import Loading from "./components/common/Loading";
import { getUser } from "./api";
import { useUserStore } from "./store/user.store";
import { useShallow } from "zustand/shallow";
import ThemeProvider from "./components/common/provider/ThemeProvider";
import { Toaster } from "./components/ui/toaster";
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";
import { MAIN_ROUTES } from "./constants/routes";
import { TCMUserData, TEmpUserData } from "./model/types/user.type";
import Seo from "./components/Seo";

const App = () => {
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
          setUser(data as TEmpUserData | TCMUserData);
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Seo title="On & Off" description="출퇴근, 휴가, 근태관리를 쉽고 빠르게." />
      <ThemeProvider excludePaths={["/signin", "/signup"]}>
        <ToastContainer position="bottom-right" theme="light" pauseOnHover autoClose={1500} />
        <Toaster />
        {/* <GuideFab /> */}

        <Routes>
          <Route path={MAIN_ROUTES.INDEX} element={<IndexPage />} />
          <Route path={MAIN_ROUTES.MAIN} element={<MainPage />} />
          <Route path={MAIN_ROUTES.SIGNUP} element={<SignupPage />} />
          <Route path={MAIN_ROUTES.MANAGER_FIRST} element={<ManagerFirstPage />} />
          <Route path={MAIN_ROUTES.EMPLOYEE_FIRST} element={<EmployeeFirstPage />} />
          <Route
            path={MAIN_ROUTES.SIGNIN}
            element={
              currentUser ? (
                <Navigate to={`/${currentUser?.companyCode}/companymain`} />
              ) : (
                <LoginPage />
              )
            }
          />
          <Route path={MAIN_ROUTES.NOT_FOUND} element={<Notfound />} />
        </Routes>
      </ThemeProvider>
    </>
  );
};

export default App;
