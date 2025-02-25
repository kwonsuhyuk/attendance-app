import PayCheckDaySelect from "./PayCheckDaySelect";
import NightPaySettings from "./NightPaySettings";
import HolidaySettings from "./HolidaySettings";
import { Separator } from "@/components/ui/separator";
import CompanySettingTitle from "../CompanySettingTitle";

const CompanyNightHolidayStep = () => {
  return (
    <div className="flex flex-col items-center space-y-6 w-full max-w-md">
      <CompanySettingTitle
        title="급여 정산일 및 야간/공휴일 설정"
        description={
          <>
            급여 정산일 및 야간/공휴일 급여 구분 여부를 설정하세요. <br />
            필요 시 이후에도 변경 가능합니다.
          </>
        }
      />
      <PayCheckDaySelect />
      <NightPaySettings />
      <Separator />
      <HolidaySettings />
    </div>
  );
};

export default CompanyNightHolidayStep;
