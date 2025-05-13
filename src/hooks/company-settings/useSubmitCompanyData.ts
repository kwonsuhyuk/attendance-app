import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/user.store";
import { useToast } from "@/hooks/use-toast";
import { useShallow } from "zustand/shallow";
import { z } from "zod";
import { companyFormSchema } from "@/model/schema/managerFirstSchema/managerFirst.schema";
import { setCompanyAndManagerData } from "@/api/auth.api";

export const useSubmitCompanyData = (getValues: () => z.infer<typeof companyFormSchema>) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { companyCode, userId, name, email, phoneNumber } = useUserStore(
    useShallow(state => ({
      companyCode: state.currentUser?.companyCode,
      userId: state.currentUser?.uid,
      email: state.currentUser?.email,
      name: state.currentUser?.name,
      phoneNumber: state.currentUser?.phoneNumber,
    })),
  );

  const submitCompanyData = async () => {
    setLoading(true);
    if (!userId || !companyCode || !name || !email) {
      toast({
        description: "사용자 인증이 필요합니다.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const formData = getValues();
    const response = await setCompanyAndManagerData({
      formData,
      userId,
      companyCode,
      name,
      email,
      phoneNumber,
    });

    if (response.success) {
      toast({
        description: "회사 설정이 완료되었습니다.",
      });
      navigate(`/${companyCode}/manager/companymain`);
    } else {
      toast({
        description: "회사 설정 저장에 실패했습니다.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return { submitCompanyData, loading };
};
