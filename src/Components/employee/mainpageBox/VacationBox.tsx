import { Card, CardTitle } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { CheckCircle2, XCircle, Clock, ChevronRight, PlaneTakeoff } from "lucide-react";
import React from "react";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { TVacationRequest } from "@/model/types/vacation.type";
import EmployeeVacationList from "@/components/company/vacation/EmployeeVacationList";

const VacationBox = () => {
  const navigate = useNavigate();
  const { companyCode } = useParams();

  // 예시 휴가 요청 데이터 (시간 순서: 오래된 → 최신)
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
  ];

  // 최신순 정렬 후 최대 3개
  const latestRequests = [...vacationRequests]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <Card
      className="group relative cursor-pointer p-4 shadow-md transition hover:bg-accent"
      onClick={() => navigate(`/${companyCode}/myvacation`)}
    >
      {/* 우측 이동 아이콘 */}
      <ChevronRight className="absolute right-4 top-4 h-5 w-5 text-muted-foreground group-hover:text-foreground" />

      {/* 헤더 */}
      <div className="flex items-center gap-2 text-base font-semibold">
        <PlaneTakeoff className="h-5 w-5 text-primary" />
        <CardTitle className="text-base">나의 휴가 내역</CardTitle>
      </div>

      {/* 휴가 요청 리스트 */}
      <EmployeeVacationList requests={vacationRequests} />
    </Card>
  );
};

export default VacationBox;
