import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../use-toast";
import { useShallow } from "zustand/shallow";
import { useUserStore } from "@/store/user.store";
import { TEmploymentType } from "@/model/types/position.type";
import { setEmployeeUser } from "@/api/auth.api";

export const useSettingEmployee = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectJob, setSelectJob] = useState<string | undefined>();
  const [employmentType, setEmploymentType] = useState<TEmploymentType | undefined>();
  const navigate = useNavigate();
  const { companyCode, userId, name, email, phoneNumber } = useUserStore(
    useShallow(state => ({
      companyCode: state.currentUser?.companyCode,
      userId: state.currentUser?.uid,
      name: state.currentUser?.name,
      email: state.currentUser?.email,
      phoneNumber: state.currentUser?.phoneNumber,
    })),
  );
  const handleGoMain = async () => {
    if (!selectJob) {
      toast({
        description: "직무를 선택해주세요.",
        variant: "destructive",
      });
      return;
    }

    if (!employmentType) {
      toast({
        description: "고용 형태를 선택해주세요.",
        variant: "destructive",
      });
      return;
    }

    if (!name || !userId || !email || !phoneNumber || !companyCode) {
      toast({
        description: "고용 형태를 선택해주세요.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      await setEmployeeUser({
        name,
        uid: userId,
        email,
        phoneNumber,
        companyCode,
        jobName: selectJob,
        employmentType,
        userType: "employee",
      });
      setLoading(false);
      navigate(`/${companyCode}/appguide`);
    } catch (e: any) {
      setLoading(false);
      toast({
        description: "가입 도중 에러가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  return {
    handleGoMain,
    loading,
    name,
    email,
    phoneNumber,
    selectJob,
    setSelectJob,
    employmentType,
    setEmploymentType,
  };
};
