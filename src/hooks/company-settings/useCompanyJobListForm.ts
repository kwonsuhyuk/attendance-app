import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { companyJobListSchema } from "@/model/schema/managerFirstSchema/managerFirst.schema";
import { useCompanyStore } from "@/store/company.store";
import { useShallow } from "zustand/shallow";

export const useCompanyJobListForm = () => {
  const { jobList } = useCompanyStore(
    useShallow(state => ({
      jobList: state.currentCompany?.jobList,
    })),
  );

  const formMethods = useForm({
    resolver: zodResolver(companyJobListSchema),
    mode: "onChange",
    defaultValues: {
      companyJobs: jobList,
    },
  });
  return formMethods;
};
