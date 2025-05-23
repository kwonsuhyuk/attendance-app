import { SidebarProvider } from "@/components/ui/sidebar";
import MenuBar from "@/components/common/menubar/MenuBar";
import Header from "@/components/common/Header";
import { Outlet } from "react-router-dom";
import { HelpCircle } from "lucide-react";
import TourController from "@/components/common/TourController";
import { useTourStore } from "@/store/tour.store";

const Layout = () => {
  const steps = useTourStore(state => state.steps);
  const runTour = useTourStore(state => state.run);
  const setRunTour = useTourStore(state => state.setRun);
  const stepIndex = useTourStore(state => state.stepIndex);
  const setStepIndex = useTourStore(state => state.setStepIndex);

  const handleStartTour = () => {
    const { setRun, setStepIndex } = useTourStore.getState();

    // 상태 초기화 (중요)
    setRun(false);
    setStepIndex(0);

    setTimeout(() => {
      const firstStep = useTourStore.getState().steps[0]?.target;
      if (typeof firstStep === "string") {
        const target = document.querySelector(firstStep);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }

      setRun(true); // 반드시 마지막에 실행
    }, 200);
  };

  return (
    <SidebarProvider>
      <TourController
        steps={steps}
        run={runTour}
        onClose={() => setRunTour(false)}
        stepIndex={stepIndex}
        onStepChange={setStepIndex}
      />

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
            onClick={handleStartTour}
            className="fixed bottom-6 right-6 z-50 rounded-full bg-point-color p-3 text-white shadow-lg transition-all ease-out hover:bg-yellow-500"
            aria-label="도움말"
          >
            <HelpCircle className="h-7 w-7" />
          </button>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
