import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCompanyStore } from "@/store/company.store";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CommuteBox = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();
  const companyCode = useCompanyStore(state => state.currentCompany?.companyCode);
  // 실시간 시간 업데이트
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // 1초마다 업데이트
    return () => clearInterval(interval);
  }, []);

  // 날짜 포맷팅
  const formatDate = (date: Date) => {
    const weekDay = ["일", "월", "화", "수", "목", "금", "토"];
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = weekDay[date.getDay()];
    return `${month}월 ${day}일 ${dayOfWeek}요일`;
  };

  // 시간 포맷팅
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <Card className="flex flex-col items-center justify-center gap-4 p-4 text-center shadow-md">
      <div>
        <p className="text-sm text-muted-foreground">{formatDate(currentTime)}</p>
        <p className="mt-1 text-xl font-bold">{formatTime(currentTime)}</p>
      </div>

      <Button className="mt-3 w-full max-w-xs" onClick={() => navigate(`/${companyCode}/commute`)}>
        출근하기
      </Button>
    </Card>
  );
};

export default CommuteBox;
