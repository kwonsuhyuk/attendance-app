import { createBrowserRouter } from "react-router-dom";
import IndexPage from "@/pages/common/IndexPage";
import ManagerLayout from "@/layout/ManagerLayout";
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import ManagerFirstPage from "@/pages/auth/signupProcessPage/ManagerFirstPage";
import EmployeeFirstPage from "@/pages/auth/signupProcessPage/EmployeeFirstPage";
import Notfound from "@/pages/common/Notfound";
import RootLayout from "@/layout/RootLayout";
import AuthenticatedLayout from "@/layout/AuthenticatedLayout";
import NotLoginLayout from "@/layout/NotLoginLayout";
import ManagerRoutes from "@/components/company/\bManagerRoutes";
import EmployeeRoutes from "@/components/employee/EmployeeRoutes";

export const MainRoutes = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        path: "",
        Component: NotLoginLayout,
        children: [
          { index: true, Component: IndexPage },
          { path: "signin", Component: LoginPage },
          { path: "signup", Component: SignupPage },
        ],
      },
      { path: "managerfirst", Component: ManagerFirstPage },
      { path: "employeefirst", Component: EmployeeFirstPage },
      {
        path: ":companyCode",
        Component: AuthenticatedLayout,
        children: [
          {
            path: "manager",
            Component: ManagerLayout,
            children: ManagerRoutes,
          },
          {
            path: "employee",
            children: EmployeeRoutes,
          },
        ],
      },

      { path: "*", Component: Notfound },
    ],
  },
]);

export default MainRoutes;
