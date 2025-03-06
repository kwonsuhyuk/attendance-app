import { useCompanyStore } from "@/store/company.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useShallow } from "zustand/shallow";

export const useCompanyWorkPlacesListForm = () => {
  const { workPlacesList } = useCompanyStore(
    useShallow(state => ({
      workPlacesList: state.currentCompany?.workPlacesList,
    })),
  );

  const formMethods = useForm({
    // resolver: zodResolver(companyWorkPlacesListSche),
    mode: "onChange",
    defaultValues: {
      companyWorkPlaces: workPlacesList,
    },
  });
  return formMethods;
};
