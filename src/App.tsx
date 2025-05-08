import CssBaseline from "@mui/material/CssBaseline";
import { useEffect } from "react";
import "./App.css";
import { Navigate, Route, RouterProvider, Routes } from "react-router-dom";
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
import { COMMON_ROUTES, MAIN_ROUTES } from "./constants/routes";
import { TCMUserData, TEmpUserData } from "./model/types/user.type";
import Seo from "./components/Seo";
import MainRoutes from "./routes/MainRoutes";

const App = () => {
  return (
    <>
      <RouterProvider router={MainRoutes} />
    </>
  );
};

export default App;
