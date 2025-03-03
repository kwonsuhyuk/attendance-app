import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { companyNightHolidaySchema } from "@/model/schema/managerFirstSchema/managerFirst.schema";

export const useCompanyNightHolidayForm = () => {
  return useForm({
    resolver: zodResolver(companyNightHolidaySchema),
    defaultValues: {
      payCheckDay: "",
      isDayNight: false,
      nightStart: "",
      nightEnd: "",
      nightPay: 1,
      isHoliday: false,
      holidayPay: 1,
      holidays: [],
    },
  });
};
