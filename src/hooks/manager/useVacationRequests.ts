import { useState } from "react";
import { IVacationRequest } from "@/components/company/table/VacationColumns";

const dummyRequests: IVacationRequest[] = [
  {
    id: 1,
    requestType: "연차",
    requester: "김철수",
    requestDate: "2025.04.01 ~ 2025.04.03",
    reason: "가족 행사",
    status: "대기중",
  },
  {
    id: 2,
    requestType: "반차",
    requester: "이영희",
    requestDate: "2025.04.05",
    reason: "감기",
    status: "승인됨",
  },
  {
    id: 3,
    requestType: "특별",
    requester: "박민수",
    requestDate: "2025.04.07 ~ 2025.04.10",
    reason: "개인 사정",
    status: "거절됨",
  },
  {
    id: 4,
    requestType: "병가",
    requester: "최수진",
    requestDate: "2025.04.11",
    reason: "독감",
    status: "대기중",
  },
  {
    id: 5,
    requestType: "연차",
    requester: "김영호",
    requestDate: "2025.04.15 ~ 2025.04.16",
    reason: "가족 여행",
    status: "대기중",
  },
  {
    id: 6,
    requestType: "출산휴가",
    requester: "박선영",
    requestDate: "2025.04.20 ~ 2025.04.27",
    reason: "출산 예정",
    status: "승인됨",
  },
  {
    id: 7,
    requestType: "반차",
    requester: "이정훈",
    requestDate: "2025.04.18",
    reason: "병원 방문",
    status: "승인됨",
  },
  {
    id: 8,
    requestType: "특별",
    requester: "송지현",
    requestDate: "2025.04.25 ~ 2025.04.26",
    reason: "해외 출장",
    status: "거절됨",
  },
  {
    id: 9,
    requestType: "연차",
    requester: "한도윤",
    requestDate: "2025.04.29",
    reason: "개인 사정",
    status: "거절됨",
  },
];
export const useVacationRequests = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requests, setRequests] = useState<IVacationRequest[]>(dummyRequests);
  const [registeredRequests, setRegisteredRequests] = useState<IVacationRequest[]>([]);

  const pendingCount = requests.filter(req => req.status === "대기중").length;

  const toggleModal = () => setIsModalOpen(prev => !prev);

  const handleRegister = (newRequest: IVacationRequest) => {
    setRegisteredRequests(prev => [...prev, newRequest]);
  };

  const handleApprove = (id: number) => {
    setRequests(prev => prev.map(req => (req.id === id ? { ...req, status: "승인됨" } : req)));
  };

  const handleReject = (id: number) => {
    setRequests(prev => prev.map(req => (req.id === id ? { ...req, status: "거절됨" } : req)));
  };

  return {
    isModalOpen,
    toggleModal,
    requests,
    registeredRequests,
    handleRegister,
    handleApprove,
    handleReject,
    pendingCount,
  };
};
