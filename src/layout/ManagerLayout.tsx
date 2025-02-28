import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import MenuBar from "@/components/common/menubar/MenuBar";
import Header from "@/components/common/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-screen bg-white-bg text-white-text dark:bg-dark-bg dark:text-dark-text">
        <MenuBar />
        <div className="flex w-full flex-col">
          <Header />
          <main className="relative mx-auto mt-16 flex h-full w-full flex-1 justify-center overflow-auto px-5 pb-12 pt-8 md:px-10">
            <div className="w-full overflow-auto">{children}</div>
          </main>
          {/* <Footer /> */}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
