import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import MenuBar from "../components/common/menubar/MenuBar";

const EmployeeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex min-h-screen w-full justify-center bg-white-bg text-white-text dark:bg-dark-bg dark:text-dark-text">
      <div className="relative flex w-full max-w-screen-sm flex-col">
        <Header variant="employee" />
        <MenuBar />
        <main className="mt-16 flex flex-1 flex-col px-5 pb-12 pt-8 md:px-10">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default EmployeeLayout;
