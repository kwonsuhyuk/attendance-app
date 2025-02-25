import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";

const EmployeePageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto flex h-screen max-w-xl flex-col gap-16 overflow-auto bg-[#EEEEEE] px-10 py-10 text-black dark:bg-[#202020] dark:text-white md:px-12">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default EmployeePageContainer;
