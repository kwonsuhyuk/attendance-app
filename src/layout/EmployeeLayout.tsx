import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import MenuBar from "../components/common/menubar/MenuBar";
import { Outlet } from "react-router-dom";
import EmployeeEtcPageTitle from "@/components/employee/EmployeeEtcPageTitle";
import { HelpCircle } from "lucide-react";
import TourController from "@/components/common/TourController";
import { useTourStore } from "@/store/tour.store";

interface ILayoutProp {
  type: "main" | "sub"; // header, footer 안 보이는 서브 페이지 구분용
}

const EmployeeLayout = ({ type }: ILayoutProp) => {
  const steps = useTourStore(state => state.steps);
  const runTour = useTourStore(state => state.run);
  const stepIndex = useTourStore(state => state.stepIndex);
  const setStepIndex = useTourStore(state => state.setStepIndex);
  const isMain = type === "main";

  const mainClassName = isMain
    ? "mt-8 pt-8 flex flex-1 flex-col px-5 pb-12"
    : "flex flex-1 flex-col px-5 mt-10 py-8";

  return (
    <>
      <TourController
        steps={steps}
        run={runTour}
        onClose={() => useTourStore.getState().setRun(false)}
        stepIndex={stepIndex}
        onStepChange={setStepIndex}
      />
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
    </>
  );
};

export default EmployeeLayout;
