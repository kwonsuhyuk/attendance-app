import React, { useState } from "react";
import Joyride, { Step } from "react-joyride";
import { SidebarProvider } from "@/components/ui/sidebar";
import MenuBar from "@/components/common/menubar/MenuBar";
import Header from "@/components/common/Header";
import { Outlet } from "react-router-dom";
import { HelpCircle } from "lucide-react";

const Layout = () => {
  // const [runTour, setRunTour] = useState(false);

  return (
    <SidebarProvider>
      {/* <Joyride
        steps={steps}
        run={runTour}
        continuous
        showSkipButton
        showProgress
        scrollToFirstStep
        styles={{
          options: {
            zIndex: 10000,
            primaryColor: "#6366f1",
          },
        }}
        callback={({ status }) => {
          if (["finished", "skipped"].includes(status)) {
            setRunTour(false);
          }
        }}
      /> */}

      <div className="relative flex min-h-screen w-screen bg-white-bg text-white-text dark:bg-dark-bg dark:text-dark-text">
        <MenuBar />
        <div className="flex w-full flex-col">
          <Header />
          <main className="relative mx-auto mt-16 flex h-full w-full flex-1 justify-center overflow-auto px-5 pb-12 pt-8 md:px-10">
            <div className="page-main flex w-full overflow-auto">
              <Outlet />
            </div>
          </main>

          <button
            // onClick={() => setRunTour(true)}
            className="fixed bottom-6 right-6 z-50 rounded-full bg-point-color p-3 text-white shadow-lg transition-all ease-out hover:bg-yellow-500"
            aria-label="도움말"
          >
            <HelpCircle className="h-6 w-6" />
          </button>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
