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
    content: "새로운 공지사항을 작성할 수 있어요. 클릭해주세요!",
    disableBeacon: true,
    spotlightClicks: true,
    hideFooter: true,
  },
  {
    target: '[data-tour="notice-modal"]',
    content: "게시물 유형을 설정하고 작성하시면 공지가 업로드됩니다.",
    placement: "top",
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

export const todayAttSteps: Step[] = [
  {
    target: "body",
    content: "이곳은 직원 들의 금일 출퇴근 정보를 한눈에 볼 수 있는 페이지 입니다.",
    disableBeacon: true,
    placement: "center",
  },
  {
    target: '[data-tour="today-1"]',
    content: "날짜를 클릭해서 해당 날짜의 출퇴근 정보를 볼 수 있습니다.",
    disableBeacon: true,
    placement: "top",
  },
  {
    target: '[data-tour="today-2"]',
    content: "직원들이 불가피하게 출퇴근을 등록하지 못할경우 수동으로 등록해줄 수 있는 기능입니다.",
    disableBeacon: true,
  },
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
    placement: "top",
  },
  {
    target: '[data-tour="manager_home-5"]',
    disableScrolling: false,
    content: "회사의 설정된 근무지를 볼 수 있는 박스입니다.",
    disableBeacon: true,
    placement: "top",
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

export const settlementTourStep: Step[] = [
  {
    target: "body",
    content: "이번달 특정 직원 급여를 계산하는 정산 페이지입니다.",
    disableBeacon: true,
    placement: "center",
  },
  {
    target: '[data-tour="settlement-1"]',
    content: "정산하려는 날짜를 선택하고, 직원의 이름을 검색해보세요!",
    disableBeacon: true,
    spotlightClicks: true,
    hideFooter: true,
  },
  {
    target: '[data-tour="settlement-2"]',
    content: "검색된 직원의 정보가 나옵니다.",
    disableBeacon: true,
  },
  {
    target: '[data-tour="settlement-3"]',
    content: "그리고 수당 포함 옵션을 선택하시면 됩니다.",
    disableBeacon: true,
  },
  {
    target: '[data-tour="settlement-4"]',
    content: "회사 정산 정책에 대한 안내도 확인 바랍니다.",
    disableBeacon: true,
  },
  {
    target: '[data-tour="settlement-5"]',
    content: "버튼을 누르면 데이터가 나옵니다. 정산 데이터를 생성해주세요!",
    disableBeacon: true,
    spotlightClicks: true,
    hideFooter: true,
  },
  {
    target: '[data-tour="settlement-6"]',
    content: "이번달 근태 현황과 체크 여부에 따른 수당이 자료 형태로 나옵니다.",
    placement: "top",
    disableBeacon: true,
  },
  {
    target: '[data-tour="settlement-7"]',
    content: "엑셀 파일을 원하시면 다운로드를 눌러주세요!",
    disableBeacon: true,
  },
];
