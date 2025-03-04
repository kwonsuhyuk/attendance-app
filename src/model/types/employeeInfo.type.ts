export type EmployeeInfo = {
  name: string;
  email: string;
  phoneNumber: string;
  jobName: string;
  salaryType: string;
  salaryAmount: number;
  companyCode: string;
  uid?: string;
};

// 참조 타입
export type BaseEmployeeForm = {
  selectedJob: string;
  selectedSalaryType: string;
  salary: number;
};

export type FilterForm = BaseEmployeeForm & {
  searchName: string;
};

export type EmployeeForm = BaseEmployeeForm;
