import {
  AttendanceHeader,
  AttendanceStatsCards,
  FullAttendanceRatioChart,
  OutworkingBox,
  WorkplaceBreakdown,
} from "@/components/company/attendance/DaliyAttendanceUI";
import Seo from "@/components/Seo";
import React from "react";

const TodayAttenancePage = () => {
  return (
    <>
      <Seo
        title="금일 출퇴근 | On & Off"
        description="On & Off에서 근태관리 서비스를 이용해보세요."
      />
      <div className="max-w-7xl flex-1 space-y-6 p-6">
        <AttendanceHeader />
        <AttendanceStatsCards />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <FullAttendanceRatioChart />
          <OutworkingBox />
        </div>
        <WorkplaceBreakdown />
      </div>
    </>
  );
};

export default TodayAttenancePage;
