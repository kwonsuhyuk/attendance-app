import { useEffect, useState } from "react";
import { IVacationRequest } from "@/components/company/table/VacationColumns";
import { useUserStore } from "@/store/user.store";
import { fetchVacationRegistered } from "@/api/vacation.api";

// 더미데이터는 추후 제거 예정
// const dummyRequests: IVacationRequest[] = [
//   {
//     id: 1,
//     requestType: "연차",
//     requester: "김철수",
//     requestDate: "2025.04.01 ~ 2025.04.03",
//     reason: "가족 행사",
//     status: "대기중",
//   },
//   {
//     id: 2,
//     requestType: "반차",
//     requester: "이영희",
//     requestDate: "2025.04.05",
//     reason: "감기",
//     status: "승인",
//   },
//   {
//     id: 3,
//     requestType: "특별",
//     requester: "박민수",
//     requestDate: "2025.04.07 ~ 2025.04.10",
//     reason: "개인 사정",
//     status: "거절",
//   },
//   {
//     id: 4,
//     requestType: "병가",
//     requester: "최수진",
//     requestDate: "2025.04.11",
//     reason: "독감",
//     status: "대기중",
//   },
//   {
//     id: 5,
//     requestType: "연차",
//     requester: "김영호",
//     requestDate: "2025.04.15 ~ 2025.04.16",
//     reason: "가족 여행",
//     status: "대기중",
//   },
//   {
//     id: 6,
//     requestType: "출산휴가",
//     requester: "박선영",
//     requestDate: "2025.04.20 ~ 2025.04.27",
//     reason: "출산 예정",
//     status: "승인",
//   },
//   {
//     id: 7,
//     requestType: "반차",
//     requester: "이정훈",
//     requestDate: "2025.04.18",
//     reason: "병원 방문",
//     status: "승인",
//   },
//   {
//     id: 8,
//     requestType: "특별",
//     requester: "송지현",
//     requestDate: "2025.04.25 ~ 2025.04.26",
//     reason: "남아프리카 공화국 해외 출장 / 부산 출장",
//     status: "거절",
//   },
//   {
//     id: 9,
//     requestType: "연차",
//     requester: "한도윤",
//     requestDate: "2025.04.29",
//     reason: "개인 사정",
//     status: "거절",
//   },
//   {
//     id: 10,
//     requestType: "연차",
//     requester: "한도윤",
//     requestDate: "2025.04.29",
//     reason: "개인 사정",
//     status: "거절",
//   },
//   {
//     id: 11,
//     requestType: "연차",
//     requester: "한도윤",
//     requestDate: "2025.04.29",
//     reason: "개인 사정",
//     status: "거절",
//   },
//   {
//     id: 12,
//     requestType: "연차",
//     requester: "한도윤",
//     requestDate: "2025.04.29",
//     reason: "개인 사정",
//     status: "거절",
//   },
//   {
//     id: 13,
//     requestType: "연차",
//     requester: "한도윤",
//     requestDate: "2025.04.29",
//     reason: "개인 사정",
//     status: "거절",
//   },
//   {
//     id: 14,
//     requestType: "연차",
//     requester: "한도윤",
//     requestDate: "2025.04.29",
//     reason: "개인 사정",
//     status: "거절",
//   },
//   {
//     id: 15,
//     requestType: "연차",
//     requester: "한도윤",
//     requestDate: "2025.04.29",
//     reason: "개인 사정",
//     status: "거절",
//   },
// ];
export const useVacationRequests = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 더미데이터 사용시
  // const [requests, setRequests] = useState<IVacationRequest[]>(dummyRequests);
  const [requests, setRequests] = useState<IVacationRequest[]>([]);
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
