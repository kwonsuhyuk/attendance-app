import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { companyNightHolidaySchema } from "@/model/schema/managerFirstSchema/managerFirst.schema";
import { useCompanyStore } from "@/store/company.store";
import { useShallow } from "zustand/shallow";

export const useCompanyNightHolidayForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    payCheckDay,
    isDayNight,
    nightStart,
    nightEnd,
    isNightPay,
    isHoliday,
    holidayPay,
    holidayList,
  } = useCompanyStore(
    useShallow(state => ({
      payCheckDay: state.currentCompany?.payCheckDay,
      isDayNight: state.currentCompany?.isDayNight,
      nightStart: state.currentCompany?.nightStart,
      nightEnd: state.currentCompany?.nightEnd,
      isNightPay: state.currentCompany?.isNightPay,
      isHoliday: state.currentCompany?.isHoliday,
      holidayPay: state.currentCompany?.holidayPay,
      holidayList: state.currentCompany?.holidayList,
    })),
  );

  // useEffect(() => {
  //   setLoading(true);
  //   if (
  //     payCheckDay ||
  //     isDayNight ||
  //     nightStart ||
  //     nightEnd ||
  //     isNightPay ||
  //     isHoliday ||
  //     holidayPay ||
  //     holidayList
  //   ) {
  //     setLoading(false);
  //   }
  // }, []);

  const formMethods = useForm({
    resolver: zodResolver(companyNightHolidaySchema),
    mode: "onChange",
    defaultValues: {
      payCheckDay,
      isDayNight,
      nightStart,
      nightEnd,
      nightPay: isNightPay,
      isHoliday,
      holidayPay,
      holidayList: holidayList,
    },
  });

  return { formMethods, loading };
};
