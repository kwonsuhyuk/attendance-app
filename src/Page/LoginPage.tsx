import { LogInIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthFooter from "@/components/auth/AuthFooter";
import LoginForm from "@/components/auth/LoginForm";

import { useLogin } from "../hooks/useLogin";

const LoginPage = () => {
  const { error, loading, register, errors, handleSubmit, handleGuestLogin } = useLogin();

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 space-y-6">
          <AuthHeader icon={LogInIcon} title="로그인" />

          <form onSubmit={handleSubmit} className="space-y-6">
            <LoginForm register={register} errors={errors} />

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-6">
              <Separator />

              <div className="space-y-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => handleGuestLogin("test@naver.com", "qweqwe")}
                  disabled={loading}
                >
                  관리자 Guest 로그인
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => handleGuestLogin("testep@naver.com", "qweqwe")}
                  disabled={loading}
                >
                  직원 Guest 로그인
                </Button>
              </div>

              <AuthFooter
                buttonText="로그인"
                linkText="계정이 없나요? 회원가입으로 이동"
                linkTo="/signup"
                loading={loading}
              />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
