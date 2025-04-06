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

const ShowCalendarPage = () => {
  // const companyCode = useUserStore(state => state.currentUser?.companyCode);
  // const matchCalendar = useMatch(`/${companyCode}/calendar`);
  // const matchHome = useMatch(`/${companyCode}`);
  const { isOpen, setCurrentStep, setSteps, setIsOpen } = useTour();

  const [openModal, setOpenModal] = useState(false);
  // const [selectedDate, setSelectedDate] = useState("2025-04-04");

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setCurrentStep?.(0);
        setSteps?.(CALENDAR_STEPS(setIsOpen));
      }, 300);

      return () => {
        clearTimeout(timer);
        setSteps?.([]);
      };
    }
  }, [isOpen, setCurrentStep, setSteps, setIsOpen]);

  return (
    <div className="flex w-full flex-col items-center">
      {/* 캘린더 */}
      <Card className="m-4 w-full shadow-md">
        <CardContent className="p-8">
          <MyCalendar />
        </CardContent>
      </Card>

      <div className="mb-4 flex w-full gap-2">
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-green-400" />
          <span className="text-sm">출근</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-yellow-300" />
          <span className="text-sm">휴가</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-blue-400" />
          <span className="text-sm">외근</span>
        </div>
      </div>

      <div className="max-w2xl mb-4 w-full">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-b border-solid border-white-border dark:border-dark-border">
              <TableHead>WORK</TableHead>
              <TableHead>TIME</TableHead>
              <TableHead>COUNT</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-b border-solid border-white-border-sub dark:border-dark-border-sub">
              <TableCell>주간</TableCell>
              <TableCell>00시간 00분</TableCell>
              <TableCell>0</TableCell>
            </TableRow>
            <TableRow className="border-b border-solid border-white-border-sub dark:border-dark-border-sub">
              <TableCell>야간</TableCell>
              <TableCell>00시간 00분</TableCell>
              <TableCell>0</TableCell>
            </TableRow>
            <TableRow className="border-b border-solid border-white-border-sub dark:border-dark-border-sub">
              <TableCell>공휴일 및 주말</TableCell>
              <TableCell>00시간 00분</TableCell>
              <TableCell>0</TableCell>
            </TableRow>
            <TableRow className="font-semibold">
              <TableCell>이번 달 총합</TableCell>
              <TableCell>00시간 00분</TableCell>
              <TableCell>0</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* 상세 기록 모달 (컴포넌트 분리 예정) */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>상세기록</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2 text-sm">
            <p className="text-lg font-bold">2025-04-04</p>
            <p>출근: 09:01</p>
            <p>퇴근: 18:03</p>
            <p>근무지: 서울 강남구</p>
            <p>좌표: 37.496, 127.027</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShowCalendarPage;
