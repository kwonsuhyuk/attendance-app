import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Progress } from "@/components/ui/progress";
import { getDatabase, ref, set } from "firebase/database";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/user.store";
import { useCompanyStore } from "@/store/company.store";

import CompanyBasicStep from "@/components/manager-setting/CompanyBasicStep";
import EmployeeInviteStep from "@/components/manager-setting/EmployeeInviteStep";
import StepperNavigation from "@/components/manager-setting/StepperNavigation";
import CompanyNightHolidayStep from "@/components/manager-setting/CompanyNightHolidayStep";
import CompanyJobListStep from "@/components/manager-setting/CompanyJobListStep";
import CompanyWorkPlaceStep from "@/components/manager-setting/CompanyWorkPlaceStep";
import { useShallow } from "zustand/shallow";
import { TCMUserData, TCompanyInfo } from "@/model";
import { encrypt } from "@/util/encryptDecrypt";

// ✅ 유효성 검사 스키마 (Zod)
const companyBasicSchema = z.object({
  companyName: z.string().min(2, "회사 이름을 입력하세요."),
  adminName: z.string().min(2, "대표자 이름을 입력하세요."),
  companyIntro: z.string().min(5, "회사 소개를 5자 이상 입력하세요."),
  imageUrl: z
    .union([z.string().url("올바른 이미지 URL을 입력하세요."), z.string().max(0)])
    .optional(),
});

const companyJobListSchema = z.object({
  companyJobs: z
    .array(z.object({ id: z.string(), name: z.string().min(1, "직무 이름을 입력하세요.") }))
    .optional(),
});

const companyNightHolidaySchema = z
  .object({
    payCheckDay: z.string().optional(),
    isDayNight: z.boolean(),
    nightStart: z.string().optional(),
    nightEnd: z.string().optional(),
    nightPay: z.number().min(1, "최소 1 이상의 값을 입력하세요.").optional(),
    isHoliday: z.boolean(),
    holidayPay: z.number().min(1, "최소 1 이상의 값을 입력하세요."),
    holidays: z.array(z.string()).optional(),
  })
  .refine(data => (data.isDayNight ? data.nightStart && data.nightEnd : true), {
    message: "야간 근무 설정 시 시작 및 종료 시간을 입력해야 합니다.",
    path: ["nightStart", "nightEnd"],
  });

// ✅ Zod 전체 폼 스키마 적용
const formSchema = z.object({
  companyBasic: companyBasicSchema,
  companyJobList: companyJobListSchema,
  companyNightHoliday: companyNightHolidaySchema,
});

const steps = ["회사 기본 설정", "회사 직무 설정", "야간 공휴일 설정", "근무지 추가", "직원 초대"];

const ManagerFirstPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const currentCompany = useCompanyStore(state => state.currentCompany); // ✅ store에서 companyID 가져오기
  const { companyCode, userId, name, email, phoneNumber } = useUserStore(
    useShallow(state => ({
      companyCode: state.currentUser?.companyCode,
      userId: state.currentUser?.uid,
      email: state.currentUser?.email,
      name: state.currentUser?.name,
      phoneNumber: state.currentUser?.phoneNumber,
    })),
  );
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
        payCheckDay: "",
        isDayNight: false,
        nightStart: "",
        nightEnd: "",
        nightPay: 1,
        isHoliday: false,
        holidayPay: 1,
        holidays: [],
      },
      companyWorkPlacesList: {
        companyWorkPlaces: [],
      },
    },
  });

  // ✅ Firebase 데이터 저장 함수
  const handleSubmitCompanyData = async () => {
    setLoading(true);
    const db = getDatabase();

    if (!userId || !companyCode) {
      toast.error("사용자 인증이 필요합니다.");
      setLoading(false);
      return;
    }

    const formData = methods.getValues();
    const companyRef = ref(db, `companyCode/${companyCode}/companyInfo`);
    const userRef = ref(db, `companyCode/${companyCode}/users/${userId}`);

    const companyData: TCompanyInfo = {
      companyName: formData.companyBasic.companyName,
      adminName: formData.companyBasic.adminName,
      companyLogo: formData.companyBasic.imageUrl || "",
      companyIntro: formData.companyBasic.companyIntro,
      isDayNight: formData.companyNightHoliday.isDayNight,
      nightStart: Number(formData.companyNightHoliday.nightStart) || 0,
      nightEnd: Number(formData.companyNightHoliday.nightEnd) || 0,
      payCheckDay: Number(formData.companyNightHoliday.payCheckDay) || 1,
      isNightPay: formData.companyNightHoliday.nightPay!,
      isHoliday: formData.companyNightHoliday.isHoliday,
      holidayPay: formData.companyNightHoliday.holidayPay!,
      holidayList: formData.companyNightHoliday.holidays || [],
      jobList: {},
      qrValue: encrypt(companyCode),
      workPlacesList: formData.companyWorkPlacesList.companyWorkPlaces,
    };

    const userData: TCMUserData = {
      name: name!,
      uid: userId,
      email: email!,
      phoneNumber: phoneNumber || "",
      userType: "manager",
      companyCode,
    };

    await set(companyRef, companyData);
    await set(userRef, userData);

    toast.success("회사 정보가 성공적으로 저장되었습니다!");
    navigate(`/${companyCode}/companymain`);
    setLoading(false);
  };

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

    // ✅ 마지막 스텝에서 데이터 저장 실행
    if (activeStep === steps.length - 1) {
      handleSubmitCompanyData();
      return;
    }

    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => setActiveStep(prev => prev - 1);

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-10">
        <h2 className="text-2xl font-bold tracking-tight text-center">Attendance-App</h2>

        <div className="w-full max-w-md">
          <Progress value={(activeStep / (steps.length - 1)) * 100} />
        </div>

        {activeStep === 0 && <CompanyBasicStep />}
        {activeStep === 1 && <CompanyJobListStep />}
        {activeStep === 2 && <CompanyNightHolidayStep />}
        {activeStep === 3 && <CompanyWorkPlaceStep />}
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
