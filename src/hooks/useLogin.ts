import { useState, useEffect, useCallback, useRef } from "react";
import { login } from "../api/auth";
import { loginFormSchema } from "../model";
import { z } from "zod";

export const useLogin = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
    };

    try {
      loginFormSchema.parse(formData);
      setLoading(true);
      const response = await login(formData);

      if (!response.success) {
        setError("이메일 또는 비밀번호가 올바르지 않습니다");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldName = error.errors[0].path[0];
        if (fieldName === "email") {
          setError("이메일 형식이 올바르지 않습니다");
        } else if (fieldName === "password") {
          setError("비밀번호는 6자 이상이어야 합니다");
        }
      } else {
        setError("로그인 중 오류가 발생했습니다");
      }
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
    emailRef,
    passwordRef,
    handleSubmit,
    handleGuestLogin,
  };
};
