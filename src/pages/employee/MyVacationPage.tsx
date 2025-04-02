import { Button } from "@/components/ui/button";
import { IVacationRequest } from "@/components/company/table/VacationColumns";
import { useMyVacation } from "@/hooks/employee/useMyVacation";
import { useVacationRequests } from "@/hooks/manager/useVacationRequests";
import VacationRequestModal from "@/components/common/modal/VacationRequestModal";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { PlaneTakeoff, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import EmployeeVacationList from "@/components/company/vacation/EmployeeVacationList";
import { TVacationRequest } from "@/model/types/vacation.type";
import Pagination from "@/components/ui/pagination";

const vacationRequests: TVacationRequest[] = [
  {
    requestId: "1",
    requester: {
      uid: "u1",
      name: "홍길동",
      email: "hong@example.com",
      jobName: "프론트엔드 개발자",
    },
    vacationType: "연차",
    startDate: "2025-05-10",
    endDate: "2025-05-10",
    reason: "개인 사유",
    status: "대기중",
    createdAt: "2025-04-01T09:00:00Z",
  },
  {
    requestId: "2",
    requester: {
      uid: "u1",
      name: "홍길동",
      email: "hong@example.com",
      jobName: "프론트엔드 개발자",
    },
    vacationType: "반차",
    startDate: "2025-05-03",
    endDate: "2025-05-03",
    reason: "병원 진료",
    status: "승인",
    createdAt: "2025-03-29T12:00:00Z",
    processedAt: "2025-03-30T09:00:00Z",
  },
  {
    requestId: "3",
    requester: {
      uid: "u1",
      name: "홍길동",
      email: "hong@example.com",
      jobName: "프론트엔드 개발자",
    },
    vacationType: "연차",
    startDate: "2025-04-25",
    endDate: "2025-04-25",
    reason: "집안일",
    status: "거절",
    createdAt: "2025-03-27T11:00:00Z",
    processedAt: "2025-03-28T09:00:00Z",
  },
  {
    requestId: "1",
    requester: {
      uid: "u1",
      name: "홍길동",
      email: "hong@example.com",
      jobName: "프론트엔드 개발자",
    },
    vacationType: "연차",
    startDate: "2025-05-10",
    endDate: "2025-05-10",
    reason: "개인 사유",
    status: "대기중",
    createdAt: "2025-04-01T09:00:00Z",
  },
  {
    requestId: "2",
    requester: {
      uid: "u1",
      name: "홍길동",
      email: "hong@example.com",
      jobName: "프론트엔드 개발자",
    },
    vacationType: "반차",
    startDate: "2025-05-03",
    endDate: "2025-05-03",
    reason: "병원 진료",
    status: "승인",
    createdAt: "2025-03-29T12:00:00Z",
    processedAt: "2025-03-30T09:00:00Z",
  },
  {
    requestId: "3",
    requester: {
      uid: "u1",
      name: "홍길동",
      email: "hong@example.com",
      jobName: "프론트엔드 개발자",
    },
    vacationType: "연차",
    startDate: "2025-04-25",
    endDate: "2025-04-25",
    reason: "집안일",
    status: "거절",
    createdAt: "2025-03-27T11:00:00Z",
    processedAt: "2025-03-28T09:00:00Z",
  },
  {
    requestId: "1",
    requester: {
      uid: "u1",
      name: "홍길동",
      email: "hong@example.com",
      jobName: "프론트엔드 개발자",
    },
    vacationType: "연차",
    startDate: "2025-05-10",
    endDate: "2025-05-10",
    reason: "개인 사유",
    status: "대기중",
    createdAt: "2025-04-01T09:00:00Z",
  },
  {
    requestId: "2",
    requester: {
      uid: "u1",
      name: "홍길동",
      email: "hong@example.com",
      jobName: "프론트엔드 개발자",
    },
    vacationType: "반차",
    startDate: "2025-05-03",
    endDate: "2025-05-03",
    reason: "병원 진료",
    status: "승인",
    createdAt: "2025-03-29T12:00:00Z",
    processedAt: "2025-03-30T09:00:00Z",
  },
  {
    requestId: "3",
    requester: {
      uid: "u1",
      name: "홍길동",
      email: "hong@example.com",
      jobName: "프론트엔드 개발자",
    },
    vacationType: "연차",
    startDate: "2025-04-25",
    endDate: "2025-04-25",
    reason: "집안일",
    status: "거절",
    createdAt: "2025-03-27T11:00:00Z",
    processedAt: "2025-03-28T09:00:00Z",
  },
];

const MyVacationPage = () => {
  const { isModalOpen, toggleModal } = useMyVacation();
  const { requests } = useVacationRequests();
  const { register: handleRequest } = requests;
  const [date, setDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(0);

  const [filterStatus, setFilterStatus] = useState<"전체" | "대기중" | "승인" | "거절">("전체");
  const filteredRequests =
    filterStatus === "전체"
      ? vacationRequests
      : vacationRequests.filter(request => request.status === filterStatus);

  const ITEMS_PER_PAGE = 7;
  const totalPageCount = Math.ceil(filteredRequests.length / ITEMS_PER_PAGE);
  const paginatedRequests = filteredRequests.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE,
  );

  const handleSubmit = (data: IVacationRequest) => {
    handleRequest(data);
  };

  const year = date.getFullYear();

  const handleYearChange = (direction: "prev" | "next") => {
    setDate(prev => {
      const newDate = new Date(prev);
      newDate.setFullYear(direction === "prev" ? prev.getFullYear() - 1 : prev.getFullYear() + 1);
      return newDate;
    });
  };

  return (
    <div className="flex w-full flex-col gap-4 sm:py-5">
      <Button className="w-full cursor-pointer" onClick={toggleModal}>
        휴가 요청
      </Button>

      {/* 연도 선택 카드 */}
      <Card className="bg-vacation-color dark:bg-vacation-color relative cursor-pointer rounded-xl p-4 text-white shadow-md transition">
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => handleYearChange("prev")}
              size="icon"
              className="h-7 w-7 bg-white/20 text-white hover:bg-white/30"
              aria-label="이전 연도"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">{year}년</span>
            <Button
              onClick={() => handleYearChange("next")}
              size="icon"
              className="h-7 w-7 bg-white/20 text-white hover:bg-white/30"
              aria-label="다음 연도"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <CardContent className="mt-6 flex flex-col items-center justify-center gap-6 p-0 text-sm text-white">
          <div className="flex items-center gap-2">
            <span className="text-base">
              {year}년에 사용한 휴가는 총 <span className="font-bold underline">0일</span>입니다.
            </span>
          </div>

          {/* 휴가 상세 수치 정보 - 뱃지 형식 */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-white/80">
            <span className="rounded-full bg-white/10 px-2 py-1">연차 휴가 10일</span>
            <span className="rounded-full bg-white/10 px-2 py-1">반차 휴가 11일</span>
            <span className="rounded-full bg-white/10 px-2 py-1">특별 휴가 12일</span>
          </div>
        </CardContent>
      </Card>

      {/* 나의 휴가 내역 카드 */}
      <Card className="relative flex cursor-pointer flex-col gap-5 p-4 shadow-md transition hover:bg-gray-50 dark:hover:bg-dark-card-bg">
        <div className="flex items-center gap-2 text-base font-semibold">
          <PlaneTakeoff className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">나의 휴가 내역</CardTitle>
        </div>

        {/* 필터 버튼 */}
        <div className="flex gap-2 text-sm font-medium">
          {["전체", "대기중", "승인", "거절"].map(status => (
            <Button
              key={status}
              size="sm"
              variant={filterStatus === status ? "default" : "outline"}
              onClick={() => {
                setFilterStatus(status as any);
                setCurrentPage(0);
              }}
            >
              {status}
            </Button>
          ))}
        </div>

        {/* 리스트 */}
        <EmployeeVacationList
          key={`${filterStatus}-${currentPage}`}
          requests={paginatedRequests}
          paginated
        />

        {/* 페이지네이션 */}
        <Pagination
          page={currentPage}
          totalPageCount={totalPageCount}
          onNext={() => setCurrentPage(prev => Math.min(prev + 1, totalPageCount - 1))}
          onPrevious={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
        />
      </Card>

      {isModalOpen && <VacationRequestModal onClose={toggleModal} onRegister={handleSubmit} />}
    </div>
  );
};

export default MyVacationPage;
