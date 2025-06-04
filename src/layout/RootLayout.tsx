import ThemeProvider from "@/components/common/provider/ThemeProvider";
import ScrollToTop from "@/components/common/ScrollToTop";
import Seo from "@/components/Seo";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <Seo title="On & Off" description="출퇴근, 휴가, 근태관리를 쉽고 빠르게." />
      <ThemeProvider excludePaths={["/signin", "/signup"]}>
        <Toaster />
        <ScrollToTop />
        <Outlet />
      </ThemeProvider>
    </>
  );
};

export default RootLayout;
