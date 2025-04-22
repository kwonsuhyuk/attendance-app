import React from "react";
import { TCommuteStatus, TCommuteData } from "@/model/types/commute.type";
import { Button } from "@/components/ui/button";
import {
  Sun,
  MapPin,
  Clock,
  Sparkles,
  AlertTriangle,
  Building2,
  TimerIcon,
  MessageSquare,
  StickyNote,
} from "lucide-react";
import { calculateWorkDuration, getKSTDateInfo } from "@/util/time.util";

interface Workplace {
  name: string;
  address: string;
}

interface CommuteBoxRenderItemProps {
  status: TCommuteStatus;
  commuteData: TCommuteData | null;
  startWorkplace?: Workplace;
  endWorkplace?: Workplace;
  onButtonClick?: () => void;
}

const baseContainer = "w-full max-w-md space-y-4 overflow-hidden rounded-2xl p-6 shadow-md";

const CommuteBoxRenderItem = ({
  status,
  commuteData,
  startWorkplace,
  endWorkplace,
  onButtonClick,
}: CommuteBoxRenderItemProps) => {
  console.log(status);
  switch (status) {
    case "not-checked-in":
      return (
        <Button
          className="w-full bg-sky-600 text-white hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600"
          size="lg"
          onClick={onButtonClick}
        >
          출근하기
        </Button>
      );

    case "checked-in-only":
      return (
        <>
          <div className="w-full rounded-xl border border-green-300 bg-green-100 p-4 dark:border-green-800 dark:bg-green-900">
            {/* 근무지 정보 */}
            {startWorkplace ? (
              <div className="rounded-xl border border-green-300 bg-white p-4 shadow-sm dark:border-green-600">
                <div className="mb-2 flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-green-600" />
                  <p className="text-sm font-semibold text-gray-900">근무지 정보</p>
                </div>

                <div className="pl-6">
                  <p className="text-sm font-medium text-gray-800">{startWorkplace.name}</p>
                  <p className="mt-1 text-xs text-gray-600" title={startWorkplace.address}>
                    {startWorkplace.address}
                  </p>
                </div>
              </div>
            ) : (
              <p className="mt-4 text-sm text-red-500 dark:text-red-300">
                근무지 정보를 찾을 수 없습니다.
              </p>
            )}

            {/* 출근 시간 */}
            {commuteData?.startTime && (
              <div className="mt-3 flex items-center justify-between rounded-md bg-green-200 px-4 py-2 text-sm text-green-900 shadow-sm dark:bg-green-800 dark:text-green-100">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-700 dark:text-green-300" />
                  <span className="font-medium">출근 시간</span>
                </div>
                <span className="text-xs font-semibold">
                  {getKSTDateInfo(commuteData.startTime)}
                </span>
              </div>
            )}
          </div>
          {/* 퇴근 버튼 */}
          <Button
            className="mt-5 w-full bg-green-600 text-white hover:bg-green-700 dark:bg-green-800 dark:hover:bg-green-600"
            onClick={onButtonClick}
          >
            퇴근하기
          </Button>
        </>
      );

    case "checked-in-and-out":
      return (
        <div className="w-full rounded-xl border border-yellow-300 bg-white p-4 shadow-md dark:border-yellow-700 dark:bg-zinc-800">
          {/* 헤더 메시지 */}
          <div className="mb-4 flex items-center gap-2 text-yellow-600 dark:text-yellow-300">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-semibold">오늘도 수고 많으셨습니다!</span>
          </div>

          {/* 출근 정보 */}
          {commuteData?.startTime && startWorkplace && (
            <div className="mb-2 flex items-start gap-3 rounded-md border border-green-200 bg-green-50 px-4 py-3 dark:border-green-600 dark:bg-green-900">
              <Clock className="mt-1 h-5 w-5 text-green-600 dark:text-green-300" />
              <div className="flex flex-col text-sm">
                <span className="font-semibold text-green-800 dark:text-green-100">
                  출근: {getKSTDateInfo(commuteData.startTime)}
                </span>
                <span className="mt-1 pl-[2px] text-xs text-gray-700 dark:text-green-300">
                  근무지: {startWorkplace.name}
                </span>
              </div>
            </div>
          )}

          {/* 퇴근 정보 */}
          {commuteData?.endTime && endWorkplace && (
            <div className="mb-2 flex items-start gap-3 rounded-md border border-blue-200 bg-blue-50 px-4 py-3 dark:border-blue-600 dark:bg-blue-900">
              <Clock className="mt-1 h-5 w-5 text-blue-600 dark:text-blue-300" />
              <div className="flex flex-col text-sm">
                <span className="font-semibold text-blue-800 dark:text-blue-100">
                  퇴근: {getKSTDateInfo(commuteData.endTime)}
                </span>
                <span className="mt-1 pl-[2px] text-xs text-gray-700 dark:text-blue-300">
                  근무지: {endWorkplace.name}
                </span>
              </div>
            </div>
          )}

          {/* 총 근무 시간 */}
          {commuteData?.startTime && commuteData?.endTime && (
            <div className="mt-4 flex items-center justify-between border-t pt-3 text-sm text-gray-700 dark:text-gray-200">
              <div className="flex items-center gap-2 font-medium">
                <TimerIcon className="h-4 w-4 text-yellow-500 dark:text-yellow-300" />총 근무 시간
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">
                {calculateWorkDuration(commuteData.startTime, commuteData.endTime)}
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
            onClick={onButtonClick}
          >
            출근하기
          </Button>
        </div>
      );
    case "out-working":
      return (
        <div className="w-full rounded-xl border border-orange-300 bg-orange-50 p-4 shadow-sm dark:border-orange-400 dark:bg-[#3b2a20]">
          <div className="rounded-xl border border-orange-300 bg-white p-4 shadow-sm dark:bg-[#fdf6f0]">
            <div className="mb-2 flex items-center gap-2">
              <StickyNote className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-800">외근 메모</p>
            </div>
            <div className="pl-6">
              {commuteData?.outworkingMemo ? (
                <p className="text-sm text-gray-700 dark:text-gray-800">
                  {commuteData.outworkingMemo}
                </p>
              ) : (
                <p className="text-sm text-gray-400 dark:text-gray-500">메모 없음</p>
              )}
            </div>
          </div>

          {commuteData?.startTime && (
            <div className="mt-3 flex items-center justify-between rounded-md bg-orange-100 px-4 py-2 text-sm text-orange-900 shadow-sm dark:bg-[#e6c1a6] dark:text-[#3b2a20]">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-700 dark:text-[#bb774b]" />
                <span className="font-medium">출근 시간</span>
              </div>
              <span className="text-xs font-semibold">{getKSTDateInfo(commuteData.startTime)}</span>
            </div>
          )}

          <div className="mt-4 rounded-md border border-orange-100 bg-orange-50 px-4 py-2 text-xs text-orange-800 dark:border-[#cba68b] dark:bg-[#e9d3c2] dark:text-[#3b2a20]">
            외근으로 출근이 처리되었습니다. <br />
            금일 별도의 퇴근 처리는 필요하지 않습니다.
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default CommuteBoxRenderItem;
