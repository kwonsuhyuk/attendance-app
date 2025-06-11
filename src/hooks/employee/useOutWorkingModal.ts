import { createOutworkRequest } from "@/api/commute.api";
import { useUserStore } from "@/store/user.store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useShallow } from "zustand/shallow";
import { useToast } from "../use-toast";
import { TCommuteStatus, TOutworkRequest } from "@/model/types/commute.type";
import { TEmpUserData } from "@/model/types/user.type";

export default function useOutWorkingModal() {
  const { companyCode, userId, currentUser } = useUserStore(
    useShallow(state => ({
      companyCode: state.currentUser?.companyCode,
      userId: state.currentUser?.uid,
      currentUser: state.currentUser,
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
    scanTime: string,
    status: TCommuteStatus,
  ) => {
    if (!companyCode || !userId) return;

    const data: TOutworkRequest = {
      outworkingMemo: memo,
      requestTime: scanTime,
      isCheckout: isCheckout,
      requester: currentUser as TEmpUserData,
      status: status,
    };
    const result = await createOutworkRequest(companyCode, data);
    if (result.success) {
      setOpen(false);
      toast({ title: "외근이 성공적으로 요청 되었습니다." });
      navigate(`/${companyCode}/employee/companymain`);
    } else {
      toast({ title: "외근이 요청이 실패하였습니다. 다시 시도해주세요.", variant: "destructive" });
    }
  };

  return { open, setOpen, today, submitOutJob };
}
