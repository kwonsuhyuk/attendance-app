import { useToast } from "@/hooks/use-toast";
import { useCompanyStore } from "@/store/company.store";
import { useCompanyWorkPlacesListForm } from "./useCompanyWorkPlacesListForm";
import { updateCompanyWorkPlacesList } from "@/api/company.api";

export const useWorkplacePage = () => {
  const companyCode = useCompanyStore(state => state.currentCompany?.companyCode);
  const companyWorkPlacesListForm = useCompanyWorkPlacesListForm();
  const { handleSubmit } = companyWorkPlacesListForm;
  const { toast } = useToast();

  const onInvalid = () => {
    toast({
      title: "회사 기본 정보에 실패 했습니다.",
      variant: "destructive",
    });
  };

  const onSubmit = async (data: any) => {
    if (!companyCode) {
      toast({
        title: "회사 정보가 없습니다.",
        variant: "destructive",
      });
      return;
    }
    const response = await updateCompanyWorkPlacesList(companyCode, data.companyWorkPlaces);
    if (response.success) {
      toast({
        title: response.message,
      });
    } else {
      console.error("❌ Firebase 업데이트 오류:", response.error);
      toast({
        title: response.error,
        variant: "destructive",
      });
    }
  };

  return {
    companyWorkPlacesListForm,
    handleSubmit,
    onInvalid,
    onSubmit,
  };
};
