export const MAIN_ROUTES = {
  INDEX: "/",
  MAIN: "/:companyCode/*",
  SIGNUP: "/signup",
  MANAGER_FIRST: "/managerfirst",
  EMPLOYEE_FIRST: "/employeefirst",
  SIGNIN: "/signin",
  NOT_FOUND: "/*",
};

export const EMPLOYEE_ROUTES = {
  COMMUTE: "/camera",
  APP_GUIDE: "/appguide",
  EMPLOYEE_DATE_CHECK: "/calendar",
  MY_VACATION: "/myvacation",
  EMPLOYEE_MENU: "/employeemenu",
};

export const MANAGER_ROUTES = {
  SETTING: "/setting/*",
  EMPLOYEE_LIST: "/employeelist",
  POSITION_MANAGE: "/positionmanage",
  WORKPLACE_MANAGE: "/workplacemanage",
  CALENDAR: "/datecheck/:id",
  TODAY_ATT: "/todayatt",
  PERIOD_ATT: "/periodatt",
  VACATION_STATISTIC: "/vacationstatistic",
  VACATION_DETAIL: "/vacationdetail",
  COMPANY_INFO: "/companyinfo",
  HOLIDAY_MANAGE: "/holidaymanage",
};

export const COMMON_ROUTES = {
  COMPANY_MAIN: "/companymain",
  NOTICE: "/notice",
  ABOUT: "/about",
};
