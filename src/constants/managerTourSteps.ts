import { Step } from "react-joyride";

export const noticeTourSteps: Step[] = [
  {
    target: '[data-tour="step-1"]',
    content: "여기서 전체 공지사항 수를 확인할 수 있어요.",
    disableBeacon: true,
    placement: "bottom",
  },
  {
    target: '[data-tour="step-2"]',
    content: "새로운 공지사항을 작성할 수 있어요.",
    disableBeacon: true,
  },
];
