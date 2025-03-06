import { FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import CompanySettingPageContainer from "@/components/container/manager/CompanyInfoPageContainer";
import CompanyNightHolidayStep from "@/components/company/company-settings/night-holiday-setting/CompanyNightHolidayStep";
import { useHolidayNightManagePage } from "@/hooks/company-settings/useHolidayNightManagePage";

const HolidayNightManagePage = () => {
  const { companyNightHolidayForm, handleSubmit, onSubmit, onInvalid } =
    useHolidayNightManagePage();

  return (
    <CompanySettingPageContainer>
      <FormProvider {...companyNightHolidayForm}>
        <form
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          className="flex h-full flex-col items-center justify-center space-y-12 px-4 py-10"
        >
          <CompanyNightHolidayStep type="setting" />
          <Button type="submit">저장</Button>
        </form>
      </FormProvider>
    </CompanySettingPageContainer>
  );
};

export default HolidayNightManagePage;
