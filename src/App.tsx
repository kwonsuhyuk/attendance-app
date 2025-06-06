import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import MainRoutes from "./routes/MainRoutes";
import Loading from "./components/common/Loading";
import { useUserStore } from "@/store/user.store";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUser } from "@/api";
import { TCMUserData, TEmpUserData } from "@/model/types/user.type";

const App = () => {
  const [appReady, setAppReady] = useState(false);
  const setUser = useUserStore(state => state.setUser);
  const clearUser = useUserStore(state => state.clearUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async user => {
      if (user) {
        try {
          const data = await getUser(user);
          setUser(data as TEmpUserData | TCMUserData);
        } catch (e) {
          clearUser();
        }
      } else {
        clearUser();
      }

      setAppReady(true);
    });

    return () => unsubscribe();
  }, [setUser, clearUser]);

  if (!appReady) return <Loading />;

  return <RouterProvider router={MainRoutes} />;
};

export default App;
