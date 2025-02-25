import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";

const ManagerPageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="max-w-screen flex min-h-screen flex-col bg-white-bg text-white-text dark:bg-dark-bg dark:text-dark-text">
      <nav className="overflow-auto px-10 py-10 md:px-20">
        <Header />
      </nav>
      <div className="relative mx-10 flex h-full flex-grow flex-col justify-center overflow-auto md:px-20 lg:h-auto">
        {children}
      </div>
      <Footer />
    </main>
  );
};

export default ManagerPageContainer;
