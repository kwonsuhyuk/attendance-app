import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "../api/auth";
import { loginFormSchema } from "../model";
import type { TLoginForm } from "../model";

export const useLogin = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginForm>({
    resolver: zodResolver(loginFormSchema),
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

  return {
    error,
    loading,
    register,
    errors,
    handleSubmit: handleSubmit(onSubmit),
    handleGuestLogin,
  };
};
