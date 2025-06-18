import { MAIN_ROUTES } from "@/constants/routes";
import { useUserStore } from "@/store/user.store";
import { Navigate, Outlet } from "react-router-dom";

const AuthenticatedLayout = () => {
  const currentUser = useUserStore(state => state.currentUser);
  return currentUser ? <Outlet /> : <Navigate to={MAIN_ROUTES.SIGNIN} replace />;
};

export default AuthenticatedLayout;
