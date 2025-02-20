import { lazy, Suspense } from "react";
import { FormProvider } from "react-hook-form";
import { Progress } from "@/components/ui/progress";
import { useCompanySettingForm } from "@/hooks/useCompanySettingForm";
import { useSubmitCompanyData } from "@/hooks/useSubmitCompanyData";
import StepperNavigation from "@/components/company-setting/StepperNavigation";
import { COMPANY_SETTING_STEPS } from "@/constant/steps";
import AppTitle from "@/components/common/AppTitle";
import Loading from "@/components/common/Loading";
import { useCompanyStep } from "@/hooks/useCompanyStep";

const CompanyBasicStep = lazy(() => import("@/components/company-setting/CompanyBasicStep"));
const EmployeeInviteStep = lazy(() => import("@/components/company-setting/EmployeeInviteStep"));
const CompanyNightHolidayStep = lazy(
  () => import("@/components/company-setting/CompanyNightHolidayStep"),
);
const CompanyJobListStep = lazy(() => import("@/components/company-setting/CompanyJobListStep"));
const CompanyWorkPlaceStep = lazy(
  () => import("@/components/company-setting/CompanyWorkPlaceStep"),
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
