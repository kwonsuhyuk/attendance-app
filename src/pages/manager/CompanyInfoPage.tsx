import { useCompanyBasicForm } from "@/hooks/company-settings/useCompanyBasicForm";
import { FormProvider } from "react-hook-form";
import CompanyBasicStep from "@/components/company/company-settings/basic-setting/CompanyBasicStep";
import { Button } from "@/components/ui/button";
import CompanySettingPageContainer from "@/components/container/manager/CompanyInfoPageContainer";
import { useToast } from "@/hooks/use-toast";
import { useCompanyStore } from "@/store/company.store";
import { updateCompanyBasicInfo } from "@/api";

const CompanyInfoPage = () => {
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

  const onSubmit = async (data: any) => {
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

  return (
    <CompanySettingPageContainer>
      <FormProvider {...companyBasicForm}>
        <form
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          className="flex h-full flex-col items-center justify-center space-y-12 px-4"
        >
          <CompanyBasicStep type="setting" />
          <Button type="submit">저장</Button>
        </form>
      </FormProvider>
    </CompanySettingPageContainer>
  );
};

export default CompanyInfoPage;
