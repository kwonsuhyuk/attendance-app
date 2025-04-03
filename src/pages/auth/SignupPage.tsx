import { LockIcon } from "lucide-react";
import { Form } from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthFooter from "@/components/auth/AuthFooter";
import { PositionSelector } from "@/components/auth/PositionSelector";
import { ManagerConfirmation } from "@/components/auth/ManagerConfirmation";
import { EmployeeCompanyForm } from "@/components/auth/EmployeeCompanyForm";
import { PersonalInfoForm } from "@/components/auth/PersonalInfoForm";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useSignup } from "@/hooks/auth/useSignup";
import Seo from "@/components/Seo";

const SignupPage = () => {
  const {
    loading,
    error,
    position,
    isManagerCheck,
    isCodeValid,
    tempCompInfo,
    form,
    password,
    companyCode,
    setManagerCheck,
    handlePositionChange,
    checkCompanyCode,
    onSubmit,
  } = useSignup();
  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: "🚨 오류 발생",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  return (
    <>
      <Seo
        title="On & Off | 회원가입"
        description="On & Off에 가입하고 스마트한 출퇴근 관리를 시작하세요."
      />

      <div className="mt-10">
        <div className="mx-auto max-w-md px-4">
          <div className="flex flex-col items-center justify-center">
            <AuthHeader icon={LockIcon} title="회원가입" />
            <Form {...form}>
              <form onSubmit={onSubmit} className="mt-4 w-full space-y-6">
                <PositionSelector position={position} onPositionChange={handlePositionChange} />
                {position === "manager" && (
                  <ManagerConfirmation
                    isManagerCheck={isManagerCheck}
                    setManagerCheck={setManagerCheck}
                  />
                )}
                {position === "employee" && (
                  <EmployeeCompanyForm
                    form={form}
                    isCodeValid={isCodeValid}
                    tempCompInfo={tempCompInfo}
                    companyCode={companyCode}
                    checkCompanyCode={checkCompanyCode}
                  />
                )}
                <Separator />
                <PersonalInfoForm form={form} password={password} />
                <Separator />
                <AuthFooter
                  buttonText="회원가입"
                  linkText="계정이 있나요? 로그인으로 이동"
                  linkTo="/signin"
                  loading={loading}
                />
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
