import { lazy, Suspense } from "react";
import { FormProvider } from "react-hook-form";
import { Progress } from "@/components/ui/progress";
import { useCompanySettingForm } from "@/hooks/company-settings/useCompanySettingForm";
import { useSubmitCompanyData } from "@/hooks/company-settings/useSubmitCompanyData";
import { COMPANY_SETTING_STEPS } from "@/constants/steps";
import AppTitle from "@/components/common/AppTitle";
import Loading from "@/components/common/Loading";
import { useCompanyStep } from "@/hooks/auth/useCompanyStep";
import StepperNavigation from "@/components/company/company-settings/StepperNavigation";

const CompanyBasicStep = lazy(
  () => import("@/components/company/company-settings/basic-setting/CompanyBasicStep"),
);
const CompanyJobListStep = lazy(
  () => import("@/components/company/company-settings/job-setting/CompanyJobListStep"),
);
const CompanyNightHolidayStep = lazy(
  () =>
    import("@/components/company/company-settings/night-holiday-setting/CompanyNightHolidayStep"),
);

const CompanyWorkPlaceStep = lazy(
  () => import("@/components/company/company-settings/workplace-setting/CompanyWorkPlaceStep"),
);
const EmployeeInviteStep = lazy(
  () => import("@/components/company/company-settings/EmployeeInviteStep"),
);

const ManagerFirstPage = () => {
  const companySettingForm = useCompanySettingForm();
  const { submitCompanyData, loading } = useSubmitCompanyData(companySettingForm.getValues);
  const { activeStep, handleNext, handleBack } = useCompanyStep({
    submitCompanyData,
    companySettingForm,
  });

  if (loading) return <Loading />;

  return (
    <FormProvider {...companySettingForm}>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-10">
        <AppTitle />
        <div className="w-full max-w-md">
          <Progress value={(activeStep / (COMPANY_SETTING_STEPS.length - 1)) * 100} />
        </div>
        <Suspense fallback={<Loading />}>
          {activeStep === 0 && <CompanyBasicStep />}
          {activeStep === 1 && <CompanyJobListStep />}
          {activeStep === 2 && <CompanyNightHolidayStep />}
          {activeStep === 3 && <CompanyWorkPlaceStep />}
          {activeStep === 4 && <EmployeeInviteStep />}
        </Suspense>
        <StepperNavigation
          activeStep={activeStep}
          steps={COMPANY_SETTING_STEPS}
          onNext={handleNext}
          onBack={handleBack}
        />
      </div>
    </FormProvider>
  );
};

export default ManagerFirstPage;
