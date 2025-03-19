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
];
export const useVacationRequests = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requests, setRequests] = useState<IVacationRequest[]>(dummyRequests);
  const [registeredRequests, setRegisteredRequests] = useState<IVacationRequest[]>([]);

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
  };
};
