// import { useMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTour } from "@/hooks/use-tour";
import { CALENDAR_STEPS } from "@/constants/tourStep";
// import { useUserStore } from "@/store/user.store";
import MyCalendar from "@/components/common/calendar/MyCalendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import Seo from "@/components/Seo";
import { useShowCalendar } from "@/hooks/employee/useShowCalendar";
import CommuteDetailModal from "@/components/common/modal/ShowCalendarDetailModal";
import { attRecordTourSteps } from "@/constants/employeeTourSteps";
import { Briefcase, LogIn, PlaneTakeoff } from "lucide-react";

const ShowCalendarPage = () => {
  const {
    openModal,
    setOpenModal,
    selectedDate,
    commuteData,
    currentDate,
    handleMonthChange,
    handleDateClick,
    vacationDates,
    summary,
    formatMinutesToHourText,
    vacationList,
  } = useShowCalendar();

  useTour("attendace-record", attRecordTourSteps);

  return (
    <>
      <Seo title="출퇴근 | On & Off" description="On & Off에서 근태관리 서비스를 이용해보세요." />
      <div className="flex w-full flex-col items-center">
        {/* 캘린더 */}
        <Card className="m-4 w-full shadow-md" data-tour="record-1">
          <CardContent className="p-8">
            <MyCalendar
              data={commuteData}
              vacationDates={vacationDates}
              onDateClick={handleDateClick}
              onMonthChange={handleMonthChange}
            />
          </CardContent>
        </Card>

        <div className="mb-4 ml-4 flex w-full gap-2">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-green-500" />
            <span className="text-sm">출근</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <span className="text-sm">외근</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-blue-500" />
            <span className="text-sm">휴가</span>
          </div>
        </div>

        {summary && (
          <div className="mt-4 flex w-full flex-col gap-3" data-tour="record-2">
            <div className="flex items-center justify-between rounded-md bg-green-100 px-4 py-5 shadow-md dark:bg-green-950">
              <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
                <LogIn className="h-4 w-4" />
                <span className="text-base font-medium">출근</span>
              </div>
              <div className="flex gap-3">
                <span className="rounded-md bg-white/60 px-3 py-1 text-base font-bold text-green-800 dark:bg-black/30 dark:text-green-200">
                  {formatMinutesToHourText(summary.work.time)}
                </span>
                <span className="rounded-md bg-white/60 px-3 py-1 text-base font-bold text-green-800 dark:bg-black/30 dark:text-green-200">
                  {summary.work.count}일
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-md bg-orange-100 px-4 py-5 shadow-md dark:bg-yellow-950">
              <div className="flex items-center gap-2 text-orange-800 dark:text-orange-200">
                <Briefcase className="h-4 w-4" />
                <span className="text-base font-medium">외근</span>
              </div>
              <span className="rounded-md bg-white/60 px-3 py-1 text-base font-bold text-orange-800 dark:bg-black/30 dark:text-orange-200">
                {summary.out.count}일
              </span>
            </div>

            <div className="flex items-center justify-between rounded-md bg-blue-100 px-4 py-5 shadow-md dark:bg-blue-950">
              <div className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
                <PlaneTakeoff className="h-4 w-4" />
                <span className="text-base font-medium">휴가</span>
              </div>
              <span className="rounded-md bg-white/60 px-3 py-1 text-base font-bold text-blue-800 dark:bg-black/30 dark:text-blue-200">
                {summary.vacation.count}일
              </span>
            </div>
          </div>
        )}

        <CommuteDetailModal
          open={openModal}
          onOpenChange={setOpenModal}
          selectedDate={selectedDate}
          commuteData={commuteData}
          vacationList={Object.values(vacationList)}
        />
      </div>
    </>
  );
};

export default ShowCalendarPage;
