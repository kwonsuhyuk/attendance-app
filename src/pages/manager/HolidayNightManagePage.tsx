import { useCompanyBasicForm } from "@/hooks/company-settings/useCompanyBasicForm";
import { FormProvider } from "react-hook-form";
import CompanyBasicStep from "@/components/company/company-settings/basic-setting/CompanyBasicStep";
import { Button } from "@/components/ui/button";
import CompanySettingPageContainer from "@/components/container/manager/CompanyInfoPageContainer";
import { useToast } from "@/hooks/use-toast";
import { useCompanyStore } from "@/store/company.store";
import { updateCompanyBasicInfo, updateCompanyNightHolidayInfo } from "@/api";
import CompanyNightHolidayStep from "@/components/company/company-settings/night-holiday-setting/CompanyNightHolidayStep";
import { useCompanyNightHolidayForm } from "@/hooks/company-settings/useCompanyNightHolidayForm";
import Loading from "@/components/common/Loading";
import { TCompanyInfo } from "@/model/types/company.type";

const HolidayNightManagePage = () => {
  const companyCode = useCompanyStore(state => state.currentCompany?.companyCode);
  const { formMethods: companyNightHolidayForm, loading } = useCompanyNightHolidayForm();
  const { handleSubmit } = companyNightHolidayForm;
  const { toast } = useToast();

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

  if (loading) return <Loading />;

  return (
    <CompanySettingPageContainer>
      <FormProvider {...companyNightHolidayForm}>
        <form
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          className="flex h-full flex-col items-center justify-center space-y-12 px-4 py-10"
        >
          <CompanyNightHolidayStep type="setting" />
          <Button type="submit">저장</Button>
        </form>
      </FormProvider>
    </CompanySettingPageContainer>
  );
};

export default HolidayNightManagePage;
