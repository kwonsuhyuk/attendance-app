import { DataTable } from "@/components/ui/data-table";
import { getVacationColumns } from "@/components/company/table/VacationColumns";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VacationRegisterModal from "@/components/common/modal/VacationRegisterModal";
import EmployeeListPageContainer from "@/components/container/manager/EmployeeListPageContainer";
import { useVacationRequests } from "@/hooks/manager/useVacationRequests";
import { TAB_CONTENTS, TAB_ITEMS } from "@/constants/vacationTabs";

const VacationDetailPage = () => {
  const {
    isModalOpen,
    toggleModal,
    requests,
    registeredRequests,
    handleRegister,
    handleApprove,
    handleReject,
  } = useVacationRequests();

  return (
    <EmployeeListPageContainer>
      <div className="p-5">
        <Tabs defaultValue="pending" className="w-full">
          <div className="flex justify-between">
            <TabsList className="bg-white-card-bg dark:bg-dark-card-bg">
              {TAB_ITEMS.map(tab => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="min-w-[120px] flex-1 border-b-2 border-transparent px-6 py-3 text-center font-semibold text-white-text data-[state=active]:text-black dark:data-[state=active]:bg-white-border-sub dark:data-[state=active]:text-white-bg sm:min-w-[150px]"
                >
                  {tab.label}
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
            <TabsContent key={tab.value} value={tab.value}>
              <DataTable
                columns={getVacationColumns(
                  tab.value === "registered" ? undefined : handleApprove,
                  tab.value === "registered" ? undefined : handleReject,
                  tab.includeActions,
                  tab.isRegistered ?? false,
                )}
                data={tab.value === "registered" ? registeredRequests : requests.filter(tab.filter)}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </EmployeeListPageContainer>
  );
};

export default VacationDetailPage;
