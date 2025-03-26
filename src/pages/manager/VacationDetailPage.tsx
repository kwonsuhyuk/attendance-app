import { DataTable } from "@/components/ui/data-table";
import { getVacationColumns } from "@/components/company/table/VacationColumns";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VacationRegisterModal from "@/components/common/modal/VacationRegisterModal";
import { useVacationRequests } from "@/hooks/manager/useVacationRequests";
import { TAB_CONTENTS, TAB_ITEMS } from "@/constants/vacationTabs";
import { Badge } from "@/components/ui/badge";
import VacationRequestPageContainer from "@/components/container/manager/VacationRequestPageConatiner";
import VacationDetailModal from "@/components/common/modal/VacationDetailModal";
import Pagination from "@/components/ui/pagination";

const VacationDetailPage = () => {
  const {
    isModalOpen,
    toggleModal,
    requests,
    registeredRequests,
    handleRegister,
    handleApprove,
    handleReject,
    pendingCount,
    handleRowClick,
    selectedRequest,
    page,
    setPage,
    getTotalPages,
    getCurrentPageData,
    onNext,
    onPrevious,
  } = useVacationRequests();

  return (
    <VacationRequestPageContainer>
      <Tabs
        defaultValue="pending"
        className="w-full"
        onValueChange={tab => setPage(prev => ({ ...prev, [tab]: 0 }))}
      >
        <div className="flex justify-between bg-white-bg dark:bg-dark-bg">
          <TabsList className="flex h-12 w-full justify-start bg-white-bg py-1 dark:bg-dark-bg">
            {TAB_ITEMS.map(tab => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="h-13 relative mt-2 min-w-[80px] max-w-[200px] flex-1 rounded-t-lg border-none text-center text-sm font-semibold text-white-text data-[state=active]:text-black dark:bg-dark-bg dark:text-white-bg dark:data-[state=active]:bg-dark-card-bg dark:data-[state=active]:text-white-bg sm:px-6 sm:py-3 sm:text-base"
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
            요청 등록 +
          </Button>
        </div>

        {isModalOpen && <VacationRegisterModal onClose={toggleModal} onRegister={handleRegister} />}

        {TAB_CONTENTS.map(tab => {
          const filteredData =
            tab.value === "registered"
              ? registeredRequests
              : tab.value === "processed"
                ? requests
                    .filter(tab.filter)
                    .sort(
                      (a, b) =>
                        new Date(b.requestDate.split(" ~ ")[0]).getTime() -
                        new Date(a.requestDate.split(" ~ ")[0]).getTime(),
                    )
                : requests.filter(tab.filter);

          return (
            <TabsContent key={tab.value} value={tab.value} className="mt-8 w-full">
              <div className="w-full overflow-x-auto">
                <DataTable
                  columns={getVacationColumns(
                    tab.value === "registered" ? undefined : handleApprove,
                    tab.value === "registered" ? undefined : handleReject,
                    tab.includeActions,
                    tab.isRegistered ?? false,
                  )}
                  data={getCurrentPageData(filteredData, tab.value)}
                  onRowClick={handleRowClick}
                />
              </div>

              <div className="p-5">
                {filteredData.length > 0 && (
                  <Pagination
                    page={page[tab.value]}
                    totalPageCount={getTotalPages(filteredData)}
                    onNext={() => onNext(tab.value, getTotalPages(filteredData))}
                    onPrevious={() => onPrevious(tab.value)}
                  />
                )}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
      {selectedRequest && (
        <VacationDetailModal
          request={selectedRequest}
          onClose={() => handleRowClick(null)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </VacationRequestPageContainer>
  );
};

export default VacationDetailPage;
