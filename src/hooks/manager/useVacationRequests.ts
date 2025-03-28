import { useEffect, useState } from "react";
import { IVacationRequest } from "@/components/company/table/VacationColumns";
import { useUserStore } from "@/store/user.store";
import { fetchVacationRegistered } from "@/api/vacation.api";
import { DUMMY_VACATION_REQUESTS } from "@/constants/dummyVacationRequests";

export const useVacationRequests = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 더미데이터 사용시
  const [requests, setRequests] = useState<IVacationRequest[]>(DUMMY_VACATION_REQUESTS);
  // const [requests, setRequests] = useState<IVacationRequest[]>([]);
  const [registeredRequests, setRegisteredRequests] = useState<IVacationRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<IVacationRequest | null>(null);
  const [page, setPage] = useState<Record<string, number>>({
    pending: 0,
    processed: 0,
    registered: 0,
  });
  const companyCode = useUserStore(state => state.currentUser?.companyCode);
  const itemsPerPage = 10;
  const pendingCount = requests.filter(req => req.status === "대기중").length;

  const toggleModal = () => setIsModalOpen(prev => !prev);

  const getTotalPages = (filteredRequests: IVacationRequest[]) =>
    Math.ceil(filteredRequests.length / itemsPerPage);

  const getCurrentPageData = (filteredRequests: IVacationRequest[], tab: string) =>
    filteredRequests.slice(page[tab] * itemsPerPage, (page[tab] + 1) * itemsPerPage);

  const onNext = (tab: string, totalPageCount: number) => {
    if (page[tab] < totalPageCount - 1) {
      setPage(prev => ({ ...prev, [tab]: prev[tab] + 1 }));
    }
  };
  const onPrevious = (tab: string) => {
    if (page[tab] > 0) {
      setPage(prev => ({ ...prev, [tab]: prev[tab] - 1 }));
    }
  };

  const handleRegister = (newRequest: IVacationRequest) => {
    setRegisteredRequests(prev => [...prev, newRequest]);
  };

  const handleApprove = (id: number) => {
    setRequests(prev => prev.map(req => (req.id === id ? { ...req, status: "승인" } : req)));
  };

  const handleReject = (id: number) => {
    setRequests(prev => prev.map(req => (req.id === id ? { ...req, status: "거절" } : req)));
  };

  const handleRowClick = (request: IVacationRequest | null) => {
    setSelectedRequest(request);
  };

  useEffect(() => {
    const loadRegistered = async () => {
      if (!companyCode) return;
      const data = await fetchVacationRegistered(companyCode);

      const mapped: IVacationRequest[] = data.map((item, idx) => {
        const status: IVacationRequest["status"] = "자동 승인"; // 등록은 무조건 자동 승인

        return {
          id: idx + 1,
          requestType: item.vacationType,
          requester: item.name,
          requestDate: `${item.startDate} ~ ${item.endDate}`,
          reason: item.reason,
          status,
          email: item.email,
        };
      });

      setRegisteredRequests(mapped);
    };

    loadRegistered();
  }, [companyCode]);

  return {
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
  };
};
