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

export const vacationRegisterAndRequestTourSteps: Step[] = [
  {
    target: '[data-tour="body"]',
    content: "이곳은 휴가를 등록하고 요청을 처리하는 페이지 입니다.",
    disableBeacon: true,
    placement: "center",
  },
  {
    target: '[data-tour="register-modal"]',
    content: "이곳을 클릭하면 직원의 휴가를 수동으로 등록할 수 있습니다.",
    disableBeacon: true,
  },
  {
    target: '[data-tour="pending-1"]',
    content: "직원의 휴가 요청을 처리하는 부분입니다.",
    disableBeacon: true,
  },
  {
    target: '[data-tour="pending-2"]',
    content: "해당 데이터를 클릭하면 승인 혹은 거절 버튼을 눌러 처리할 수 있습니다.",
    disableBeacon: true,
  },
  {
    target: '[data-tour="process-1"]',
    content: "처리 내역 탭으로 이동하면 휴가 요청을 처리한 내역이 나옵니다.",
    disableBeacon: true,
  },
  // {
  //   target: '[data-tour="process-2"]',
  //   content: "이 부분 또한 데이터를 클릭하면 처리된 상세 휴가 정보를 보실 수 있습니다.",
  //   disableBeacon: true,
  // },
  {
    target: '[data-tour="register-1"]',
    content: "등록 내역 탭으로 이동하면 수동으로 휴가를 등록한 내역이 나옵니다.",
    disableBeacon: true,
  },
  // {
  //   target: '[data-tour="register-2"]',
  //   content: "이 부분 또한 데이터를 클릭하면 등록된 휴가의 상세 내용을 확인할 수 있습니다.",
  //   disableBeacon: true,
  // },
];

export const employeeManageTourSteps: Step[] = [
  {
    target: '[data-tour="body"]',
    content: "이 곳은 직원을 관리하는 페이지입니다.",
    disableBeacon: true,
    placement: "center",
  },
  {
    target: '[data-tour="empManage-filter"]',
    content: "직원의 이름과 직무, 그리고 고용 형태까지 검색할 수 있습니다.",
    disableBeacon: true,
  },
  {
    target: '[data-tour="empManage-table"]',
    content:
      "해당 직원의 데이터를 클릭하면 정보들이 나오고 수정 및 근태 페이지로 이동이 가능합니다.",
    disableBeacon: true,
  },
];
