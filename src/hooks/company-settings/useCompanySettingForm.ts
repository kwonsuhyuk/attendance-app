import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { companyFormSchema } from "@/model/schema/managerFirstSchema/managerFirst.schema";

export const useCompanySettingForm = () => {
  return useForm({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      companyBasic: {
        companyName: "",
        adminName: "",
        companyIntro: "",
        imageUrl: "",
      },
      companyJobList: {
        companyJobs: [],
      },
      companyNightHoliday: {
        payCheckDay: "",
        isDayNight: false,
        nightStart: "",
        nightEnd: "",
        nightPay: 1,
        isHoliday: false,
        holidayPay: 1,
        holidayList: [],
      },
      companyWorkPlacesList: {
        companyWorkPlaces: [],
      },
    },
  });
};
