import "@/firebase";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/user.store";
import { useCompanyStore } from "@/store/company.store";
import ManagerRoutes from "@/components/company/ManagerRoutes";
import EmployeeRoutes from "@/components/employee/EmployeeRoutes";
import { useParams } from "react-router-dom";
import { getCompanyInfo, subscribeToData } from "@/api";
import { getCompanyInfoPath } from "@/constants/api.path";
import Loading from "@/components/common/Loading";
import { TCompanyInfo } from "@/model/types/company.type";

const MainPage = () => {
  const userType = useUserStore(state => state.currentUser?.userType);
  const { companyCode } = useParams();
  const setCompany = useCompanyStore(state => state.setCompany);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getCompany() {
      if (companyCode) {
        setIsLoading(true);
        try {
          const data = await getCompanyInfo(companyCode);
          setCompany(data as TCompanyInfo);
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
    if (!companyCode) return;

    const unsubscribe = subscribeToData(getCompanyInfoPath(companyCode), updatedCompanyData => {
      if (updatedCompanyData) {
        setCompany(updatedCompanyData as TCompanyInfo);
      }
    });

    return () => unsubscribe();
  }, [companyCode, setCompany]);

  // useEffect(() => {
  //   const tourShown = localStorage.getItem("tourShown");
  //   if (!tourShown || tourShown === "false") {
  //     setTimeout(() => {
  //       setIsOpen(true);
  //     }, 1000);
  //   }
  // }, [setIsOpen]);

  if (isLoading) return <Loading />;

  return <>{userType === "manager" ? <ManagerRoutes /> : <EmployeeRoutes />}</>;
};

export default MainPage;
