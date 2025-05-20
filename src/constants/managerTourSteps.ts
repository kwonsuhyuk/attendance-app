import { Step } from "react-joyride";

export const noticeTourSteps: Step[] = [
  {
    target: "body",
    content: "이곳은 공지사항을 관리하는 페이지입니다.",
    placement: "center",
    disableBeacon: true,
  },
  {
    target: '[data-tour="notice-1"]',
    content: "새로운 공지사항을 작성할 수 있어요.",
    disableBeacon: true,
  },
  {
    target: '[data-tour="notice-2"]',
    content: "자세한 공지사항 내용을 보려면 이 버튼을 클릭해 주세요.",
    disableBeacon: true,
  },
];

export const periodAttTourSteps: Step[] = [
  {
    target: "body",
    content: "이곳은 기간 출퇴근 페이지입니다. 전체적인 근태 현황을 체크하는 곳입니다.",
    disableBeacon: true,
    placement: "center",
  },
  {
    target: '[data-tour="period-1"]',
    content: "회사의 전체적인 출퇴근과 특정 직원의 근태를 확인 할 수 있습니다.",
    disableBeacon: true,
  },
  {
    target: '[data-tour="period-2"]',
    content: "기본적으로 월 단위로 현황을 체크할 수 있습니다.",
    disableBeacon: true,
  },
  {
    target: '[data-tour="period-3"]',
    content: "근무지 별 근태 현황을 볼 수도 있습니다.",
    disableBeacon: true,
  },
  {
    target: '[data-tour="period-4"]',
    content: "해당 날짜를 클릭하면 특정 날짜의 금일 출퇴근 페이지로 이동합니다.",
    disableBeacon: true,
  },
];
