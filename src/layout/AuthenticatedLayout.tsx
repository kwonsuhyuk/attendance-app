import { getCompanyInfo, subscribeToData } from "@/api";
import Loading from "@/components/common/Loading";
import { getCompanyInfoPath } from "@/constants/api.path";
import { MAIN_ROUTES } from "@/constants/routes";
import { TCompanyInfo } from "@/model/types/company.type";
import { useCompanyStore } from "@/store/company.store";
import { useUserStore } from "@/store/user.store";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";

const AuthenticatedLayout = () => {
  const currentUser = useUserStore(state => state.currentUser);
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

  return currentUser ? <Outlet /> : <Navigate to={MAIN_ROUTES.SIGNIN} replace />;
};

export default AuthenticatedLayout;
