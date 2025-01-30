export const ADMIN_STEP = [
  {
    selector: '[data-tour="step-1"]',
    content: `안녕하세요! Attandance App 에
오신 것을 환영합니다.
사용하시기 전에 간단하게 서비스 이용 가이드를 
안내해드리도록 하겠습니다.`,
  },
  {
    selector: '[data-tour="step-2"]',
    content: '회사의 서비스 들을 이용 할 수 있는 메뉴바 입니다.',
  },
  {
    selector: '[data-tour="step-3"]',
    content: '우선 PEOPLE을 클릭하셔서 현재 회사의 직원들을 볼 수 있는 직원테이블 페이지로 이동해주세요',
  },
];

export const EMPLOYEE_STEP = [
  {
    selector: '[data-tour="step-32"]',
    content: `Att-App 을 휴대폰 바탕화면에 등록하셨나요? 그렇다면 빠르게 가이드 진행해드리겠습니다!`,
  },
  {
    selector: '[data-tour="step-33"]',
    content: `우선은 이곳은 HOME 화면으로 이부분은 근무를 하실시 최근 근무를 요약해 주는 공간입니다.`,
  },
  {
    selector: '[data-tour="step-34"]',
    content: `첫번째로 QR을 스캔하여 회사에 출퇴근 하는 방법을 알아 보겠습니다. 아래버튼을 클릭해주세요!`,
  },
];

export const EMPLOYEE_LIST_STEPS = [
  {
    selector: '[data-tour="step-4"]',
    content: `회사에 소속되어 있는 직원들을 한눈에 볼 수 있는 직원테이블 입니다. `,
  },
  {
    selector: '[data-tour="step-5"]',
    content: `직원들은 회사에 처음 가입시에 한번 자신의 
직종, 급여 지급 방식, 급여를 본인이 직접 기입하게 되어 있습니다.
(관리자가 직원 정보 미기입시 오류 방지위해)`,
  },
  {
    selector: '[data-tour="step-6"]',
    content: `관리자분은 수정버튼을 통해서 직원의 정보가 잘못 된 것이 있거나 수정할 사항이 있을 시에 수정을 하실 수 있습니다.`,
  },
  {
    selector: '[data-tour="step-7"]',
    content: `위의 분류 태그 및 검색창을 통해서 직원들을 분류 , 검색 하실 수 있습니다.`,
  },
  {
    selector: '[data-tour="step-8"]',
    content: `이제 직원의 근무 상세 내역과 정산 기능 페이지로 이동해보겠습니다. 
아래 버튼을 클릭해 CALENDAR 페이지로 이동해 보겠습니다.`,
  },
];

export const MY_DATE_PICKER_STPES = [
  {
    selector: '[data-tour="step-25"]',
    content: `공휴일을 구분해 급여 배율을 다르게 할지 설정하는 페이지 입니다. 마찬가지로 체크항목을 체크시에 공휴일 급여 배율을 설정할 수 있습니다.`,
  },
  {
    selector: '[data-tour="step-26"]',
    content: `위의 달력의 회사 자체 공휴일로 설정할 날짜를 더블클릭하여 추가 할 수 있습니다.`,
  },
  {
    selector: '[data-tour="step-27"]',
    content: `회사 공휴일로 설정한 날짜는 여기 리스트로 보실 수 있습니다.`,
  },
  {
    selector: '[data-tour="step-28"]',
    content: `마찬가지로 변경사항을 저장시에는 반드시 아래 저장버튼을 클릭하셔야 반영됩니다.`,
  },
  {
    selector: '[data-tour="step-29"]',
    content: `가이드가 다시 보고 싶으시다면 각 페이지에 GUIDE 버튼을 클릭하시면 언제든지 다시 보실 수 있습니다! 
감사합니다.`,
  },
];

export const CALENDAR_STEPS = setIsOpen => [
  {
    selector: '[data-tour="step-39"]',
    content: `여기는 나의 회사 출퇴근 기록을 좀 더 상세하게 볼 수 있는 페이지입니다. 하나씩 살펴볼까요?`,
  },
  {
    selector: '[data-tour="step-40"]',
    content: `달력먼저 살펴보겠습니다. 각 셀의 색깔은 아래 라벨의 시간처럼 몇시간 근무했는지 전체적으로 볼 수 있게 해줍니다.`,
  },
  {
    selector: '[data-tour="step-41"]',
    content: `또한 달력의 날짜를 클릭시에는 그 날짜의 상세 정보를 보실 수 있습니다.`,
  },
  {
    selector: '[data-tour="step-42"]',
    content: `마지막으로 정산일 이후로 부터 이번달 근무 시간 등을 요약해서 볼 수 있는 테이블 입니다. 회사 정산 날짜가 지나면 초기화 됩니다.`,
  },
  {
    selector: '[data-tour="step-43"]',
    content: `혹시 페이지가 로딩이 잘되지 않던가 작동이 잘 되지 않으면 위의 새로고침 버튼을 눌러주세요.`,
  },
  {
    selector: '[data-tour="step-39"]',
    content: `앞으로 사용하시면서 모르는 것이 있다면 오른쪽 아래 가이드를 이용해주시거나 ABOUT 페이지에서 문의 해주세요! 감사합니다!`,
    action: () => {
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    },
  },
];

export const QR_SCAN_STEPS = setCurrentStep => [
  {
    selector: '[data-tour="step-35"]',
    content: `여기는 회사의 출퇴근이 이루어지는 QR SCAN 페이지 입니다.`,
  },
  {
    selector: '[data-tour="step-36"]',
    content: `QR스캔 방법을 자세히 알아보도록 할게요. 'Request Camera permissions' 버튼을 클릭해 주세요 그후, start Scanning 버튼을 클릭해주세요!`,
    action: () => {
      setTimeout(() => {
        setCurrentStep(s => s + 1);
      }, 5000);
    },
  },
  {
    selector: '[data-tour="step-37"]',
    content: `이곳에 관리자가 부여한 QR 이미지를 스캔하시면 됩니다! 관리자가 제공한 QR 이외의 다른 QR을 스캔할 경우 오류가 발생하여 전산처리가 안됩니다. 유의해 주세요!`,
  },
];

export const DATE_CHECK_STEPS1 = [
  {
    selector: '[data-tour="step-9"]',
    content: `이곳은 직원의 근태관리를 자세하게 할 수 있는 페이지 입니다. 근태관리를 할 직원 의 옆에 있는 상세보기 & 정산 버튼 을 선택을 안하고 들어왔다면 데이터가 없습니다. 기능을 이용하실려면 
반드시 직원 리스트에서 근태 확인 할 직원 옆에 있는 상세보기 & 정산을 클릭하고 들어오셔야 합니다!`,
  },
  {
    selector: '[data-tour="step-10"]',
    content: `우선 달력 부분 입니다. 이 달력에는 해당 직원의 근무 시간을 간략하게 보여주며, 외근 여부도 보여주는 셀 입니다. 아무 날짜 하나만 클릭해보세요.`,
  },
];

export const DATE_CHECK_STEPS2 = [
  {
    selector: '[data-tour="step-11"]',
    content: `이곳은 직원의 간단한 정보와 함께, 해당 날짜의 직원이 출근, 퇴근 한 시간 , 근무 시간과 근무 시간대, 오늘 급여 등 자세한 정보를 볼 수 있는 칸 입니다.
(월급 으로 지정된 직원은 금일 급여 및 근무 시간대가 보이지 않습니다.)`,
  },
  {
    selector: '[data-tour="step-12"]',
    content: `다음은 직원의 월 정산을 할 수 있는 버튼 입니다. 아래 버튼을 클릭해 보세요.`,
    highlightedSelectors: ['.ant-modal'],
    mutationObservables: ['.ant-modal-root'],
  },
];

export const DATE_CHECK_STEPS3 = [
  {
    selector: '[data-tour="step-13"]',
    content: `이곳은 선택한 직원의 정산을 도와주는 곳입니다. 위의 날짜 범위를 설정하셔서 범위 사이의 직원의 근무시간, 외근 횟수, 총 급여등을 계산해 주고 있습니다.`,
  },
  {
    selector: '[data-tour="step-14"]',
    content: `날짜는 기본값으로 전달 회사의 정산일 부터, 당일로 들어가 있고, 클릭하셔서 변경하실 수 있습니다.`,
  },
  {
    selector: '[data-tour="step-15"]',
    content: `날짜 범위를 설정 후에 위의 정산하기 버튼을 클릭하시면 직원의 정산 결과가 나옵니다. 클릭해보시겠어요?`,
  },
];

export const DATE_CHECK_STEPS4 = [
  {
    selector: '[data-tour="step-16"]',
    content: `아래와 같이 정산 결과를 확인하실 수 있습니다.`,
  },
  {
    selector: '[data-tour="step-17"]',
    content: `닫기 버튼을 클릭후에 마지막으로 오른쪽 위 메뉴바에 SETTING을 클릭하셔서 설정 페이지로 이동해 보겠습니다.`,
  },
];

export const DATE_CHECK_STEPS5 = [
  {
    selector: '[data-tour="step-18"]',
    content: `클릭하셔서 SETTING 페이지로 이동해보겠습니다.`,
  },
];

export const SETTING_STEPS = [
  {
    selector: '[data-tour="step-19"]',
    content: `이곳은 회사의 설정들을 바꿀 수 있는 설정 페이지 입니다. `,
  },
  {
    selector: '[data-tour="step-20"]',
    content: `첫번째로 설정하셨던 직원들의 직종들을 삭제, 추가 할 수 있는 직종 수정 칸입니다. 삭제 시 직종 옆 X 버튼을 클릭하면 삭제되고, 왼쪽 입력칸에 추가하실 직종을 입력 후 + 버튼을 클릭하거나 엔터를 누를 시 직종이 추가 됩니다.`,
  },
  {
    selector: '[data-tour="step-21"]',
    content: `다음은 급여 정산 날짜 수정 칸 입니다. 전에 직원 정산 버튼으로 직원들을 정산시에 기본값으로 들어가게 되는 날짜를 수정 하실 수 있습니다.`,
  },
  {
    selector: '[data-tour="step-22"]',
    content: `이곳은 주간,야간의 급여를 구분할지 설정 하는 칸입니다. 체크항목 체크시에 야간시간을 설정하고 야간에 급여 수당 배율을 설정하여 직원들의 급여를 시간대에 따라 다르게 할 수 있습니다. 
(월급 직원들은 반영되지 x)`,
  },
  {
    selector: '[data-tour="step-23"]',
    content: `수정사항을 변경후에는 반드시 아래 저장 버튼을 클릭하셔야 저장내용이 반영됩니다!`,
  },
  {
    selector: '[data-tour="step-24"]',
    content: `회사공휴일 수정 페이지로 이동해 보겠습니다. 회사 공휴일 수정 버튼을 클릭해주세요.`,
  },
];

export const APP_GUIDE_STEPS = [
  {
    selector: '[data-tour="step-30"]',
    content: `안녕하세요! Attandance App 에
오신 것을 환영합니다. 여기는 App Guide 페이지 입니다. 우선 원활한 앱사용을 위해서 아래 문서를 통해서 바탕화면에 위 앱을 등록해서 사용하세요!`,
  },
  {
    selector: '[data-tour="step-31"]',
    content: `완료 하셨다면 위의 메뉴바를 클릭하셔서 HOME으로 이동해 오른쪽아래 "?" 아이콘을 통해 가이드를 다시 진행해 주세요!`,
  },
];
