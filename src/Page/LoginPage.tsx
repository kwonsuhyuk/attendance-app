import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { LogInIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

import { login } from "../api/auth/index";
import { loginFormSchema } from "../model";
import type { TLoginForm } from "../model";

import AuthHeader from "@/components/auth/AuthHeader";
import AuthFooter from "@/components/auth/AuthFooter";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginForm>({
    resolver: zodResolver(loginFormSchema), // Zod 스키마 적용
  });

  const onSubmit = async (formData: TLoginForm) => {
    try {
      setLoading(true);
      const response = await login(formData);
      if (!response.success) {
        setError("이메일 또는 비밀번호가 올바르지 않습니다");
      }
    } catch (error) {
      setError("로그인 중 오류가 발생했습니다");
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await login({ email, password });
      if (!response.success) {
        setError("게스트 로그인 실패");
      }
    } catch (error) {
      setError("게스트 로그인 중 오류가 발생했습니다");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(""), 3000);
    return () => clearTimeout(timer);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 space-y-6">
          <AuthHeader icon={LogInIcon} title="로그인" />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
