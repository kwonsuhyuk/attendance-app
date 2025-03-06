import React from "react";
import { useCompanyJobListForm } from "@/hooks/company-settings/useCompanyJobListForm";
import { updateCompanyJobList } from "@/api";
import { useToast } from "@/hooks/use-toast";
import { useCompanyStore } from "@/store/company.store";

export const usePositionManagePage = () => {
  const companyCode = useCompanyStore(state => state.currentCompany?.companyCode);
  const companyJobListForm = useCompanyJobListForm();
  const { handleSubmit } = companyJobListForm;
  const { toast } = useToast();

  const onInvalid = () => {
    toast({
      title: "회사 기본 정보에 실패 했습니다.",
      variant: "destructive",
    });
  };

  const onSubmit = async (data: any) => {
    if (!companyCode) {
      toast({
        title: "회사 정보가 없습니다.",
        variant: "destructive",
      });
      return;
    }

    const response = await updateCompanyJobList(companyCode, data.companyJobs);
    if (response.success) {
      toast({
        title: response.message,
      });
    } else {
      console.error("❌ Firebase 업데이트 오류:", response.error);
      toast({
        title: response.error,
        variant: "destructive",
      });
    }
  };

  return {
    companyJobListForm,
    handleSubmit,
    onInvalid,
    onSubmit,
  };
};
