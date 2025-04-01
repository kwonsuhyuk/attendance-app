import { Card, CardTitle } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { CheckCircle2, XCircle, Clock, ChevronRight, PlaneTakeoff } from "lucide-react";
import React from "react";
import { TVacationRequest } from "@/types/vacation.type";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

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
      status: "승인됨",
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
      status: "거절됨",
      createdAt: "2025-03-27T11:00:00Z",
      processedAt: "2025-03-28T09:00:00Z",
    },
  ];

  const getStatusInfo = (status: TVacationRequest["status"]) => {
    switch (status) {
      case "승인됨":
        return {
          icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
          label: "승인됨",
          textColor: "text-green-600",
        };
      case "거절됨":
        return {
          icon: <XCircle className="h-4 w-4 text-red-500" />,
          label: "거절됨",
          textColor: "text-red-600",
        };
      case "대기중":
      default:
        return {
          icon: <Clock className="h-4 w-4 text-yellow-500" />,
          label: "대기중",
          textColor: "text-yellow-600",
        };
    }
  };

  // 최신순 정렬 후 최대 3개
  const latestRequests = [...vacationRequests]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <Card
      className="group relative cursor-pointer p-4 shadow-md transition hover:bg-accent"
      onClick={() => navigate(`/${companyCode}/leave/history`)}
    >
      {/* 우측 이동 아이콘 */}
      <ChevronRight className="absolute right-4 top-4 h-5 w-5 text-muted-foreground group-hover:text-foreground" />

      {/* 헤더 */}
      <div className="flex items-center gap-2 text-base font-semibold">
        <PlaneTakeoff className="h-5 w-5 text-primary" />
        <CardTitle className="text-base">내 휴가 내역</CardTitle>
      </div>

      {/* 휴가 요청 리스트 */}
      <div className="mt-4 flex flex-col gap-3">
        {latestRequests.length > 0 ? (
          latestRequests.map(request => {
            const { icon, label, textColor } = getStatusInfo(request.status);
            const start = format(new Date(request.startDate), "M월 d일 (E)", { locale: ko });
            const end = format(new Date(request.endDate), "M월 d일 (E)", { locale: ko });
            const isSameDay = request.startDate === request.endDate;

            return (
              <div
                key={request.requestId}
                className="flex items-center justify-between rounded-md px-4 py-2 text-sm shadow-md"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">
                    {request.vacationType} | {isSameDay ? start : `${start} ~ ${end}`}
                  </span>
                  <span className="text-xs text-muted-foreground">{request.reason}</span>
                </div>
                <div className={`flex items-center gap-1 text-xs font-semibold ${textColor}`}>
                  {icon}
                  {label}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-sm text-muted-foreground">📭 휴가 요청 내역이 없습니다.</div>
        )}
      </div>
    </Card>
  );
};

export default VacationBox;
