import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import MenuBar from "../components/common/menubar/MenuBar";
import { Outlet } from "react-router-dom";
import EmployeeEtcPageTitle from "@/components/employee/EmployeeEtcPageTitle";

interface ILayoutProp {
  type: "main" | "sub"; // header, footer 안 보이는 서브 페이지 구분용
}

const EmployeeLayout = ({ type }: ILayoutProp) => {
  const isMain = type === "main";

  const mainClassName = isMain
    ? "mt-8 pt-8 flex flex-1 flex-col px-5 pb-12"
    : "flex flex-1 flex-col px-5 mt-10 py-8";

  return (
    <div className="relative flex min-h-screen w-full justify-center bg-white-bg text-white-text">
      <div className="relative flex w-full max-w-screen-sm flex-col dark:bg-dark-bg dark:text-dark-text">
        {isMain ? <Header variant="employee" /> : <EmployeeEtcPageTitle />}
        {isMain && <MenuBar />}
        <main className={mainClassName}>
          <Outlet />
        </main>
        {isMain && <Footer />}
      </div>
    </div>
  );
};

export default EmployeeLayout;
