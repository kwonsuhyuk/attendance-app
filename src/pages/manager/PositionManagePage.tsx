import CompanySettingPageContainer from "@/components/container/manager/CompanySettingPageContainer";
import { FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import CompanyJobListStep from "@/components/company/company-settings/job-setting/CompanyJobListStep";
import { usePositionManagePage } from "@/hooks/company-settings/usePositionManagePage";
import Seo from "@/components/Seo";

const PositionManagePage = () => {
  const { companyJobListForm, handleSubmit, onInvalid, onSubmit } = usePositionManagePage();
  return (
    <>
      <Seo
        title="직무 관리 | On & Off"
        description="On & Off에서 근태관리 서비스를 이용해보세요."
      />
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
    </>
  );
};

export default PositionManagePage;
