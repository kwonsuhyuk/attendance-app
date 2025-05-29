import CompanyWorkPlaceStep from "@/components/company/company-settings/workplace-setting/CompanyWorkPlaceStep";
import CompanySettingPageContainer from "@/components/container/manager/CompanySettingPageContainer";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { companyWorkPlaceSetStep } from "@/constants/managerTourSteps";
import { useFormBlocker } from "@/hooks/company-settings/useFormBlocker";
import { useWorkplacePage } from "@/hooks/company-settings/useWorkplacePage";
import { useTour } from "@/hooks/use-tour";
import { useRef } from "react";
import { FormProvider } from "react-hook-form";

const WorkplaceManagePage = () => {
  const { handleSubmit, companyWorkPlacesListForm, onSubmit, onInvalid } = useWorkplacePage();
  const { formState } = companyWorkPlacesListForm;

  const allowNavigation = useRef(false);

  const handleValidSubmit = (data: any) => {
    allowNavigation.current = true;
    onSubmit(data);
  };

  useFormBlocker(formState.isDirty && !allowNavigation.current);
  useTour("company_workplace_set", companyWorkPlaceSetStep);

  return (
    <>
      <Seo
        title="근무지 관리 | On & Off"
        description="On & Off에서 근태관리 서비스를 이용해보세요."
      />
      <CompanySettingPageContainer>
        <FormProvider {...companyWorkPlacesListForm}>
          <form
            onSubmit={handleSubmit(handleValidSubmit, onInvalid)}
            className="flex h-full flex-col items-center justify-center space-y-12 px-4 py-10"
          >
            <CompanyWorkPlaceStep type="setting" />
            <Button type="submit" data-tour="workplace_set-3">
              저장
            </Button>
          </form>
        </FormProvider>
      </CompanySettingPageContainer>
    </>
  );
};

export default WorkplaceManagePage;
