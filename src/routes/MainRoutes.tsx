import { createBrowserRouter } from "react-router-dom";

import ManagerLayout from "@/layout/ManagerLayout";
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import ManagerFirstPage from "@/pages/auth/signupProcessPage/ManagerFirstPage";
import EmployeeFirstPage from "@/pages/auth/signupProcessPage/EmployeeFirstPage";

import RootLayout from "@/layout/RootLayout";
import AuthenticatedLayout from "@/layout/AuthenticatedLayout";
import NotLoginLayout from "@/layout/NotLoginLayout";
import ManagerRoutes from "@/components/company/\bManagerRoutes";
import EmployeeRoutes from "@/components/employee/EmployeeRoutes";
import ErrorPage from "@/pages/ErrorPage";
import Notfound from "@/pages/common/Notfound";
import IndexPage from "@/pages/common/IndexPage";
import CommuteGuidePage from "@/pages/CommuteGuidePage";
import OutworkGuidePage from "@/pages/OutworkGuidePage";

export const MainRoutes = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage />,
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
            errorElement: <ErrorPage />,
            children: ManagerRoutes,
          },
          {
            path: "employee",
            errorElement: <ErrorPage />,
            children: EmployeeRoutes,
          },
        ],
      },

      { path: "/outworkguide", Component: OutworkGuidePage },
      { path: "/commuteguide", Component: CommuteGuidePage },
      { path: "*", Component: Notfound },
    ],
  },
]);

export default MainRoutes;
