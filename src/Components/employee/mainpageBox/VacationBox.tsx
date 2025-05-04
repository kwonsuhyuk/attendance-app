import { Card, CardTitle } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronRight, PlaneTakeoff } from "lucide-react";
import React from "react";
import { useGetEmployeeVacationList } from "@/hooks/vacation/useGetEmployeeVacationList";
import { useUserStore } from "@/store/user.store";
import Loading from "@/components/common/Loading";
import Error from "@/components/Error";
import EmployeeVacationList from "../vacation/EmployeeVacationList";
import { Badge } from "@/components/ui/badge";
import { useNotification } from "@/hooks/employee/useNotification";


const VacationBox = () => {
  const navigate = useNavigate();
  const { companyCode } = useParams();

  const { requests, error } = useGetEmployeeVacationList({
    companyCode,
    year: new Date().getFullYear().toString(),
  });

  const { unreadVacationNotifications } = useNotification();

  return (
    <Card className="group relative p-4 shadow-md transition hover:bg-accent">
      {/* 우측 이동 아이콘 */}
      <ChevronRight
        className="absolute right-4 top-4 h-5 w-5 cursor-pointer text-muted-foreground group-hover:text-foreground"
        onClick={e => {
          e.stopPropagation(); // 중요!
          navigate(`/${companyCode}/myvacation`);
        }}
      />

      {/* 헤더 */}
      <CardTitle className="flex items-center gap-2 text-base font-semibold">
        <PlaneTakeoff className="h-5 w-5 text-primary" />
        <div className="flex items-center gap-1 text-base">
          최근 휴가 내역
          {unreadVacationNotifications > 0 && (
            <Badge
              variant="default"
              className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 p-0 text-[10px] font-bold text-white"
            >
              {unreadVacationNotifications}
            </Badge>
          )}
        </div>
      </CardTitle>

      {/* 데이터 상태 처리 */}
      {error ? <Error /> : <EmployeeVacationList requests={requests} />}
    </Card>
  );
};

export default VacationBox;
