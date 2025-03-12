import { useToast } from "@/hooks/use-toast";
import { useCompanyStore } from "@/store/company.store";
import { TCompanyInfo } from "@/model/types/company.type";
import { useCompanyNightHolidayForm } from "@/hooks/company-settings/useCompanyNightHolidayForm";
import { updateCompanyNightHolidayInfo } from "@/api/company.api";

export const useHolidayNightManagePage = () => {
  const { toast } = useToast();
  const { formMethods: companyNightHolidayForm, loading } = useCompanyNightHolidayForm();
  const { handleSubmit } = companyNightHolidayForm;
  const companyCode = useCompanyStore(state => state.currentCompany?.companyCode);
  const onInvalid = () => {
    toast({
      title: "회사 기본 정보에 실패 했습니다.",
      variant: "destructive",
    });
  };

  const onSubmit = async (data: Partial<TCompanyInfo>) => {
    if (companyCode) {
      const response = await updateCompanyNightHolidayInfo(companyCode, data);

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
    companyNightHolidayForm,
    handleSubmit,
    onSubmit,
    onInvalid,
  };
};
