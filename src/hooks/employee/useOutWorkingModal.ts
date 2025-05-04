import { registerOutWork } from "@/api/commute.api";
import { useUserStore } from "@/store/user.store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useShallow } from "zustand/shallow";
import { useToast } from "../use-toast";
import { TCommuteStatus } from "@/model/types/commute.type";

export default function useOutWorkingModal() {
  const { companyCode, userId } = useUserStore(
    useShallow(state => ({
      companyCode: state.currentUser?.companyCode,
      userId: state.currentUser?.uid,
    })),
  );
  const { toast } = useToast();
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const today = `${new Date().getFullYear()}년 ${
    new Date().getMonth() + 1
  }월 ${new Date().getDate()}일`;

  const submitOutJob = async (
    memo: string,
    isCheckout: boolean,
    status?: TCommuteStatus,
    scanTime?: string,
  ) => {
    if (!companyCode || !userId) return;
    const result = await registerOutWork(companyCode, userId, memo, isCheckout, status, scanTime);
    if (result.success) {
      setOpen(false);
      toast({ title: "외근이 성공적으로 등록되었습니다." });
      navigate(`/${companyCode}/companymain`);
    } else {
      toast({ title: "외근이 성공적으로 등록되었습니다.", variant: "destructive" });
    }
  };

  return { open, setOpen, today, submitOutJob };
}
