import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCompanyStore } from "@/store/company.store";
import { useUserStore } from "@/store/user.store";
import { useCommuteStatus } from "@/hooks/employee/useCommuteStatus";
import { formatDate, formatRawUTCToHHMM, formatTime, getKSTDateInfo } from "@/util/time.util";
import { useShallow } from "zustand/shallow";
import { AlertTriangle, Clock, MapPin, Smile, Sparkles, Sun } from "lucide-react";

const CommuteBox = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  const companyCode = useCompanyStore(state => state.currentCompany?.companyCode);
  const userId = useUserStore(state => state.currentUser?.uid);

  const { status, commuteData, isLoading } = useCommuteStatus(companyCode, userId);

  const workPlacesList = useCompanyStore(state => state.currentCompany?.workPlacesList ?? []);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    if (!companyCode) return;
    navigate(`/${companyCode}/commute`);
  };

  const getWorkplaceInfo = (type: "startPlace" | "endPlace") => {
    const id = type === "startPlace" ? commuteData?.startWorkplaceId : commuteData?.endWorkplaceId;

    return workPlacesList.find(place => place.id === id);
  };

  const startWorkplace = getWorkplaceInfo("startPlace");
  const endWorkplace = getWorkplaceInfo("endPlace");

  const renderContent = () => {
    const baseContainer = "w-full max-w-md space-y-4 overflow-hidden rounded-2xl p-6 shadow-md";

    switch (status) {
      case "not-checked-in":
        return (
          <div
            className={`${baseContainer} border border-sky-200 bg-sky-50 dark:border-sky-900 dark:bg-slate-900`}
          >
            <div className="flex items-center gap-3 text-base font-semibold text-sky-700 dark:text-sky-300">
              <Sun className="h-5 w-5 text-sky-500 dark:text-sky-400" />
              아직 출근하지 않으셨네요
            </div>
            <div className="text-sm text-gray-700 dark:text-slate-300">
              오늘 일정, 지금부터 시작해볼까요?
            </div>
            <Button
              className="w-full bg-sky-600 text-white hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600"
              size="lg"
              onClick={handleClick}
            >
              출근하기
            </Button>
          </div>
        );

      case "checked-in-only":
        return (
          <div
            className={`${baseContainer} border border-green-300 bg-green-100 dark:border-green-800 dark:bg-green-900`}
          >
            <div className="flex items-center gap-3 text-base font-semibold text-green-800 dark:text-green-200">
              <MapPin className="h-5 w-5 text-green-700 dark:text-green-300" />
              출근 중
            </div>

            {startWorkplace ? (
              <div className="mt-3 rounded-lg bg-white p-4 shadow-inner dark:bg-green-800">
                <div className="mb-1 text-xs text-gray-500 dark:text-green-300">근무지 정보</div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {startWorkplace.name}
                </div>
                <div
                  className="mt-1 truncate text-xs text-gray-700 dark:text-green-200"
                  title={startWorkplace.address}
                >
                  {startWorkplace.address}
                </div>
              </div>
            ) : (
              <p className="text-sm text-red-500 dark:text-red-300">
                근무지 정보를 찾을 수 없습니다.
              </p>
            )}

            {commuteData?.startTime && (
              <div className="mt-3 flex items-center justify-between gap-3 rounded-md bg-green-200 px-4 py-3 text-sm text-green-900 shadow-sm dark:bg-green-800 dark:text-green-100">
                <div className="flex shrink-0 items-center gap-2">
                  <Clock className="h-4 w-4 text-green-700 dark:text-green-300" />
                  <span className="font-medium">출근</span>
                </div>
                <span className="shrink-0 text-xs font-semibold">
                  {getKSTDateInfo(commuteData.startTime)}
                </span>
              </div>
            )}

            <Button
              className="mt-4 w-full bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
              onClick={handleClick}
            >
              퇴근하기
            </Button>
          </div>
        );

      case "checked-in-and-out":
        return (
          <div
            className={`${baseContainer} border border-amber-200 bg-amber-100 dark:border-amber-600 dark:bg-amber-800`}
          >
            <div className="mb-7 flex items-center justify-center gap-3 text-lg font-bold text-amber-700 dark:text-amber-300">
              <Sparkles className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              오늘도 수고 많으셨습니다!
            </div>

            {commuteData?.startTime && startWorkplace && (
              <div className="flex items-center justify-between gap-3 rounded-md bg-green-200 px-4 py-3 text-sm text-green-800 shadow-sm dark:bg-green-700 dark:text-green-100">
                <div className="flex shrink-0 items-center gap-2">
                  <Clock className="h-4 w-4 text-green-600 dark:text-green-300" />
                  <span className="font-medium">출근</span>
                </div>

                <span className="flex-1 truncate text-center text-xs text-gray-700 dark:text-green-200">
                  {startWorkplace.name}
                </span>

                <span className="shrink-0 text-xs font-semibold">
                  {getKSTDateInfo(commuteData.startTime)}
                </span>
              </div>
            )}

            {commuteData?.endTime && endWorkplace && (
              <div className="flex items-center justify-between gap-3 rounded-md bg-blue-100 px-4 py-3 text-sm text-blue-800 shadow-sm dark:bg-blue-700 dark:text-blue-100">
                <div className="flex shrink-0 items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                  <span className="font-medium">퇴근</span>
                </div>

                <span className="flex-1 truncate text-center text-xs text-gray-700 dark:text-blue-200">
                  {endWorkplace.name}
                </span>

                <span className="shrink-0 text-xs font-semibold">
                  {getKSTDateInfo(commuteData.endTime)}
                </span>
              </div>
            )}
          </div>
        );

      case "missing-check-in":
        return (
          <div
            className={`${baseContainer} border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950`}
          >
            <div className="flex items-center gap-3 text-base font-semibold text-red-600 dark:text-red-300">
              <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400" />
              출근 정보 누락
            </div>
            <div className="text-sm text-red-700 dark:text-red-300">
              관리자에게 문의하거나 출근을 다시 시작해 주세요.
            </div>
            <Button
              className="w-full bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
              size="lg"
              onClick={handleClick}
            >
              출근하기
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="flex w-full flex-col items-center justify-center gap-4 p-6 text-center shadow-lg">
      <div>
        <p className="text-sm text-muted-foreground">{formatDate(currentTime)}</p>
        <p className="mt-1 text-2xl font-bold">{formatTime(currentTime)}</p>
      </div>
      {!isLoading && renderContent()}
    </Card>
  );
};

export default CommuteBox;

/// 리팩, 외근 고려한 로직 하기
