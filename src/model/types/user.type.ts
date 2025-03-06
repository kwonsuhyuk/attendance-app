import { TPosition, TEmploymentType } from "./position.type";
import { TJobList, TSelectableJobName } from "./company.type";

// 날짜별 근무 시간 타입
export type WorkTime = {
  startTime?: string;
  endTime?: string;
};

// 날짜별 근무 데이터 타입
export type WorkData = {
  daySalary: number;
  holidayAndWeekendSalary: number;
  nightSalary: number;
  workHour: number;
};

// 날짜 맵 타입 (키는 날짜 문자열, 값은 제네릭 타입)
export type DateMap<T> = {
  [date: string]: T;
};

// 기본 사용자 정보 타입
export type TUserBase = {
  uid: string;
  name: string;
  email: string;
  companyCode: string;
  phoneNumber: string;
  userType: TPosition;
};

// 직원 타입 (제네릭 활용)
export type TEmpUserData<T extends TJobList = TJobList> = Omit<TUserBase, "userType"> & {
  userType: "employee";
  jobName: TSelectableJobName<T>;
  salaryAmount?: number;
  salaryType?: string;
  date?: DateMap<WorkTime>;
  workDates?: DateMap<WorkData>;
  employmentType: TEmploymentType;
};

// 관리자 타입
export type TCMUserData = Omit<TUserBase, "userType"> & {
  userType: "manager"; // 관리자(user)로 고정
};

export type EmployeeInfo = Omit<TEmpUserData, "userType" | "salaryType"> & {
  uid?: string;
};

export type BaseEmployeeForm = {
  selectedJob: string;
  selectedSalaryType: string;
  salary: number;
};

export type FilterForm = BaseEmployeeForm & {
  searchName: string;
};

export type EmployeeForm = BaseEmployeeForm;
