// import { useMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTour } from "@reactour/tour";
import { CALENDAR_STEPS } from "@/constants/tourStep";
// import { useUserStore } from "@/store/user.store";
import MyCalendar from "@/components/common/calendar/MyCalendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import Seo from "@/components/Seo";
import { useShowCalendar } from "@/hooks/employee/useShowCalendar";
import CommuteDetailModal from "@/components/common/modal/ShowCalendarDetailModal";

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
  } = useShowCalendar();

  return (
    <>
      <Seo title="출퇴근 | On & Off" description="On & Off에서 근태관리 서비스를 이용해보세요." />
      <div className="flex w-full flex-col items-center">
        {/* 캘린더 */}
        <Card className="m-4 w-full shadow-md">
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
            <div className="h-3 w-3 rounded-full bg-blue-500" />
            <span className="text-sm">휴가</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <span className="text-sm">외근</span>
          </div>
        </div>

        <div className="max-w2xl mb-4 w-full">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="border-b border-solid border-white-border dark:border-dark-border">
                <TableHead>WORK</TableHead>
                <TableHead>COUNT</TableHead>
                <TableHead>TIME</TableHead>
              </TableRow>
            </TableHeader>
            {summary && (
              <TableBody>
                <TableRow className="border-b border-solid border-white-border-sub dark:border-dark-border-sub">
                  <TableCell>출근</TableCell>
                  <TableCell>{summary.work.count} 일</TableCell>
                  <TableCell>{formatMinutesToHourText(summary.work.time)}</TableCell>
                </TableRow>
                <TableRow className="border-b border-solid border-white-border-sub dark:border-dark-border-sub">
                  <TableCell>외근</TableCell>
                  <TableCell>{summary.out.count} 일</TableCell>
                  <TableCell>{formatMinutesToHourText(summary.out.time)}</TableCell>
                </TableRow>
                <TableRow className="border-b border-solid border-white-border-sub dark:border-dark-border-sub">
                  <TableCell>휴가</TableCell>
                  <TableCell>{summary.vacation.count} 일</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </div>

        <CommuteDetailModal
          open={openModal}
          onOpenChange={setOpenModal}
          selectedDate={selectedDate}
          commuteData={commuteData}
          vacationDates={vacationDates}
        />
      </div>
    </>
  );
};

export default ShowCalendarPage;
