import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import useCommuteBox from "@/hooks/employee/useCommuteBox";
import CommuteBoxRenderItem from "./CommuteBoxRenderItem";
import Clock from "../Clock";

import {
  DoorOpen,
  Clock as ClockIcon,
  CalendarCheck2,
  Plane,
  MapPin,
  AlertCircle,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { TCommuteStatus } from "@/model/types/commute.type";
import { useMyOutworkRequests } from "@/hooks/employee/useMyOutworkRequests";
import { deleteOutworkRequest } from "@/api/commute.api";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const CommuteBox = () => {
  const { status, commuteData, startWorkplace, endWorkplace, isLoading } = useCommuteBox();
  const { companyCode } = useParams();
  const navigate = useNavigate();
  const { myOutworkRequests } = useMyOutworkRequests();
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("commute_guide_seen");
    if (seen !== "true") {
      setShowGuide(true);
    }
  }, []);
  const handleClick = async () => {
    if (!companyCode) return;

    if (status === "out-working-checking") {
      const latestRequest = myOutworkRequests[0];

      if (!latestRequest?.id) return;

      const result = await deleteOutworkRequest(companyCode, latestRequest.id);
      if (result.success) {
        toast({ title: "외근 요청이 취소되었습니다." });
      } else {
        toast({ title: "요청 취소 실패", description: result.error, variant: "destructive" });
      }
    } else {
      navigate(`/${companyCode}/employee/commute`);
    }
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
          {showGuide && (
            <Alert className="mt-6 border-l-4 border-yellow-400 bg-yellow-50 p-4 dark:border-yellow-600 dark:bg-yellow-900">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-1 h-5 w-5 text-yellow-500 dark:text-yellow-300" />
                  <div className="space-y-1">
                    <AlertTitle className="text-base font-semibold text-yellow-800 dark:text-yellow-100">
                      출근 전 가이드 꼭 확인해주세요!
                    </AlertTitle>
                    <AlertDescription className="text-sm text-yellow-700 dark:text-yellow-200">
                      위치 정보 허용과 출근 방법을 안내해 드려요. 놓치지 말고 확인해 주세요.
                    </AlertDescription>
                  </div>
                </div>

                <Button
                  onClick={() => navigate("/commuteguide")}
                  variant="outline"
                  className="ml-auto w-full justify-center rounded-md border-yellow-500 text-sm font-semibold text-yellow-700 hover:bg-yellow-100 hover:text-yellow-800 dark:border-yellow-400 dark:text-yellow-300 dark:hover:bg-yellow-800 sm:w-auto"
                >
                  가이드 보기
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </Alert>
          )}
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
    case "out-working-checking":
      // out-working-checking
      return {
        label: "외근 승인 대기중",
        icon: <AlertCircle className="animate-ping-slow h-5 w-5 text-yellow-500" />,
        colorClass: "bg-yellow-100 text-yellow-700 ring-1 ring-yellow-300 animate-pulse",
      };
    default:
      return {
        label: "상태 없음",
        icon: <MapPin className="h-5 w-5 text-muted-foreground" />,
        colorClass: "bg-muted text-muted-foreground",
      };
  }
};
