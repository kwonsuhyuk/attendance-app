import { useState } from "react";
import { IVacationRequest } from "@/components/company/table/VacationColumns";
import { setData } from "@/api";
import { useUserStore } from "@/store/user.store";
import { v4 as uuid } from "uuid";

export const useMyVacation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const companyCode = useUserStore(state => state.currentUser?.companyCode);

  const toggleModal = () => setIsModalOpen(prev => !prev);

  const handleRequest = async (newRequest: IVacationRequest) => {
    if (!companyCode) return;

    const dataWithStatus = {
      ...newRequest,
      status: "대기중",
      createdAt: Date.now(),
    };

    const id = uuid();
    await setData(`vacation/requests/${companyCode}/${id}`, dataWithStatus);
  };

  return {
    isModalOpen,
    toggleModal,
    handleRequest,
  };
};
