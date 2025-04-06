import { useState, useEffect } from "react";
import { loginFormSchema } from "@/model/schema/authSchema/login.schema";
import { login } from "@/api/auth.api";
import { loginParseZodError } from "@/util/loginParseZodError";

interface Props {
  emailRef: React.RefObject<HTMLInputElement>;
  passwordRef: React.RefObject<HTMLInputElement>;
}

export const useLogin = ({ emailRef, passwordRef }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    const validation = loginFormSchema.safeParse({ email, password });

    if (!validation.success) {
      setError(loginParseZodError(validation.error));
      return;
    }

    setIsLoading(true);
    const result = await login({ email, password });
    setIsLoading(false);

    if (!result.success) {
      setError("이메일 또는 비밀번호가 올바르지 않습니다");
    }
  };

  const handleGuestLogin = async (email: string, password: string) => {
    setIsLoading(true);
    const result = await login({ email, password });
    setIsLoading(false);

    if (!result.success) {
      setError("게스트 로그인 실패");
    }
  };

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(null), 3000);
    return () => clearTimeout(timer);
  }, [error]);

  return {
    error,
    isLoading,
    handleSubmit,
    handleGuestLogin,
  };
};
