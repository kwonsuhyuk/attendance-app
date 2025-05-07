import CompanyWorkPlaceStep from "@/components/company/company-settings/workplace-setting/CompanyWorkPlaceStep";
import CompanySettingPageContainer from "@/components/container/manager/CompanySettingPageContainer";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { useWorkplacePage } from "@/hooks/company-settings/useWorkplacePage";
import { FormProvider } from "react-hook-form";

const WorkplaceManagePage = () => {
  const { handleSubmit, companyWorkPlacesListForm, onSubmit, onInvalid } = useWorkplacePage();

  return (
    <>
      <Seo
        title="근무지 관리 | On & Off"
        description="On & Off에서 근태관리 서비스를 이용해보세요."
      />
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
    </>
  );
};

export default WorkplaceManagePage;
