import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Progress } from "@/components/ui/progress";
import CompanyBasicStep from "@/components/manager-setup/CompanyBasicStep";
import EmployeeInviteStep from "@/components/manager-setup/EmployeeInviteStep";
import StepperNavigation from "@/components/manager-setup/StepperNavigation";
import CompanyNightHolidayStep from "@/components/manager-setup/CompanyNightHolidayStep";
import CompanyJobListStep from "@/components/manager-setup/CompanyJobListStep";

// ✅ 유효성 검사 스키마 (Zod)
const companyBasicSchema = z.object({
  companyName: z.string().min(2, "회사 이름을 입력하세요."),
  adminName: z.string().min(2, "대표자 이름을 입력하세요."),
  companyIntro: z.string().min(5, "회사 소개를 입력하세요."),
  imageUrl: z
    .union([
      z.string().url("올바른 이미지 URL을 입력하세요."), // ✅ URL일 경우 유효성 검사
      z.string().max(0), // ✅ 빈 문자열("")도 허용
    ])
    .optional(),
});

const companyJobListSchema = z.object({
  companyJobs: z
    .array(
      z.object({
        id: z.string(),
        name: z.string().min(1, "직무 이름을 입력하세요."),
      }),
    )
    .optional(),
});

const companyNightHolidaySchema = z
  .object({
    isDayNight: z.boolean(),
    nightStart: z.string().optional(),
    nightEnd: z.string().optional(),
    nightPay: z.number().min(1, "최소 1 이상의 값을 입력하세요.").optional(),
    isHoliday: z.boolean(),
    holidayPay: z.number().min(1, "최소 1 이상의 값을 입력하세요."),
    holidays: z.array(z.string()).optional(),
  })
  .refine(
    data => {
      if (data.isDayNight) {
        return data.nightStart && data.nightEnd;
      }
      return true;
    },
    {
      message: "야간 근무 설정 시 시작 및 종료 시간을 입력해야 합니다.",
      path: ["nightStart", "nightEnd"],
    },
  );

// ✅ Zod 전체 폼 스키마 적용
const formSchema = z.object({
  companyBasic: companyBasicSchema,
  companyJobList: companyJobListSchema,
  companyNightHoliday: companyNightHolidaySchema,
});

const steps = ["회사 기본 설정", "회사 직무 설정", "야간 공휴일 설정", "근무지 추가", "직원 초대"];

const ManagerFirstPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyBasic: {
        companyName: "",
        adminName: "",
        companyIntro: "",
        imageUrl: "",
      },
      companyJobList: {
        companyJobs: [],
      },
      companyNightHoliday: {
        isDayNight: false,
        nightStart: "",
        nightEnd: "",
        nightPay: 1,
        isHoliday: false,
        holidayPay: 1,
        holidays: [],
      },
    },
  });

  const handleNext = async () => {
    const stepValidation =
      activeStep === 0
        ? "companyBasic"
        : activeStep === 1
        ? "companyJobList"
        : activeStep === 2
        ? "companyNightHoliday"
        : null;

    if (stepValidation) {
      const isValid = await methods.trigger(stepValidation, { shouldFocus: true });

      if (!isValid) {
        console.log("🚨 유효성 검사 실패:", methods.formState.errors);
        return;
      }
    }

    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => setActiveStep(prev => prev - 1);

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-6">
        <div className="mt-4">
          <h2 className="scroll-m-20 text-2xl font-bold tracking-tight text-center">
            Attendance-App
          </h2>
        </div>
        <div className="w-full max-w-md">
          <Progress value={(activeStep / (steps.length - 1)) * 100} />
        </div>

        {activeStep === 0 && <CompanyBasicStep />}
        {activeStep === 1 && <CompanyJobListStep />}
        {activeStep === 2 && <CompanyNightHolidayStep />}
        {activeStep === 4 && <EmployeeInviteStep />}

        <StepperNavigation
          activeStep={activeStep}
          steps={steps}
          onNext={handleNext}
          onBack={handleBack}
        />
      </div>
    </FormProvider>
  );
};

export default ManagerFirstPage;
