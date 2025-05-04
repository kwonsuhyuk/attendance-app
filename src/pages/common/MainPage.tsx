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
import { SidebarProvider } from "@/components/ui/sidebar";
import Seo from "@/components/Seo";

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

  if (isLoading) return <Loading />;

  return (
    <>
      <Seo title="홈 | On & Off" description="On & Off에서 근태관리 서비스를 이용해보세요." />

      <SidebarProvider>
        {userType === "manager" ? <ManagerRoutes /> : <EmployeeRoutes />}
      </SidebarProvider>
    </>
  );
};

export default MainPage;
