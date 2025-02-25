export const MAIN_ROUTES = {
  INDEX: "/",
  MAIN: "/:id/*",
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
};

export const MANAGER_ROUTES = {
  SETTING: "/setting/*",
  EMPLOYEE_LIST: "/employeelist",
  CALENDAR: "/datecheck/:id",
};

export const COMMON_ROUTES = {
  COMPANY_MAIN: "/companymain",
  ABOUT: "/about",
};
