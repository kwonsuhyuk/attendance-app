import { FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import CompanySettingPageContainer from "@/components/container/manager/CompanySettingPageContainer";
import CompanyNightHolidayStep from "@/components/company/company-settings/night-holiday-setting/CompanyNightHolidayStep";
import { useHolidayNightManagePage } from "@/hooks/company-settings/useHolidayNightManagePage";
import Seo from "@/components/Seo";
import { useRef } from "react";
import { useFormBlocker } from "@/hooks/company-settings/useFormBlocker";
import { useTour } from "@/hooks/use-tour";
import { companyHolidaySetStep } from "@/constants/managerTourSteps";

const HolidayNightManagePage = () => {
  const { companyNightHolidayForm, handleSubmit, onSubmit, onInvalid } =
    useHolidayNightManagePage();

  const { formState } = companyNightHolidayForm;

  const allowNavigation = useRef(false);

  const handleValidSubmit = (data: any) => {
    allowNavigation.current = true;
    onSubmit(data);
  };

  useFormBlocker(formState.isDirty && !allowNavigation.current);
  useTour("company_holiday_set", companyHolidaySetStep);

  return (
    <>
      <Seo
        title="공휴일 관리 | On & Off"
        description="On & Off에서 근태관리 서비스를 이용해보세요."
      />
      <CompanySettingPageContainer>
        <FormProvider {...companyNightHolidayForm}>
          <form
            onSubmit={handleSubmit(handleValidSubmit, onInvalid)}
            className="flex h-full flex-col items-center justify-center space-y-12 px-4 py-10"
          >
            <CompanyNightHolidayStep type="setting" />
            <Button type="submit" data-tour="holiday_set-5">
              저장
            </Button>
          </form>
        </FormProvider>
      </CompanySettingPageContainer>
    </>
  );
};

export default HolidayNightManagePage;
