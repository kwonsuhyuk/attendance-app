import { useForm } from "react-hook-form";

export const useCompanyWorkPlacesListForm = () => {
  return useForm({
    // resolver: zodResolver(companyWorkPlacesListSche),
    defaultValues: {
      companyWorkPlaces: [],
    },
  });
};
