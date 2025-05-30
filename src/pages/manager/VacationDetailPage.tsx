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
import { vacationRegisterAndRequestTourSteps } from "@/constants/managerTourSteps";

const VacationDetailPage = () => {
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

  useTour("vacation_register_request", vacationRegisterAndRequestTourSteps);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);

    // 특정 스텝에서 탭을 눌렀다면 다음 step으로
    const { run } = useTourStore.getState();
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
          <div className="flex justify-between bg-white-bg dark:bg-dark-bg">
            <TabsList className="flex h-12 w-full justify-start bg-white-bg py-1 dark:bg-dark-bg">
              {TAB_ITEMS.map(tab => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="relative mt-4 h-12 min-w-[80px] max-w-[200px] flex-1 rounded-t-lg border-none text-center text-sm font-semibold text-white-text data-[state=active]:text-black dark:bg-dark-bg dark:text-white-bg dark:data-[state=active]:bg-dark-card-bg dark:data-[state=active]:text-white-bg sm:px-6 sm:py-3 sm:text-base"
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
          </div>

          {isModalOpen && (
            <VacationRegisterModal
              onClose={toggleModal}
              onRegister={newRequest => handleRegister(newRequest, true)}
            />
          )}

          {TAB_CONTENTS.map(tab => {
            const filteredData = getFilteredVacationData(tab.value, tab.filter);

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
                columns={getVacationColumns({
                  onApprove: tab.value === "registered" ? undefined : handleApprove,
                  onReject: tab.value === "registered" ? undefined : handleReject,
                  includeActions: tab.includeActions,
                  isRegistered: tab.isRegistered ?? false,
                })}
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
