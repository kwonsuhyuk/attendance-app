import CompanySettingPageContainer from "@/components/container/manager/CompanySettingPageContainer";
import { FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import CompanyJobListStep from "@/components/company/company-settings/job-setting/CompanyJobListStep";
import { usePositionManagePage } from "@/hooks/company-settings/usePositionManagePage";

const PositionManagePage = () => {
  const { companyJobListForm, handleSubmit, onInvalid, onSubmit } = usePositionManagePage();
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
