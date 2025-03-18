import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { getVacationColumns, VacationRequest } from "@/components/company/table/VacationColumns";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VacationModal from "@/components/common/modal/VacationRegisterModal";
import EmployeeListPageContainer from "@/components/container/manager/EmployeeListPageContainer";

const dummyRequests: VacationRequest[] = [
  {
    id: 1,
    requestType: "연차",
    requester: "김철수",
    requestDate: "2025-04-01",
    reason: "가족 행사",
    status: "대기중",
  },
  {
    id: 2,
    requestType: "반차",
    requester: "이영희",
    requestDate: "2025-04-05",
    reason: "감기",
    status: "승인됨",
  },
  {
    id: 3,
    requestType: "특별",
    requester: "박민수",
    requestDate: "2025-04-07",
    reason: "개인 사정",
    status: "거절됨",
  },
];

const VacationDetailPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requests, setRequests] = useState<VacationRequest[]>(dummyRequests);

  const toggleModal = () => setIsModalOpen(prev => !prev);

  const handleApprove = (id: number) => {
    setRequests(prev => prev.map(req => (req.id === id ? { ...req, status: "승인됨" } : req)));
  };

  const handleReject = (id: number) => {
    setRequests(prev => prev.map(req => (req.id === id ? { ...req, status: "거절됨" } : req)));
  };

  return (
    <EmployeeListPageContainer>
      <div className="p-5">
        <Tabs defaultValue="pending" className="w-full">
          <div className="flex justify-between">
            <TabsList className="bg-white-card-bg">
              <TabsTrigger
                value="pending"
                className="min-w-[120px] flex-1 border-b-2 border-transparent px-6 py-3 text-center font-semibold text-gray-600 hover:bg-gray-100 data-[state=active]:text-black sm:min-w-[150px]"
              >
                대기중
              </TabsTrigger>
              <TabsTrigger
                value="processed"
                className="min-w-[120px] flex-1 border-b-2 border-transparent px-6 py-3 text-center font-semibold text-gray-600 hover:bg-gray-100 data-[state=active]:text-black sm:min-w-[150px]"
              >
                처리 내역
              </TabsTrigger>
              <TabsTrigger
                value="registered"
                className="min-w-[120px] flex-1 border-b-2 border-transparent px-6 py-3 text-center font-semibold text-gray-600 hover:bg-gray-100 data-[state=active]:text-black sm:min-w-[150px]"
              >
                등록 내역
              </TabsTrigger>
            </TabsList>
            <Button className="mb-4" onClick={toggleModal}>
              요청 등록 +
            </Button>
            {isModalOpen && <VacationModal onClose={toggleModal} />}
          </div>
          <TabsContent value="pending">
            <DataTable
              columns={getVacationColumns(handleApprove, handleReject, true)}
              data={requests.filter(req => req.status === "대기중")}
            />
          </TabsContent>
          <TabsContent value="processed">
            <DataTable
              columns={getVacationColumns(handleApprove, handleReject, false)}
              data={requests.filter(req => req.status === "승인됨" || req.status === "거절됨")}
            />
          </TabsContent>
          <TabsContent value="registered">
            <p className="py-6 text-center text-gray-500">등록된 요청이 없습니다.</p>
          </TabsContent>
        </Tabs>
      </div>
    </EmployeeListPageContainer>
  );
};

export default VacationDetailPage;
