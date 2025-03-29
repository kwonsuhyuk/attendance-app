import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import MenuBar from "../common/menubar/MenuBar";

const EmployeePageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-screen bg-white-bg text-white-text dark:bg-dark-bg dark:text-dark-text">
      <MenuBar />
      <div className="flex w-full flex-col">
        <Header />
        <main className="relative mx-auto mt-16 flex h-full w-full flex-1 justify-center overflow-auto px-5 pb-12 pt-8 md:px-10">
          <div className="flex w-full overflow-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default EmployeePageContainer;
