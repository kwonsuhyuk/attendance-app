import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import MenuBar from "../common/menubar/MenuBar";
import { Sidebar, SidebarProvider } from "../ui/sidebar";

const EmployeePageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex min-h-screen w-full justify-center bg-white">
      {/* 사이드바는 고정된 위치로 뺌 (오른쪽 or 왼쪽) */}
      {/* 콘텐츠는 가운데 정렬된 max-w 영역 */}
      <div className="relative flex w-full max-w-screen-sm flex-col">
        <Header variant="employee" />
        <MenuBar />
        <main className="mt-16 flex flex-1 flex-col px-5 pb-12 pt-8 md:px-10">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default EmployeePageContainer;
