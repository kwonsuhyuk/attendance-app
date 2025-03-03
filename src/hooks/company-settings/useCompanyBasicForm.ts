import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { companyBasicSchema } from "@/model/schema/managerFirstSchema/managerFirst.schema";
import { useCompanyStore } from "@/store/company.store";
import { useShallow } from "zustand/shallow";

export const useCompanyBasicForm = () => {
  // Zustand에서 초기값 가져오기
  const initialValues = useCompanyStore(
    useShallow(state => ({
      companyName: state.currentCompany?.companyName || "",
      companyIntro: state.currentCompany?.companyIntro || "",
      companyLogo: state.currentCompany?.companyLogo || "",
      adminName: state.currentCompany?.adminName || "",
    })),
  );

  const formMethods = useForm({
    resolver: zodResolver(companyBasicSchema),
    mode: "onChange",
    defaultValues: {
      companyName: initialValues.companyName,
      adminName: initialValues.adminName,
      companyIntro: initialValues.companyIntro,
      imageUrl: initialValues.companyLogo,
    },
  });

  return formMethods;
};
