import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  companyBasicSchema,
  companyJobListSchema,
  companyNightHolidaySchema,
} from "@/model/managerFirstSchema";

const formSchema = z.object({
  companyBasic: companyBasicSchema,
  companyJobList: companyJobListSchema,
  companyNightHoliday: companyNightHolidaySchema,
});

export const useCompanySettingForm = () => {
  return useForm({
    resolver: zodResolver(formSchema),
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
        holidays: [],
      },
      companyWorkPlacesList: {
        companyWorkPlaces: [],
      },
    },
  });
};
