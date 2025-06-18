import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import MainRoutes from "./routes/MainRoutes";
import { AppStartLoading } from "./components/common/Loading";
import { useUserStore } from "@/store/user.store";
import { useCompanyStore } from "@/store/company.store";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUser, getCompanyInfo, subscribeToData } from "@/api";
import { getCompanyInfoPath } from "@/constants/api.path";
import { TCMUserData, TEmpUserData } from "@/model/types/user.type";
import { TCompanyInfo } from "@/model/types/company.type";

const App = () => {
  const [appReady, setAppReady] = useState(false);

  const setUser = useUserStore(state => state.setUser);
  const clearUser = useUserStore(state => state.clearUser);
  const setCompany = useCompanyStore(state => state.setCompany);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async user => {
      if (user) {
        try {
          const userData = await getUser(user);
          setUser(userData as TEmpUserData | TCMUserData);

          const companyCode = (userData as TCMUserData | TEmpUserData).companyCode;
          if (companyCode) {
            const companyData = await getCompanyInfo(companyCode);
            setCompany(companyData as TCompanyInfo);

            subscribeToData(getCompanyInfoPath(companyCode), updated => {
              if (updated) {
                setCompany(updated as TCompanyInfo);
              }
            });
          }
        } catch (e) {
          clearUser();
        }
      } else {
        clearUser();
      }

      setAppReady(true);
    });

    return () => unsubscribe();
  }, [setUser, clearUser, setCompany]);

  if (!appReady) return <AppStartLoading />;

  return <RouterProvider router={MainRoutes} />;
};

export default App;
