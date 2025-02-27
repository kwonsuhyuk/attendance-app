import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import MenuBar from "@/components/common/menubar/MenuBar";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-screen bg-white-bg text-white-text dark:bg-dark-bg dark:text-dark-text">
        <MenuBar />
        <div className="flex w-full flex-col">
          <Header />
          <main className="relative flex h-full flex-grow justify-center overflow-auto px-10 lg:h-auto">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
