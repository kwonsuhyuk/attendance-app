import Loading from "@/components/common/Loading";
import { COMMON_ROUTES } from "@/constants/routes";
import { useUserStore } from "@/store/user.store";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const NotLoginLayout = () => {
  const currentUser = useUserStore(state => state.currentUser);
  const userType = useUserStore(state => state.userType);
  const companyCode = useUserStore(state => state.currentUser?.companyCode);

  if (userType === undefined) {
    return <Loading />;
  }

  return !currentUser ? (
    <Outlet />
  ) : (
    <Navigate to={`${companyCode}/${userType}${COMMON_ROUTES.COMPANY_MAIN}`} replace />
  );
};

export default NotLoginLayout;
