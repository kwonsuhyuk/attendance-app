import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserStore } from "@/store/user.store";
import { signupFormSchema } from "@/model";
import { getCompanyInfo, validateCompanyCode } from "@/api";
import { signup } from "@/api/auth";
import type { TSignupFormData, TPosition, TEmpUserData, TCMUserData } from "@/model";
import { z } from "zod";
import { useCompanyStore } from "@/store/company.store";
import { nanoid } from "nanoid";

export const useSignup = () => {
  const navigate = useNavigate();
  const setUser = useUserStore(state => state.setUser);
  const setCompany = useCompanyStore(state => state.setCompany);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // const [position, setPosition] = useState<TPosition>("");
  const [isManagerCheck, setManagerCheck] = useState<boolean>(false);
  const [isCodeValid, setIsCodeValid] = useState<boolean>(false);
  const [tempCompInfo, setTempCompInfo] = useState("");

  const form = useForm<TSignupFormData>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPW: "",
      companyCode: "",
      position: undefined,
    },
  });
  const password = form.watch("password");
  const companyCode = form.watch("companyCode");
  const position = form.watch("position");

  const checkCompanyCode = async (code: string) => {
    if (!code) {
      setIsCodeValid(false);
      return;
    }
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

  const handlePositionChange = (value: TPosition) => {
    form.setValue("position", value);
  };

  const onSubmit = async (formData: TSignupFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      if (position === "employee" && !isCodeValid)
        throw new Error("회사찾기 버튼을 통해 유효한 회사코드를 입력 해주세요.");

      if (position === "manager" && !isManagerCheck)
        throw new Error("관리자 권한 설명을 읽고 가입 확인을 해주세요.");

      signupFormSchema.parse(formData);

      let companyCode = formData.companyCode;

      if (position === "manager") {
        companyCode = nanoid(8);
      }

      const result = await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        companyCode,
        phoneNumber: formData.phoneNumber,
        position,
        confirmPW: formData.confirmPW,
      });

      if (!result.success || !result.data) {
        throw new Error(result.error || "회원가입에 실패했습니다.");
      }

      const signupData = {
        id: result.data.userId,
        name: formData.name,
        companyCode,
        phoneNumber: formData.phoneNumber,
      };

      // 🔥 userType에 따라 다른 타입 적용
      let userData: TEmpUserData | TCMUserData;

      if (position === "manager") {
        userData = {
          uid: signupData.id,
          name: signupData.name,
          email: formData.email,
          companyCode: signupData.companyCode,
          phoneNumber: signupData.phoneNumber,
          userType: "manager",
        } as TCMUserData;
      } else {
        userData = {
          uid: signupData.id,
          name: signupData.name,
          email: formData.email,
          companyCode: signupData.companyCode,
          phoneNumber: signupData.phoneNumber,
          jobName: "",
          salaryAmount: 0,
          salaryType: "",
          userType: "employee",
          date: undefined,
          workDates: undefined,
        } as TEmpUserData;
      }

      const companyData = await getCompanyInfo(signupData.companyCode);

      await Promise.all([setUser(userData), setCompany(companyData)]);

      navigate(position === "manager" ? "/managerfirst" : "/employeefirst");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldName = error.errors[0].path[0];
        form.setError(fieldName as any, {
          type: "manual",
          message: error.errors[0].message,
        });
      }
      setError(error instanceof Error ? error.message : "An error occurred");
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(null), 3000);
    return () => clearTimeout(timer);
  }, [error]);

  useEffect(() => {
    if (window.innerWidth <= 600 && isManagerCheck) {
      alert(
        "관리자는 PC 전용 서비스 입니다. PC버전으로 회원가입을 진행하셔야 추후에 문제가 발생하지 않습니다. PC로 회원가입 진행 부탁드립니다.",
      );
    }
  }, [isManagerCheck]);

  return {
    loading: isLoading,
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
