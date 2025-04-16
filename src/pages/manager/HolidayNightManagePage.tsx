import { FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import CompanySettingPageContainer from "@/components/container/manager/CompanySettingPageContainer";
import CompanyNightHolidayStep from "@/components/company/company-settings/night-holiday-setting/CompanyNightHolidayStep";
import { useHolidayNightManagePage } from "@/hooks/company-settings/useHolidayNightManagePage";
import Seo from "@/components/Seo";

const HolidayNightManagePage = () => {
  const { companyNightHolidayForm, handleSubmit, onSubmit, onInvalid } =
    useHolidayNightManagePage();

  return (
    <>
      <Seo
        title="공휴일 관리 | On & Off"
        description="On & Off에서 근태관리 서비스를 이용해보세요."
      />
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
    </>
  );
};

export default HolidayNightManagePage;
