import { FormProvider } from "react-hook-form";
import CompanyBasicStep from "@/components/company/company-settings/basic-setting/CompanyBasicStep";
import { Button } from "@/components/ui/button";
import CompanySettingPageContainer from "@/components/container/manager/CompanySettingPageContainer";
import { useCompanyInfoPage } from "@/hooks/company-settings/useCompanyInfoPage";
import Seo from "@/components/Seo";

const CompanyInfoPage = () => {
  const { companyBasicForm, handleSubmit, onInvalid, onSubmit } = useCompanyInfoPage();

  return (
    <>
      <Seo
        title="회사 기본 정보 | On & Off"
        description="On & Off에서 근태관리 서비스를 이용해보세요."
      />
      <CompanySettingPageContainer>
        <FormProvider {...companyBasicForm}>
          <form
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            className="flex h-full flex-col items-center justify-center space-y-12 px-4 py-10"
          >
            <CompanyBasicStep type="setting" />
            <Button type="submit">저장</Button>
          </form>
        </FormProvider>
      </CompanySettingPageContainer>
    </>
  );
};

export default CompanyInfoPage;
