import { registerOutWork } from "@/api/commute.api";
import { useUserStore } from "@/store/user.store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useShallow } from "zustand/shallow";

export default function useOutWorkingModal() {
  const { companyCode, userId } = useUserStore(
    useShallow(state => ({
      companyCode: state.currentUser?.companyCode,
      userId: state.currentUser?.uid,
    })),
  );

  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const today = `${new Date().getFullYear()}년 ${
    new Date().getMonth() + 1
  }월 ${new Date().getDate()}일`;

  const submitOutJob = async (isCheckout: boolean = false) => {
    if (!companyCode || !userId) return;

    const result = await registerOutWork(companyCode, userId, isCheckout);
    if (result.success) {
      setOpen(false);
      toast.success(result.message);
      navigate(`/${companyCode}/companymain`);
    } else {
      toast.error(result.error);
    }
  };

  return { open, setOpen, today, submitOutJob };
}
