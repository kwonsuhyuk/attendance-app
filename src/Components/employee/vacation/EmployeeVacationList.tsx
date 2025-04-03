import React from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { TVacationRequest } from "@/model/types/vacation.type";
import EmployeeVacationItem from "./EmployeeVacationItem";

interface Props {
  requests: TVacationRequest[];
  paginated?: boolean;
}

const getStatusInfo = (status: TVacationRequest["status"]) => {
  switch (status) {
    case "승인":
      return {
        label: "승인됨",
      };
    case "거절":
      return {
        label: "거절됨",
      };
    case "대기중":
    default:
      return {
        label: "대기중",
      };
  }
};

const EmployeeVacationList = ({ requests, paginated = false }: Props) => {
  const list = paginated
    ? requests
    : [...requests]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 3);

  return (
    <div className="mt-4 flex flex-col gap-3">
      {list.length > 0 ? (
        list.map(request => {
          const { label } = getStatusInfo(request.status);
          const start = format(new Date(request.startDate), "M월 d일 (E)", { locale: ko });
          const end = format(new Date(request.endDate), "M월 d일 (E)", { locale: ko });
          const isSameDay = request.startDate === request.endDate;

          return (
            <EmployeeVacationItem
              request={request}
              label={label}
              start={start}
              end={end}
              isSameDay={isSameDay}
            />
          );
        })
      ) : (
        <div className="flex justify-center text-sm text-muted-foreground">
          휴가 요청 내역이 없습니다.
        </div>
      )}
    </div>
  );
};

export default EmployeeVacationList;
