import CompanySettingPageContainer from "@/components/container/manager/CompanyInfoPageContainer";
import { FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCompanyStore } from "@/store/company.store";
import CompanyJobListStep from "@/components/company/company-settings/job-setting/CompanyJobListStep";
import { useCompanyJobListForm } from "@/hooks/company-settings/useCompanyJobListForm";
import { updateCompanyJobList } from "@/api";

const PositionManagePage = () => {
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
  return (
    <CompanySettingPageContainer>
      <FormProvider {...companyJobListForm}>
        <form
          onKeyDown={e => e.key === "Enter" && e.preventDefault()}
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          className="flex h-full flex-col items-center justify-center space-y-12 px-4 py-10"
        >
          <CompanyJobListStep type="setting" />
          <Button type="submit">저장</Button>
        </form>
      </FormProvider>
    </CompanySettingPageContainer>
  );
};

export default PositionManagePage;
