import { DataTable } from "@/components/ui/data-table";
import { getVacationColumns } from "@/components/company/table/VacationColumns";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VacationRegisterModal from "@/components/common/modal/VacationRegisterModal";
import EmployeeListPageContainer from "@/components/container/manager/EmployeeListPageContainer";
import { useVacationRequests } from "@/hooks/manager/useVacationRequests";
import { TAB_CONTENTS, TAB_ITEMS } from "@/constants/vacationTabs";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "antd";

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
  } = useVacationRequests();

  return (
    <EmployeeListPageContainer>
      <div className="p-5">
        <Tabs defaultValue="pending" className="w-full">
          <div className="flex justify-between">
            <TabsList className="flex w-full justify-start bg-white-card-bg dark:bg-dark-card-bg">
              {TAB_ITEMS.map(tab => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="relative min-w-[80px] max-w-[200px] flex-1 border-b-2 border-transparent px-4 py-2 text-center text-sm font-semibold text-white-text data-[state=active]:text-black dark:data-[state=active]:bg-white-border-sub dark:data-[state=active]:text-white-bg sm:px-6 sm:py-3 sm:text-base"
                >
                  <span className="flex items-center justify-center gap-1">
                    {tab.label}
                    {tab.value === "pending" && pendingCount > 0 && (
                      <Badge className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                        {pendingCount}
                      </Badge>
                    )}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            <Button className="mb-4" onClick={toggleModal}>
              요청 등록 +
            </Button>
            {isModalOpen && (
              <VacationRegisterModal onClose={toggleModal} onRegister={handleRegister} />
            )}
          </div>

          {TAB_CONTENTS.map(tab => (
            <TabsContent key={tab.value} value={tab.value} className="w-full">
              <div className="w-full overflow-x-auto">
                <DataTable
                  columns={getVacationColumns(
                    tab.value === "registered" ? undefined : handleApprove,
                    tab.value === "registered" ? undefined : handleReject,
                    tab.includeActions,
                    tab.isRegistered ?? false,
                  )}
                  data={
                    tab.value === "registered" ? registeredRequests : requests.filter(tab.filter)
                  }
                />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </EmployeeListPageContainer>
  );
};

export default VacationDetailPage;
