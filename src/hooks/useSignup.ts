import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { setUser } from "../store/userSlice";
import { validateCompanyCode } from "../api";
import { signup } from "../api/auth/index";
import { signupFormSchema } from "../model";
import type { TSignupFormData, TPosition, TSignupUserData } from "@/model";
import { zodResolver } from "@hookform/resolvers/zod";

export const useSignup = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [position, setPosition] = useState<TPosition>("");
  const [isManagerCheck, setManagerCheck] = useState<boolean>(false);
  const [isCodeValid, setIsCodeValid] = useState<boolean>(false);
  const [tempCompInfo, setTempCompInfo] = useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm<TSignupFormData>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPW: "",
      companyCode: "",
    },
  });

  const password = form.watch("password");
  const companyCode = form.watch("companyCode");

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(""), 3000);
    return () => clearTimeout(timer);
  }, [error]);

  const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPosition(e.target.value as TPosition);
  };

  const checkCompanyCode = async (code: string) => {
    try {
      const result = await validateCompanyCode(code);
      if (result.isValid && result.companyName) {
        setTempCompInfo(result.companyName);
        setIsCodeValid(true);
      } else {
        form.setError("companyCode", {
          type: "manual",
          message: result.error || "유효하지 않은 회사 코드입니다",
        });
        setIsCodeValid(false);
      }
    } catch (error) {
      form.setError("companyCode", {
        type: "manual",
        message: "회사 코드 확인 중 오류가 발생했습니다",
      });
      setIsCodeValid(false);
    }
  };

  const sendUserInfo = useCallback(
    async (formData: TSignupFormData) => {
      setLoading(true);
      try {
        const result = await signup({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          companyCode: formData.companyCode,
          phoneNumber: formData.phoneNumber,
          confirmPW: formData.confirmPW,
        });

        if (!result.success || !result.data) {
          throw new Error(result.error);
        }

        const userData: TSignupUserData = {
          id: result.data.userId,
          name: formData.name,
          companyCode: formData.companyCode,
          phoneNumber: formData.phoneNumber,
        };

        dispatch(setUser(userData));

        navigate(position === "manager" ? "/managerfirst" : "/employeefirst", {
          state: userData,
        });
      } catch (e) {
        console.error("Detailed error:", e);
        setError(e instanceof Error ? e.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    },
    [dispatch, position, navigate],
  );

  const onSubmit = (data: TSignupFormData) => {
    sendUserInfo(data);
  };

  useEffect(() => {
    if (window.innerWidth <= 600 && isManagerCheck) {
      alert(
        "관리자는 PC 전용 서비스 입니다. PC버전으로 회원가입을 진행하셔야 추후에 문제가 발생하지 않습니다. PC로 회원가입 진행 부탁드립니다.",
      );
    }
  }, [isManagerCheck]);

  return {
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
    onSubmit: form.handleSubmit(onSubmit),
  };
};
