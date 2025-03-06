import React from "react";
import { useToast } from "@/hooks/use-toast";
import { useCompanyStore } from "@/store/company.store";
import { updateCompanyBasicInfo } from "@/api";
import { TCompanyInfo } from "@/model/types/company.type";
import { useCompanyBasicForm } from "@/hooks/company-settings/useCompanyBasicForm";

export const useCompanyInfoPage = () => {
  const companyCode = useCompanyStore(state => state.currentCompany?.companyCode);
  const companyBasicForm = useCompanyBasicForm();
  const { handleSubmit } = companyBasicForm;
  const { toast } = useToast();

  const onInvalid = () => {
    toast({
      title: "회사 기본 정보에 실패 했습니다.",
      variant: "destructive",
    });
  };

  const onSubmit = async (data: Partial<TCompanyInfo>) => {
    if (companyCode) {
      const response = await updateCompanyBasicInfo(companyCode, data);
      if (response.success) {
        toast({
          title: response.message,
        });
      } else {
        console.error(response.error);
        toast({
          title: response.error,
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "회사 정보가 없습니다.",
        variant: "destructive",
      });
    }
  };

  return {
    companyBasicForm,
    handleSubmit,
    onInvalid,
    onSubmit,
  };
};
