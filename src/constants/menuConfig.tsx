import {
  Bell,
  BookOpenCheck,
  Calendar,
  CheckCheck,
  Clock,
  Home,
  Info,
  Megaphone,
  Settings,
} from "lucide-react";

export interface MenuButtonConfig {
  label: string;
  path: string;
  tourStep?: string;
}

export const MENU_STRUCTURE = [
  {
    label: "홈",
    icon: Home,
    path: "/manager/companymain",
    highlight: true,
  },
  {
    label: "공지사항",
    icon: Bell,
    path: "/manager/notice",
    highlight: true,
  },
  {
    label: "출퇴근",
    icon: Clock,
    children: [
      { label: "금일 출퇴근 현황", path: "/manager/todayatt" },
      {
        label: "기간 출퇴근 현황",
        path: "/manager/periodatt",
      },
    ],
  },
  {
    label: "휴가",
    icon: Calendar,
    children: [
      { label: "휴가 통계 내역", path: "/manager/vacationstatistic" },
      { label: "휴가 등록/요청", path: "/manager/vacationdetail" },
    ],
  },
  {
    label: "관리 및 설정",
    icon: Settings,
    children: [
      { label: "회사 기본 정보", path: "/manager/companyinfo" },
      { label: "직원 관리", path: "/manager/employeelist", tourStep: "step-3" },
      { label: "직무 관리", path: "/manager/positionmanage" },
      { label: "근무지 관리", path: "/manager/workplacemanage" },
      { label: "야간/공휴일 관리", path: "/manager/holidaymanage" },
    ],
  },
  // {
  //   label: "소개",
  //   icon: Users,
  //   highlight: true,
  //   path: "/about",
  // },
];

export const EMPLOYEE_SUB_MENUS = (companyCode: string) => [
  {
    icon: <Megaphone className="h-5 w-5 text-primary" />,
    label: "회사 공지사항",
    path: `/${companyCode}/employee/notice`,
  },
  {
    icon: <BookOpenCheck className="h-5 w-5 text-primary" />,
    label: "다운로드 가이드",
    path: `/${companyCode}/employee/appguide`,
  },

  {
    icon: <Info className="h-5 w-5 text-primary" />,
    label: "만든 사람들",
    path: `/${companyCode}/employee/about`,
  },
];
