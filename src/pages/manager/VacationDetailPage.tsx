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
    requestType: "병가",
    requester: "이영희",
    requestDate: "2025-04-05",
    reason: "감기",
    status: "승인됨",
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
      <div className="flex justify-between">
        <Button className="mb-4" onClick={toggleModal}>
          요청 등록 +
        </Button>
        {isModalOpen && <VacationModal onClose={toggleModal} />}
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="flex border-b">
          <TabsTrigger
            value="pending"
            className="flex-1 border-b-2 border-transparent px-4 py-2 text-center font-semibold text-gray-600 hover:bg-gray-100 data-[state=active]:text-black"
          >
            대기중
          </TabsTrigger>
          <TabsTrigger
            value="approved"
            className="flex-1 border-b-2 border-transparent px-4 py-2 text-center font-semibold text-gray-600 hover:bg-gray-100 data-[state=active]:text-black"
          >
            승인됨
          </TabsTrigger>
          <TabsTrigger
            value="rejected"
            className="flex-1 border-b-2 border-transparent px-4 py-2 text-center font-semibold text-gray-600 hover:bg-gray-100 data-[state=active]:text-black"
          >
            거절됨
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <DataTable
            columns={getVacationColumns(handleApprove, handleReject)}
            data={requests.filter(req => req.status === "대기중")}
          />
        </TabsContent>
        <TabsContent value="approved">
          <DataTable
            columns={getVacationColumns(handleApprove, handleReject)}
            data={requests.filter(req => req.status === "승인됨")}
          />
        </TabsContent>
        <TabsContent value="rejected">
          <DataTable
            columns={getVacationColumns(handleApprove, handleReject)}
            data={requests.filter(req => req.status === "거절됨")}
          />
        </TabsContent>
      </Tabs>
    </EmployeeListPageContainer>
  );
};

export default VacationDetailPage;
