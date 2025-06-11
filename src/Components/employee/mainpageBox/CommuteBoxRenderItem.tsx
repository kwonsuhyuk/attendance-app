import React from "react";
import { TCommuteStatus, TCommuteData } from "@/model/types/commute.type";
import { Button } from "@/components/ui/button";
import {
  Clock,
  AlertTriangle,
  Building2,
  TimerIcon,
  LogIn,
  LogOut,
  AlertCircle,
  Handshake,
} from "lucide-react";
import { calculateWorkDuration, getKSTDateInfo } from "@/util/time.util";
import clsx from "clsx";

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

const CommuteBoxRenderItem = ({
  status,
  commuteData,
  startWorkplace,
  endWorkplace,
  onButtonClick,
}: CommuteBoxRenderItemProps) => {
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
          <WrapperBox
            borderColor="border-green-500"
            bgColor="bg-white"
            darkBorderColor="border-green-600"
            darkBgColor="bg-green-900"
          >
            {startWorkplace ? (
              <div className="rounded-xl border border-solid border-green-300 bg-white p-4 shadow-sm dark:border-green-600">
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
          </WrapperBox>
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
        <WrapperBox
          borderColor="border-gray-100"
          bgColor="bg-white"
          darkBorderColor="border-gray-700"
          darkBgColor="bg-zinc-800"
        >
          <div className="mb-4 flex items-center gap-2 text-gray-500 dark:text-white">
            <Handshake className="h-5 w-5" />
            <span className="text-sm font-semibold">오늘도 수고 많으셨습니다!</span>
          </div>

          {commuteData?.startTime && startWorkplace && (
            <div className="mb-2 flex items-start gap-3 rounded-md border border-green-200 bg-green-50 px-4 py-3 dark:border-green-600 dark:bg-green-900">
              <LogIn className="mt-1 h-5 w-5 text-green-600 dark:text-green-300" />
              <div className="flex flex-col text-sm">
                <span className="font-semibold text-green-800 dark:text-green-100">
                  출근: {getKSTDateInfo(commuteData.startTime)}
                </span>
                <span className="mt-1 text-xs text-gray-700 dark:text-green-300">
                  근무지: {startWorkplace.name}
                </span>
              </div>
            </div>
          )}

          {commuteData?.endTime && endWorkplace && (
            <div className="mb-2 flex items-start gap-3 rounded-md border border-blue-200 bg-blue-50 px-4 py-3 dark:border-blue-600 dark:bg-blue-900">
              <LogOut className="mt-1 h-5 w-5 text-blue-600 dark:text-blue-300" />
              <div className="flex flex-col text-sm">
                <span className="font-semibold text-blue-800 dark:text-blue-100">
                  퇴근: {getKSTDateInfo(commuteData.endTime)}
                </span>
                <span className="mt-1 text-xs text-gray-700 dark:text-blue-300">
                  근무지: {endWorkplace.name}
                </span>
              </div>
            </div>
          )}

          {commuteData?.startTime && commuteData?.endTime && (
            <div className="mt-4 flex items-center justify-between border-t pt-3 text-sm text-gray-700 dark:text-gray-200">
              <div className="flex items-center gap-2 font-medium">
                <TimerIcon className="h-4 w-4 text-gray-500 dark:text-white" />총 근무 시간
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">
                {calculateWorkDuration(commuteData.startTime, commuteData.endTime)}
              </span>
            </div>
          )}
        </WrapperBox>
      );

    case "missing-check-in":
      return (
        <WrapperBox
          borderColor="border-red-500"
          bgColor="bg-white"
          darkBorderColor="border-red-900"
          darkBgColor="bg-red-950"
        >
          <div className="flex items-center gap-3 text-base font-semibold text-red-600 dark:text-red-300">
            <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400" />
            출근 정보 누락
          </div>
          <div className="text-sm text-red-700 dark:text-red-300">
            관리자에게 문의하거나 출근을 다시 시작해 주세요.
          </div>
          <Button
            className="mt-4 w-full bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
            size="lg"
            onClick={onButtonClick}
          >
            출근하기
          </Button>
        </WrapperBox>
      );

    case "out-working":
      return (
        <WrapperBox
          borderColor="border-orange-300"
          bgColor="bg-white"
          darkBorderColor="border-orange-800"
          darkBgColor="bg-zinc-800"
        >
          {/* 외근 메모 */}
          <div className="rounded-xl border border-solid border-orange-300 bg-white p-4 shadow-sm dark:border-zinc-600 dark:bg-zinc-800">
            <p className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">외근 메모</p>
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {commuteData?.outworkingMemo || (
                  <span className="text-gray-400 dark:text-gray-500">메모 없음</span>
                )}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="my-4 h-px w-full bg-gray-200 dark:bg-zinc-600" />

          {commuteData?.startTime && (
            <div className="mt-3 flex items-center justify-between rounded-md bg-orange-100 px-4 py-2 text-sm text-orange-900 shadow-sm dark:bg-zinc-700 dark:text-orange-300">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-700 dark:text-orange-400" />
                <span className="font-medium">출근 시간</span>
              </div>
              <span className="text-xs font-semibold">{getKSTDateInfo(commuteData.startTime)}</span>
            </div>
          )}

          {/* 안내 메시지 */}
          <div className="mt-4 rounded-md border border-orange-100 bg-orange-50 px-4 py-2 text-xs text-orange-800 dark:border-zinc-600 dark:bg-zinc-700 dark:text-gray-200">
            외근으로 출근이 처리되었습니다. <br />
            금일 별도의 퇴근 처리는 필요하지 않습니다.
          </div>
        </WrapperBox>
      );

    case "out-working-checking":
      return (
        <WrapperBox
          borderColor="border-yellow-500"
          bgColor="bg-white"
          darkBorderColor="border-yellow-400"
          darkBgColor="bg-zinc-800"
        >
          <div className="mb-3 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-500 dark:text-yellow-300" />
            <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-200">
              외근 요청 승인 대기중
            </span>
          </div>

          <div className="rounded-md border border-gray-200 bg-gray-50 p-3 dark:border-zinc-600 dark:bg-zinc-900">
            <p className="mb-1 text-xs font-semibold text-gray-700 dark:text-gray-200">외근 메모</p>
            <p className="text-sm text-gray-800 dark:text-gray-300">
              {commuteData?.outworkingMemo || "메모 없음"}
            </p>
          </div>

          {commuteData?.requestTime && (
            <div className="mt-3 flex items-center justify-between rounded-md bg-yellow-50 px-3 py-2 text-sm text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                요청 시간
              </div>
              <span className="text-xs font-semibold">
                {getKSTDateInfo(commuteData.requestTime)}
              </span>
            </div>
          )}

          <div className="mt-4 px-4 py-2 text-xs text-yellow-800 dark:text-yellow-300">
            관리자의 승인을 기다리고 있습니다. <br />
            승인 전까지 출근 처리가 완료되지 않습니다.
          </div>

          <div className="flex justify-end">
            <button
              onClick={onButtonClick}
              className="rounded-md border border-yellow-500 bg-white px-4 py-1 text-sm font-semibold text-yellow-600 transition hover:bg-yellow-50 dark:border-yellow-400 dark:bg-transparent dark:text-yellow-300 dark:hover:bg-yellow-900"
            >
              요청 취소
            </button>
          </div>
        </WrapperBox>
      );

    default:
      return null;
  }
};

export default CommuteBoxRenderItem;

interface WrapperBoxProps {
  children: React.ReactNode;
  borderColor: string;
  bgColor: string;
  darkBorderColor: string;
  darkBgColor: string;
  className?: string;
}

const WrapperBox = ({
  children,
  borderColor,
  bgColor,
  darkBorderColor,
  darkBgColor,
  className,
}: WrapperBoxProps) => {
  return (
    <div
      className={clsx(
        "relative w-full rounded-xl border-l-4 border-solid p-4 shadow-md",
        borderColor,
        bgColor,
        `dark:${darkBorderColor}`,
        `dark:${darkBgColor}`,
        className,
      )}
    >
      {children}
    </div>
  );
};
