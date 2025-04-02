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

  return (
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
                    <Badge className="mb-0.5 ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                      {pendingCount}
                    </Badge>
                  )}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          <Button
            className="mt-4 cursor-pointer bg-white-bg font-extrabold text-white-text hover:bg-white-bg dark:bg-dark-bg dark:text-dark-text"
            onClick={toggleModal}
          >
            휴가 등록 +
          </Button>
        </div>

        {isModalOpen && <VacationRegisterModal onClose={toggleModal} onRegister={handleRegister} />}

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
  );
};

export default VacationDetailPage;
