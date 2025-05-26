import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useCompanyStore } from "@/store/company.store";
import useCommuteBox from "@/hooks/employee/useCommuteBox";
import CommuteBoxRenderItem from "./CommuteBoxRenderItem";
import Clock from "../Clock";

import { DoorOpen, Clock as ClockIcon, CalendarCheck2, Plane, MapPin } from "lucide-react";
import { TCommuteStatus } from "@/model/types/commute.type";

const CommuteBox = () => {
  const { status, commuteData, startWorkplace, endWorkplace, isLoading } = useCommuteBox();
  const { companyCode } = useParams();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!companyCode) return;
    navigate(`/${companyCode}/employee/commute`);
  };

  const { label, icon, colorClass } = getStatusDisplay(status);

  return (
    <Card className="flex w-full flex-col justify-center p-6 shadow-md" data-tour="home-2">
      {!isLoading && (
        <>
          <div className="mb-6 flex items-center justify-between">
            <Clock />
            <div
              className={`flex h-10 w-fit items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${colorClass}`}
            >
              {icon}
              <span>{label}</span>
            </div>
          </div>

          <CommuteBoxRenderItem
            status={status}
            commuteData={commuteData}
            startWorkplace={startWorkplace}
            endWorkplace={endWorkplace}
            onButtonClick={handleClick}
          />
        </>
      )}
    </Card>
  );
};

export default CommuteBox;

const getStatusDisplay = (status: TCommuteStatus) => {
  switch (status) {
    case "not-checked-in":
      return {
        label: "출근 전",
        icon: <DoorOpen className="h-5 w-5 text-blue-500" />,
        colorClass: "bg-blue-50 text-blue-600",
      };
    case "checked-in-only":
      return {
        label: "근무 중",
        icon: <ClockIcon className="h-5 w-5 text-green-500" />,
        colorClass: "bg-green-100 text-green-600",
      };
    case "checked-in-and-out":
      return {
        label: "근무 완료",
        icon: <CalendarCheck2 className="h-5 w-5 text-gray-500 dark:text-white" />,
        colorClass: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white",
      };
    case "out-working":
      return {
        label: "외근 중",
        icon: <Plane className="h-5 w-5 text-orange-500" />,
        colorClass: "bg-orange-50 text-orange-600",
      };
    default:
      return {
        label: "상태 없음",
        icon: <MapPin className="h-5 w-5 text-muted-foreground" />,
        colorClass: "bg-muted text-muted-foreground",
      };
  }
};
