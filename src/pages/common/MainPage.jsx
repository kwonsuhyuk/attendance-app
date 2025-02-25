import "@/firebase";
import { useEffect, useState } from "react";
import { useTour } from "@reactour/tour";
import { useUserStore } from "@/store/user.store";
import { useCompanyStore } from "@/store/company.store";
import { getCompanyInfo } from "@/api";
import Loading from "@/components/common/Loading";
import ManagerRoutes from "@/components/company/\bManagerRoutes";
import EmployeeRoutes from "@/components/employee/EmployeeRoutes";

const MainPage = () => {
  const userType = useUserStore(state => state.currentUser?.userType);
  const companyCode = useUserStore(state => state.currentUser?.companyCode);
  const setCompany = useCompanyStore(state => state.setCompany);
  const [isLoading, setIsLoading] = useState(false);
  const { setIsOpen } = useTour();

  useEffect(() => {
    async function getCompany() {
      if (companyCode) {
        setIsLoading(true);
        try {
          const data = await getCompanyInfo(companyCode);
          setCompany(data);
        } catch (error) {
          console.error("Error fetching company info:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }
    getCompany();
  }, [setCompany, companyCode]);

  useEffect(() => {
    const tourShown = localStorage.getItem("tourShown");
    if (!tourShown || tourShown === "false") {
      setTimeout(() => {
        setIsOpen(true);
      }, 1000);
    }
  }, [setIsOpen]);

  if (isLoading) {
    return <Loading />;
  }

  return <>{userType === "manager" ? <ManagerRoutes /> : <EmployeeRoutes />}</>;
};

export default MainPage;
