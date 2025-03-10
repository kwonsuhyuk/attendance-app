import { useCompanyStore } from "@/store/company.store";

export const useJobList = () => {
  const jobList = useCompanyStore(state => state.currentCompany?.jobList ?? []);
  return jobList;
};
