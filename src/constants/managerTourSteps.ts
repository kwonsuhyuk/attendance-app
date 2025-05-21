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

export const todayAttSteps: Step[] = [
  {
    target: "body",
    content: "이곳은 직원 들의 금일 출퇴근 정보를 한눈에 볼 수 있는 페이지 입니다.",
    disableBeacon: true,
    placement: "center",
  },
  // {
  //   target: '[data-tour="today-1"]',
  //   content: "날짜를 클릭해서 해당 날짜의 출퇴근 정보를 볼 수 있습니다.",
  //   disableBeacon: true,
  // },
  // {
  //   target: '[data-tour="today-2"]',
  //   content: "직원들이 불가피하게 출퇴근을 등록하지 못할경우 수동으로 등록해줄 수 있는 기능입니다.",
  //   disableBeacon: true,
  // },
  {
    target: '[data-tour="today-3"]',
    content: "금일 근태 정보를 간단하게 볼 수 있습니다.",
    disableBeacon: true,
  },
  {
    target: '[data-tour="today-4"]',
    content: "해당 박스를 클릭하면 금일 휴가 인원 상세 정보를 볼 수 있습니다.",
    disableBeacon: true,
  },
  {
    target: '[data-tour="today-5"]',
    content: "금일 직원들의 근무지 출근 분포를 볼 수 있습니다.",
    disableBeacon: true,
  },
  {
    target: '[data-tour="today-6"]',
    content: "금일 외근 처리한 직원들의 상세 정보를 볼 수 있습니다.",
    disableBeacon: true,
  },
  {
    target: '[data-tour="today-7"]',
    content: "금일 근무지별 출근한 직원들의 상세 정보를 볼 수 있습니다.",
    disableBeacon: true,
  },
];

export const homeSteps: Step[] = [
  {
    target: "body",
    content: "회사의 전체적인 관리를 요약해서 볼 수 있는 홈 대시보드입니다.",
    disableBeacon: true,
    placement: "center",
  },
  {
    target: '[data-tour="manager_home-1"]',
    content: "직원이 가입시에 필요한 회사코드입니다. 공유하여서 직원들을 회사 계정에 초대해주세요.",
    disableBeacon: true,
  },
  {
    target: '[data-tour="manager_home-2"]',
    disableScrolling: false,
    content:
      "금일 출퇴근 정보를 한눈에 볼 수 있는 박스입니다. 클릭하셔서 상세페이지로 이동할 수 있습니다.",
    disableBeacon: true,
    placement: "left",
  },
  {
    target: '[data-tour="manager_home-3"]',
    disableScrolling: false,
    content: "직원의 휴가 요청 및 이번달 직원들의 전체 휴가 내역을 한눈에 볼 수 있는 박스입니다.",
    disableBeacon: true,
    placement: "bottom",
  },
  {
    target: '[data-tour="manager_home-4"]',
    disableScrolling: false,
    content: "회사의 설정된 직무를 볼 수 있는 박스입니다.",
    disableBeacon: true,
    placement: "bottom",
  },
  {
    target: '[data-tour="manager_home-5"]',
    disableScrolling: false,
    content: "회사의 설정된 근무지를 볼 수 있는 박스입니다.",
    disableBeacon: true,
    placement: "bottom",
  },
];

export const vacationStatisticSteps: Step[] = [
  {
    target: "body",
    content: "직원들의 휴가 사용 관련 통계를 볼 수 있는 페이지 입니다.",
    disableBeacon: true,
    placement: "center",
  },
  {
    target: '[data-tour="vstatic-1"]',
    content: "검색하고 싶으신 년도, 월 및 직원을 필터링 할 수 있습니다.",
    disableBeacon: true,
  },
  {
    target: '[data-tour="vstatic-2"]',
    content: "필터링 된 년도, 월 및 직원의 휴가 내역 차트를 보실 수 있습니다.",
    disableBeacon: true,
  },
  {
    target: '[data-tour="vstatic-3"]',
    content: "차트 클릭시 해당 년도, 월에 사용한 상세 휴가 내역을 보실 수 있습니다.",
    disableBeacon: true,
  },
  {
    target: '[data-tour="vstatic-4"]',
    content: "유형별 휴가 내역을 한 눈에 보실 수 있습니다.",
    disableBeacon: true,
  },
  {
    target: '[data-tour="vstatic-5"]',
    content: "직원 별 테이블로 휴가 내역을 보실 수 있습니다.",
    disableBeacon: true,
  },
];

export const companyBasicSetStep: Step[] = [
  {
    target: "body",
    content: "회사의 기본 설정을 관리할 수 있는 페이지 입니다.",
    disableBeacon: true,
    placement: "center",
  },
  {
    target: '[data-tour="basic_set-1"]',
    content: "회사 기본 설정을 변경하신 후 꼭 저장 버튼을 눌러주세요.",
    disableBeacon: true,
  },
];

export const companyJobSetStep: Step[] = [
  {
    target: "body",
    content: "회사의 직무 설정을 관리할 수 있는 페이지 입니다.",
    disableBeacon: true,
    placement: "center",
  },
  {
    target: '[data-tour="joblist_set-1"]',
    content: "추가하실 직무를 입력후 추가 버튼을 눌러주세요.",
    disableBeacon: true,
  },
  {
    target: '[data-tour="joblist_set-2"]',
    content: "추가하신 직무들은 아래 리스트에 나오게 됩니다.",
    disableBeacon: true,
  },
  {
    target: '[data-tour="joblist_set-3"]',
    content: "설정을 완료하셨으면 꼭 저장 버튼을 눌러주세요.",
    disableBeacon: true,
  },
];

export const companyWorkPlaceSetStep: Step[] = [
  {
    target: "body",
    content: "회사의 근무지 설정을 관리할 수 있는 페이지 입니다.",
    disableBeacon: true,
    placement: "center",
  },
  {
    target: '[data-tour="workplace_set-1"]',
    content: "버튼을 눌러 근무지에 관한 상세 정보를 입력해주세요.",
    disableBeacon: true,
  },
  {
    target: '[data-tour="workplace_set-2"]',
    content: "추가하신 근무지를 클릭하여 수정 및 삭제 하실 수 있습니다.",
    disableBeacon: true,
  },
  {
    target: '[data-tour="workplace_set-3"]',
    content: "설정을 완료하셨으면 꼭 저장 버튼을 눌러주세요.",
    disableBeacon: true,
  },
];

export const companyHolidaySetStep: Step[] = [
  {
    target: "body",
    content: "회사의 급여정산일 및 공휴일 및 야간 관련 설정을 관리할 수 있는 페이지 입니다.",
    disableBeacon: true,
    placement: "center",
  },
  {
    target: '[data-tour="holiday_set-1"]',
    content: "급여를 정산하실 날짜를 선택하실 수 있습니다.",
    disableBeacon: true,
  },
  {
    target: '[data-tour="holiday_set-2"]',
    content: "야간 추가 수당 관련 시간 및 배율을 선택하실 수 있습니다.",
    disableBeacon: true,
  },
  {
    target: '[data-tour="holiday_set-3"]',
    content: "공휴일 추가 수당 관련 시간 및 배율을 선택하실 수 있습니다.",
    disableBeacon: true,
  },
  {
    target: '[data-tour="holiday_set-4"]',
    content: "공휴일을 적용할 날짜를 추가하실 수 있습니다.",
    disableBeacon: true,
  },
  {
    target: '[data-tour="holiday_set-5"]',
    content: "설정을 완료하셨으면 꼭 저장 버튼을 눌러주세요.",
    disableBeacon: true,
  },
];
