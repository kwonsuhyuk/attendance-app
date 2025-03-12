import "@/firebase";
import { useEffect, useState } from "react";
import { useTour } from "@reactour/tour";
import { useUserStore } from "@/store/user.store";
import { useCompanyStore } from "@/store/company.store";
import Loading from "@/components/common/Loading";
import ManagerRoutes from "@/components/company/\bManagerRoutes";
import EmployeeRoutes from "@/components/employee/EmployeeRoutes";
import { getDatabase, off, onValue, ref } from "firebase/database";
import { useParams } from "react-router-dom";

const MainPage = () => {
  const userType = useUserStore(state => state.currentUser?.userType);
  const { companyCode } = useParams();
  const setCompany = useCompanyStore(state => state.setCompany);
  const [isLoading, setIsLoading] = useState(false);
  const { setIsOpen } = useTour();

  // useEffect(() => {
  //   async function getCompany() {
  //     if (companyCode) {
  //       setIsLoading(true);
  //       try {
  //         const data = await getCompanyInfo(companyCode);
  //         setCompany(data);
  //       } catch (error) {
  //         console.error("Error fetching company info:", error);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     }
  //   }
  //   getCompany();
  // }, [setCompany, companyCode]);

  useEffect(() => {
    if (!companyCode) return;

    setIsLoading(true);
    const db = getDatabase();
    const companyRef = ref(db, `companyCode/${companyCode}/companyInfo`);

    const unsubscribe = onValue(companyRef, snapshot => {
      if (snapshot.exists()) {
        const updatedCompanyData = snapshot.val();
        console.log("변경된 회사 정보:", updatedCompanyData);
        setCompany(updatedCompanyData);
      }
      setIsLoading(false);
    });

    return () => off(companyRef, "value", unsubscribe);
  }, [companyCode, setCompany]);

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
