import { useEffect, useState } from "react";
import { IVacationRequest } from "@/components/company/table/VacationColumns";
import { useUserStore } from "@/store/user.store";
import {
  fetchVacationRegistered,
  fetchVacationRequests,
  updateVacationRequestStatus,
} from "@/api/vacation.api";
import { registerVacation } from "@/api/vacation.api";
import { format } from "date-fns";
import { TRegisteredVacation, TVacationType } from "@/model/types/vacation.type";

export const useVacationRequests = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 더미데이터 사용시
  // const [requests, setRequests] = useState<IVacationRequest[]>(DUMMY_VACATION_REQUESTS);
  const [requests, setRequests] = useState<IVacationRequest[]>([]);
  const [registeredRequests, setRegisteredRequests] = useState<IVacationRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<IVacationRequest | null>(null);
  const [page, setPage] = useState<Record<string, number>>({
    pending: 0,
    processed: 0,
    registered: 0,
  });
  const [activeTab, setActiveTab] = useState("pending");

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

  const handleApprove = async (id: string) => {
    if (!companyCode) return;

    const processedAt = new Date().toISOString();
    await updateVacationRequestStatus(companyCode, id, "승인", processedAt);

    const approved = requests.find(req => req.id === id);
    if (!approved) return;

    const { requester, requestType, reason, requestDate } = approved;
    const [startDate, endDate] = requestDate.split(" ~ ");

    if (!requester.uid) return;
    if (!requester.jobName) return;

    const year = format(new Date(startDate), "yyyy");
    const month = format(new Date(startDate), "MM");
    const registerId = `${id}-${requester.uid}`;
    const data: TRegisteredVacation = {
      registerId,
      name: requester.name,
      email: requester.email,
      jobName: requester.jobName,
      vacationType: requestType as TVacationType,
      startDate,
      endDate,
      reason,
      createdAt: processedAt,
      status: "승인",
    };

    await registerVacation(companyCode, year, month, requester.uid, registerId, data);

    setRequests(prev =>
      prev.map(req => (req.id === id ? { ...req, status: "승인", processedAt } : req)),
    );
  };

  const handleReject = async (id: string) => {
    if (!companyCode) return;

    const processedAt = new Date().toISOString();
    await updateVacationRequestStatus(companyCode, id, "거절", processedAt);

    setRequests(prev =>
      prev.map(req => (req.id === id ? { ...req, status: "거절", processedAt } : req)),
    );
  };

  const handleRowClick = (request: IVacationRequest | null) => {
    setSelectedRequest(request);
  };

  useEffect(() => {
    const loadRequests = async () => {
      if (!companyCode) return;
      const snapshot = await fetchVacationRequests(companyCode);

      if (!snapshot) return;

      const mapped: IVacationRequest[] = Object.entries(snapshot).map(([id, item]) => ({
        id,
        requestType: item.vacationType,
        requester: {
          name: item.requester.name,
          email: item.requester.email,
          uid: item.requester.uid,
          jobName: item.requester.jobName,
        },
        requestDate: `${item.startDate} ~ ${item.endDate}`,
        reason: item.reason,
        status: item.status === "승인" ? "승인" : item.status === "거절" ? "거절" : "대기중",
        email: item.requester.email,
        processedAt: item.processedAt,
      }));

      setRequests(mapped);
    };

    loadRequests();
  }, [companyCode]);

  useEffect(() => {
    const loadRegistered = async () => {
      if (!companyCode) return;
      const data = await fetchVacationRegistered(companyCode);

      const mapped = data
        .filter(item => item.status === "자동 승인됨") // ✅ 자동 승인만 등록탭에 포함
        .map(item => {
          return {
            id: item.createdAt ?? new Date().toISOString(),
            requestType: item.vacationType,
            requester: {
              name: item.name,
              email: item.email,
            },
            requestDate: `${item.startDate} ~ ${item.endDate}`,
            reason: item.reason,
            status: "자동 승인" as IVacationRequest["status"],
            email: item.email,
          };
        })
        .sort((a, b) => new Date(b.id).getTime() - new Date(a.id).getTime());

      setRegisteredRequests(mapped);
    };

    loadRegistered();
  }, [companyCode]);

  const getFilteredVacationData = (
    tabValue: string,
    filter: (item: IVacationRequest) => boolean,
  ) => {
    if (tabValue === "registered") return registeredRequests;

    if (tabValue === "processed") {
      return requests.filter(filter).sort((a, b) => {
        const aTime = a.processedAt
          ? new Date(a.processedAt).getTime()
          : new Date(a.requestDate.split(" ~ ")[0]).getTime();
        const bTime = b.processedAt
          ? new Date(b.processedAt).getTime()
          : new Date(b.requestDate.split(" ~ ")[0]).getTime();
        return bTime - aTime;
      });
    }

    return requests.filter(filter);
  };

  return {
    modal: {
      isOpen: isModalOpen,
      toggle: toggleModal,
    },
    requests: {
      all: requests,
      registered: registeredRequests,
      register: handleRegister,
      approve: handleApprove,
      reject: handleReject,
      filter: getFilteredVacationData,
      pendingCount,
    },
    pagination: {
      page,
      setPage,
      next: onNext,
      previous: onPrevious,
      getTotalPages,
      getCurrentPageData,
    },
    selection: {
      selected: selectedRequest,
      select: handleRowClick,
    },
    tab: {
      active: activeTab,
      setActive: setActiveTab,
    },
  };
};
