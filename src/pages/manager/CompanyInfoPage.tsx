import { FormProvider } from "react-hook-form";
import CompanyBasicStep from "@/components/company/company-settings/basic-setting/CompanyBasicStep";
import { Button } from "@/components/ui/button";
import CompanySettingPageContainer from "@/components/container/manager/CompanyInfoPageContainer";
import { useCompanyInfoPage } from "@/hooks/company-settings/useCompanyInfoPage";

const CompanyInfoPage = () => {
  const { companyBasicForm, handleSubmit, onInvalid, onSubmit } = useCompanyInfoPage();

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
