import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { companyJobListSchema } from "@/model/schema/managerFirstSchema/managerFirst.schema";

export const useCompanyJobListForm = () => {
  return useForm({
    resolver: zodResolver(companyJobListSchema),
    defaultValues: {
      companyJobs: [],
    },
  });
};
