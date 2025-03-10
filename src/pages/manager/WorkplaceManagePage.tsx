import CompanyWorkPlaceStep from "@/components/company/company-settings/workplace-setting/CompanyWorkPlaceStep";
import CompanySettingPageContainer from "@/components/container/manager/CompanyInfoPageContainer";
import { Button } from "@/components/ui/button";
import { useWorkplacePage } from "@/hooks/company-settings/useWorkplacePage";
import { useCompanyStore } from "@/store/company.store";
import { FormProvider } from "react-hook-form";

const WorkplaceManagePage = () => {
  const { handleSubmit, companyWorkPlacesListForm, onSubmit, onInvalid } = useWorkplacePage();

  return (
    <CompanySettingPageContainer>
      <FormProvider {...companyWorkPlacesListForm}>
        <form
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          className="flex h-full flex-col items-center justify-center space-y-12 px-4 py-10"
        >
          <CompanyWorkPlaceStep type="setting" />
          <Button type="submit">저장</Button>
        </form>
      </FormProvider>
    </CompanySettingPageContainer>
  );
};

export default WorkplaceManagePage;
