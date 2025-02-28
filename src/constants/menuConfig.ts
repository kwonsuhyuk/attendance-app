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
    label: "출퇴근",
    icon: Clock,
    children: [
      { label: "출퇴근", path: "/todayatt" },
      {
        label: "기간 출퇴근 현황",
        path: "/datecheck/:id",
        tourStep: "step-2",
        dotColor: "#6366f1",
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
    label: "관리",
    icon: Users,
    children: [
      { label: "직원 관리", path: "/employeelist", tourStep: "step-3", dotColor: "#6366f1" },
      { label: "직무 관리", path: "/positionmanage" },
      { label: "근무지 관리", path: "/workplacemanage" },
    ],
  },
  {
    label: "공지사항",
    icon: Bell,
    path: "/notice",
    highlight: true,
  },
  {
    label: "설정",
    icon: Settings,
    path: "/setting",
    highlight: true,
    tourStep: "step-18",
  },
  {
    label: "소개",
    icon: Users, // 적절한 아이콘으로 변경 필요
    highlight: true,
    path: "/about",
  },
];
