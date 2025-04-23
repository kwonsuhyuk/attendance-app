// hooks/employee/useCommuteModal.ts
import { useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { processCommute } from "@/api/commute.api";
import { TCommuteStatus } from "@/model/types/commute.type";
import { TWorkPlace } from "@/model/types/company.type";

interface UseCommuteModalProps {
  userLocation: { lat: number; lng: number } | null;
  selectedPlace: TWorkPlace | undefined;
  userId: string | undefined;
  status: TCommuteStatus | undefined;
}

export const useCommuteModal = ({
  userLocation,
  selectedPlace,
  userId,
  status,
}: UseCommuteModalProps) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { companyCode } = useParams();

  const handleCommuteModal = useCallback(() => {
    if (!selectedPlace) return;
    setIsConfirmOpen(true);
  }, [selectedPlace]);

  const handleConfirmCommute = useCallback(async () => {
    if (!selectedPlace || !userLocation || !companyCode || !userId || !status) return;
    const scanTime = new Date().toISOString();
    const res = await processCommute(status, companyCode, userId, scanTime, selectedPlace.id);
    setIsConfirmOpen(false);
    if (res.success) {
      toast({
        title: `${status === "checked-in-only" ? "퇴근" : "출근"}이 성공적으로 완료되었습니다.`,
      });
      navigate(`/${companyCode}/companyMain`);
    } else {
      toast({ title: res.error || "처리 중 오류가 발생했습니다.", variant: "destructive" });
    }
  }, [selectedPlace, userLocation, companyCode, userId, status, toast, navigate]);

  return {
    isConfirmOpen,
    setIsConfirmOpen,
    handleCommuteModal,
    handleConfirmCommute,
  };
};
