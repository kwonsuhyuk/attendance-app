import { useEffect, useState } from "react";
import { getVacationColumns } from "@/components/company/table/VacationColumns";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VacationRegisterModal from "@/components/common/modal/VacationRegisterModal";
import { useVacationRequests } from "@/hooks/manager/useVacationRequests";
import { TAB_CONTENTS, TAB_ITEMS } from "@/constants/vacationTabs";
import { Badge } from "@/components/ui/badge";
import VacationRequestPageContainer from "@/components/container/manager/VacationRequestPageContainer";
import VacationDetailModal from "@/components/common/modal/VacationDetailModal";
import VacationTabContent from "@/components/company/table/VacationTabContent";
import Seo from "@/components/Seo";
import { Plus } from "lucide-react";
import { useTourStore } from "@/store/tour.store";
import { useTour } from "@/hooks/use-tour";
import { vacationDetailTourSteps } from "@/constants/managerTourSteps";
import { useShallow } from "zustand/shallow";

const VacationDetailPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { stepIndex, setStepIndex, run } = useTourStore(
    useShallow(state => ({
      stepIndex: state.stepIndex,
      setStepIndex: state.setStepIndex,
      run: state.run,
    })),
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const {
    modal: { isOpen: isModalOpen, toggle: toggleModal },
    requests: {
      register: handleRegister,
      approve: handleApprove,
      reject: handleReject,
      pendingCount,
      filter: getFilteredVacationData,
    },
    pagination: {
      page,
      setPage,
      next: onNext,
      previous: onPrevious,
      getTotalPages,
      getCurrentPageData,
    },
    selection: { selected: selectedRequest, select: handleRowClick },
    tab: { active: activeTab, setActive: setActiveTab },
  } = useVacationRequests();

  useTour("vacation_register_request", vacationDetailTourSteps, [3, 5]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (run) {
      const joyrideContainer = document.querySelector(".react-joyride__tooltip");
      if (joyrideContainer) {
        const nextButton = joyrideContainer.querySelector("button[aria-label='Next']");
        nextButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      }
    }
  };

  return (
    <>
      <Seo
        title="휴가 등록/요청 | On & Off"
        description="On & Off에서 근태관리 서비스를 이용해보세요."
      />
      <VacationRequestPageContainer>
        <Tabs
          value={activeTab}
          className="w-full"
          onValueChange={tab => {
            setActiveTab(tab);
            setPage(prev => ({ ...prev, [tab]: 0 }));
          }}
        >
          <div className="flex flex-col gap-2 bg-white-bg pt-1 dark:bg-dark-bg sm:flex-row sm:items-center sm:justify-between sm:px-0 sm:pt-0">
            {isMobile ? (
              <div className="flex w-full overflow-x-auto">
                {TAB_ITEMS.map(tab => (
                  <button
                    key={tab.value}
                    onClick={() => handleTabClick(tab.value)}
                    className={`min-w-[80px] flex-1 rounded-md px-3 py-2 text-sm font-semibold ${
                      activeTab === tab.value
                        ? "bg-black text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {tab.label}
                    {tab.value === "pending" && pendingCount > 0 && (
                      <Badge className="ml-1 bg-red-500 px-1.5 text-white">{pendingCount}</Badge>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <TabsList className="flex h-12 w-full justify-start bg-white-bg py-1 dark:bg-dark-bg">
                {TAB_ITEMS.map(tab => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="relative mt-2 h-12 min-w-[80px] max-w-[200px] flex-1 rounded-t-lg border-none text-center text-sm font-semibold text-white-text data-[state=active]:text-black dark:bg-dark-bg dark:text-white-bg dark:data-[state=active]:bg-dark-card-bg dark:data-[state=active]:text-white-bg sm:px-6 sm:py-3 sm:text-base"
                    data-tour={
                      tab.value === "processed"
                        ? "process-1"
                        : tab.value === "registered"
                          ? "register-1"
                          : undefined
                    }
                    onClick={() => {
                      if (tab.value === "processed" && stepIndex === 3) {
                        setStepIndex(4); // process-1 → process-2
                      }
                      if (tab.value === "registered" && stepIndex === 5) {
                        setStepIndex(6); // register-1 → register-2
                      }
                    }}
                  >
                    <span className="flex items-center justify-center gap-1 pt-2">
                      {tab.label}
                      {tab.value === "pending" && pendingCount > 0 && (
                        <span className="inline-flex h-[18px] min-w-[16px] items-center justify-center rounded-[9px] bg-red-500 px-1.5 text-[11px] font-semibold leading-none text-white">
                          {pendingCount}
                        </span>
                      )}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>
            )}

            {isMobile ? (
              <Button
                className="mt-2 w-full rounded-md rounded-b-none text-base font-bold"
                onClick={toggleModal}
              >
                휴가 등록
              </Button>
            ) : (
              <Button
                className="group mt-4 flex cursor-pointer items-center gap-2 bg-white-bg text-sm font-bold text-white-text hover:bg-white-bg hover:font-extrabold dark:bg-dark-bg dark:text-dark-text sm:text-base"
                onClick={toggleModal}
                data-tour="register-modal"
              >
                <span className="flex h-5 w-5 -translate-y-0.5 translate-x-0.5 items-center justify-center rounded-full border-2 border-solid border-white-text text-white-text transition-colors group-hover:bg-dark-card-bg group-hover:font-extrabold group-hover:text-dark-text dark:border-dark-text dark:text-dark-text dark:hover:text-white-text dark:group-hover:bg-white-card-bg dark:group-hover:text-black">
                  <Plus className="h-4 w-4" />
                </span>
                <span className="transition-all group-hover:font-extrabold">휴가 등록</span>
              </Button>
            )}
          </div>

          {isModalOpen && (
            <VacationRegisterModal
              onClose={toggleModal}
              onRegister={newRequest => handleRegister(newRequest, true)}
            />
          )}

          {TAB_CONTENTS.map(tab => {
            const filteredData = getFilteredVacationData(tab.value, tab.filter);
            const vacationColumns = getVacationColumns({
              onApprove: tab.value === "registered" ? undefined : handleApprove,
              onReject: tab.value === "registered" ? undefined : handleReject,
              includeActions: tab.includeActions,
              isRegistered: tab.isRegistered ?? false,
            });

            const visibleMobileColumns = ["requestType", "requester", "status"];

            const hiddenColumnIdsOnMobile = isMobile
              ? vacationColumns
                  .map(col => {
                    if ("accessorKey" in col && typeof col.accessorKey === "string")
                      return col.accessorKey;
                    if ("id" in col && typeof col.id === "string") return col.id;
                    return null;
                  })
                  .filter((key): key is string => !!key && !visibleMobileColumns.includes(key))
              : [];

            return (
              <VacationTabContent
                key={tab.value}
                tab={tab}
                filteredData={filteredData}
                getCurrentPageData={getCurrentPageData}
                page={page[tab.value]}
                totalPageCount={getTotalPages(filteredData)}
                onNext={() => onNext(tab.value, getTotalPages(filteredData))}
                onPrevious={() => onPrevious(tab.value)}
                onRowClick={handleRowClick}
                isMobile={isMobile}
                columns={getVacationColumns({
                  onApprove: tab.value === "registered" ? undefined : handleApprove,
                  onReject: tab.value === "registered" ? undefined : handleReject,
                  includeActions: tab.includeActions,
                  isRegistered: tab.isRegistered ?? false,
                })}
                hiddenColumnIdsOnMobile={hiddenColumnIdsOnMobile}
              />
            );
          })}
        </Tabs>

        {selectedRequest && (
          <VacationDetailModal
            request={selectedRequest}
            onClose={() => handleRowClick(null)}
            onApprove={id => {
              handleApprove(String(id));
              setActiveTab("processed");
              setPage(prev => ({ ...prev, processed: 0 }));
            }}
            onReject={id => {
              handleReject(String(id));
              setActiveTab("processed");
              setPage(prev => ({ ...prev, processed: 0 }));
            }}
          />
        )}
      </VacationRequestPageContainer>
    </>
  );
};

export default VacationDetailPage;
