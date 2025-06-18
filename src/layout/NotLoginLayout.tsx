import { COMMON_ROUTES } from "@/constants/routes";
import { useUserStore } from "@/store/user.store";
import { Navigate, Outlet } from "react-router-dom";

const NotLoginLayout = () => {
  const currentUser = useUserStore(state => state.currentUser);
  const userType = useUserStore(state => state.userType);
  const companyCode = useUserStore(state => state.currentUser?.companyCode);

  if (currentUser && userType && companyCode) {
    return <Navigate to={`/${companyCode}/${userType}${COMMON_ROUTES.COMPANY_MAIN}`} replace />;
  }

  return <Outlet />;
};

export default NotLoginLayout;
