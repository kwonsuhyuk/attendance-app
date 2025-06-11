import { SidebarProvider } from "@/components/ui/sidebar";
import MenuBar from "@/components/common/menubar/MenuBar";
import Header from "@/components/common/Header";
import { Outlet } from "react-router-dom";
import { HelpCircle } from "lucide-react";
import TourController from "@/components/common/TourController";
import { useTourStore } from "@/store/tour.store";
import { useEffect, useState } from "react";
import { GlobalOutworkAlert } from "@/components/company/GlobalOutworkAlert";

const Layout = () => {
  const steps = useTourStore(state => state.steps);
  const runTour = useTourStore(state => state.run);
  const stepIndex = useTourStore(state => state.stepIndex);
  const setRunTour = useTourStore(state => state.setRun);
  const setStepIndex = useTourStore(state => state.setStepIndex);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleStartTour = () => {
    const { steps } = useTourStore.getState();
    if (steps.length === 0) return; // steps가 준비되었는지 확인

    setRunTour(false); // 강제 초기화
    setStepIndex(0);

    setTimeout(() => {
      setRunTour(true); // 실행
    }, 50);
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
          <GlobalOutworkAlert />
          <main className="relative mx-auto mt-16 flex h-full w-full flex-1 justify-center overflow-auto px-5 pb-12 pt-8 md:px-10">
            <div className="page-main flex w-full overflow-auto">
              <Outlet />
            </div>
          </main>

          {!isMobile && (
            <button
              onClick={handleStartTour}
              className="fixed bottom-6 right-6 z-50 rounded-full bg-point-color p-3 text-white shadow-lg transition-all ease-out hover:bg-yellow-500"
              aria-label="도움말"
            >
              <HelpCircle className="h-7 w-7" />
            </button>
          )}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
