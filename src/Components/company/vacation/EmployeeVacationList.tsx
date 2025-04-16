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
        icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
        label: "승인됨",
        textColor: "text-green-600",
      };
    case "거절":
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
          const { icon, label, textColor } = getStatusInfo(request.status);
          const start = format(new Date(request.startDate), "M월 d일 (E)", { locale: ko });
          const end = format(new Date(request.endDate), "M월 d일 (E)", { locale: ko });
          const isSameDay = request.startDate === request.endDate;

          return (
            <EmployeeVacationItem
              key={request.createdAt}
              request={request}
              textColor={textColor}
              icon={icon}
              label={label}
              start={start}
              end={end}
              isSameDay={isSameDay}
            />
          );
        })
      ) : (
        <div className="text-sm text-muted-foreground">휴가 요청 내역이 없습니다.</div>
      )}
    </div>
  );
};

export default EmployeeVacationList;
