import { useCompanyStore } from "@/store/company.store";
import useDarkMode from "@/store/darkmode.store";
import { useUserStore } from "@/store/user.store";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

export const useMenuState = () => {
  const [isDataReady, setIsDataReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { darkMode } = useDarkMode(
    useShallow(state => ({
      darkMode: state.darkMode,
    })),
  );

  const { companyName, companyLogo } = useCompanyStore(
    useShallow(state => ({
      companyName: state.currentCompany?.companyName || "",
      companyLogo: state.currentCompany?.companyLogo || "",
    })),
  );

  const { userType, companyCode, userName, userEmail } = useUserStore(
    useShallow(state => ({
      userType: state.userType,
      companyCode: state.currentUser?.companyCode || "",
      userName: state.currentUser?.name || "",
      userEmail: state.currentUser?.email || "",
    })),
  );

  useEffect(() => {
    setIsDataReady(Boolean(companyCode && userType));
  }, [companyCode, userType]);

  return {
    darkMode,
    companyName,
    companyLogo,
    userType,
    companyCode,
    userName,
    userEmail,
    isDataReady,
    isOpen,
    setIsOpen,
  };
};
