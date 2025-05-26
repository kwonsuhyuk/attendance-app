import { Step } from "react-joyride";

export const employeeHomeTourSteps: Step[] = [
  {
    target: "body",
    content: "직원의 간편한 출퇴근 처리 및 홈 대시보드입니다.",
    placement: "center",
    disableBeacon: true,
  },
  {
    target: '[data-tour="home-1"]',
    content: "최신 공지사항을 확인하실 수 있습니다.",
    disableBeacon: true,
  },
  {
    target: '[data-tour="home-2"]',
    content: "버튼을 클릭하면 출퇴근이 가능합니다.",
    disableBeacon: true,
  },
  {
    target: '[data-tour="home-3"]',
    content: "최근 한 주의 출퇴근 현황을 보실 수 있습니다.",
    disableBeacon: true,
  },
  {
    target: '[data-tour="home-4"]',
    content: "최근 휴가 내역도 보실 수 있습니다.",
    disableBeacon: true,
  },
];

export const attRecordTourSteps: Step[] = [
  {
    target: "body",
    content: "이곳은 출퇴근 기록 페이지입니다.",
    placement: "center",
    disableBeacon: true,
  },
  {
    target: '[data-tour="record-1"]',
    content:
      "자신의 출퇴근 기록을 달력으로 체크하실 수 있고 해당 날짜를 클릭하면 출퇴근 시간과 근무지를 알 수 있습니다.",
    disableBeacon: true,
  },
  {
    target: '[data-tour="record-2"]',
    content: "출퇴근 및 휴가의 월간 내역을 보실 수도 있습니다.",
    disableBeacon: true,
  },
];

export const vacationTourSteps: Step[] = [
  {
    target: "body",
    content: "이곳은 휴가 페이지입니다.",
    placement: "center",
    disableBeacon: true,
  },
  {
    target: '[data-tour="vacation-1"]',
    content: "연도별로 자신이 사용한 총 휴가 일수를 보실 수 있습니다.",
    disableBeacon: true,
  },
  {
    target: '[data-tour="vacation-2"]',
    content: "휴가를 요청하려면 버튼을 클릭해주세요!",
    disableBeacon: true,
  },
  //   {
  //     target: '[data-tour="vacation-modal"]',
  //     content: "여기에 휴가 유형, 날짜, 사유를 적어 등록하시면 요청이 완료됩니다.",
  //     disableBeacon: true,
  //   },
  {
    target: '[data-tour="vacation-3"]',
    content: "휴가를 요청한 상태 별로 보실 수 있으며 휴가 내역은 최신순으로 나열됩니다.",
    disableBeacon: true,
  },
];
export const empMenuTourSteps: Step[] = [
  {
    target: "body",
    content: "이곳은 메뉴 페이지입니다.",
    placement: "center",
    disableBeacon: true,
  },
  {
    target: '[data-tour="guide-1"]',
    content: "자신의 회사 정보를 볼 수 있습니다.",
    disableBeacon: true,
  },
  {
    target: '[data-tour="guide-2"]',
    content: "기타 메뉴들과 로그아웃 기능이 있습니다.",
    disableBeacon: true,
  },
];
