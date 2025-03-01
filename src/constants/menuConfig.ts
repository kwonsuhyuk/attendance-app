import { Bell, Calendar, Clock, Home, Settings, Users } from "lucide-react";

export interface MenuButtonConfig {
  label: string;
  path: string;
  tourStep?: string;
}

export const MENU_STRUCTURE = [
  {
    label: "홈",
    icon: Home,
    path: "/companymain",
    highlight: true,
  },
  {
    label: "공지사항",
    icon: Bell,
    path: "/notice",
    highlight: true,
  },
  {
    label: "출퇴근",
    icon: Clock,
    children: [
      { label: "금일 출퇴근 현황", path: "/todayatt" },
      {
        label: "기간 출퇴근 현황",
        path: "/datecheck/:id",
        tourStep: "step-2",
      },
    ],
  },
  {
    label: "휴가",
    icon: Calendar,
    children: [
      { label: "휴가 통계", path: "/vacationstatistic" },
      { label: "휴가 내역", path: "/vacationdetail" },
    ],
  },
  {
    label: "관리 및 설정",
    icon: Settings,
    children: [
      { label: "회사 기본 정보", path: "/companyinfo" },
      { label: "직원 관리", path: "/employeelist", tourStep: "step-3" },
      { label: "직무 관리", path: "/positionmanage" },
      { label: "근무지 관리", path: "/workplacemanage" },
      { label: "야간/공휴일 관리", path: "/holidaymanage" },
    ],
  },
  // {
  //   label: "소개",
  //   icon: Users,
  //   highlight: true,
  //   path: "/about",
  // },
];
