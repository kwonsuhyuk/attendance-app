import { getUser } from "@/api";
import ThemeProvider from "@/components/common/provider/ThemeProvider";
import ScrollToTop from "@/components/common/ScrollToTop";
import Seo from "@/components/Seo";
import { Toaster } from "@/components/ui/toaster";
import { TCMUserData, TEmpUserData } from "@/model/types/user.type";
import { useUserStore } from "@/store/user.store";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useShallow } from "zustand/shallow";

const RootLayout = () => {
  const { setUser, clearUser } = useUserStore(
    useShallow(state => ({
      setUser: state.setUser,
      clearUser: state.clearUser,
    })),
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async user => {
      if (user) {
        try {
          const data = await getUser(user);
          setUser(data as TEmpUserData | TCMUserData);
        } catch (error) {
          console.error("Error fetching user data:", error);
          clearUser();
        }
      } else {
        clearUser();
      }
    });

    return () => unsubscribe();
  }, [setUser, clearUser]);

  return (
    <>
      <Seo title="On & Off" description="출퇴근, 휴가, 근태관리를 쉽고 빠르게." />
      <ThemeProvider excludePaths={["/signin", "/signup"]}>
        {/* <ToastContainer position="bottom-right" theme="light" pauseOnHover autoClose={1500} /> */}
        <Toaster />
        <ScrollToTop />
        <Outlet />
      </ThemeProvider>
    </>
  );
};

export default RootLayout;
