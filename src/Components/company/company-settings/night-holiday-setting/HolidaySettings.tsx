import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Info, X } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import TooltipContainer from "@/components/common/TooltipContainer";
import PopoverHint from "@/components/common/PopoverHint";

interface IHolidaySettingsProps {
  type?: "setting" | "firstpage";
}

const HolidaySettings = ({ type = "firstpage" }: IHolidaySettingsProps) => {
  const { setValue, watch, register } = useFormContext();

  const prefix = type === "firstpage" ? "companyNightHoliday." : "";

  const isHoliday = watch(`${prefix}isHoliday`);
  const holidayPay = watch(`${prefix}holidayPay`);
  const holidays: string[] = watch(`${prefix}holidayList`) || [];

  const [date, setDate] = useState<Date | undefined>();

  const handleAddHoliday = () => {
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd");
      if (!holidays.includes(formattedDate)) {
        setValue(`${prefix}holidayList`, [...holidays, formattedDate]);
      }
      setDate(undefined);
    }
  };

  const handleRemoveHoliday = (holiday: string) => {
    setValue(
      `${prefix}holidayList`,
      holidays.filter(h => h !== holiday),
    );
  };

  return (
    <Card className="w-full" data-tour="holiday_set-3">
      <CardHeader className="flex flex-col items-start space-y-2 px-0">
        <div className="flex w-full items-center justify-between">
          <CardTitle className="flex items-center gap-1 text-lg">
            공휴일/주말 추가 급여 적용
            <PopoverHint
              icon={<Info size={18} />}
              contentText="토, 일 및 회사 지정 공휴일에만 적용됩니다. 국가 지정공휴일은 따로 적용되지 않습니다."
            />
          </CardTitle>
          <Switch
            {...register(`${prefix}isHoliday`)}
            checked={isHoliday}
            onCheckedChange={value => setValue(`${prefix}isHoliday`, value)}
          />
        </div>
      </CardHeader>
      {isHoliday && (
        <CardContent className="space-y-4 px-0">
          <div className="text-sm text-white-text dark:text-dark-nav-text">공휴일 급여 배율</div>
          <div className="flex items-center space-x-4">
            <Slider
              defaultValue={[1]}
              min={1}
              max={3}
              step={0.1}
              value={[holidayPay]}
              onValueChange={val => setValue(`${prefix}holidayPay`, val[0])}
              className="flex"
            />
            <Input
              type="number"
              value={holidayPay?.toFixed(1)}
              onChange={e => setValue(`${prefix}holidayPay`, Number(e.target.value))}
              min={1}
              max={3}
              step={0.1}
              className="w-16 text-center"
            />
          </div>
          <div className="space-y-3">
            <div className="text-sm text-white-text dark:text-dark-nav-text">
              회사 지정 공휴일 추가
            </div>

            <Popover>
              <PopoverTrigger asChild data-tour="holiday_set-4">
                <Button variant="outline">날짜 선택</Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-3">
                <Calendar mode="single" selected={date} onSelect={setDate} />
                <Button onClick={handleAddHoliday} className="mt-3 w-full">
                  추가
                </Button>
              </PopoverContent>
            </Popover>
            <div className="flex flex-wrap gap-2">
              {holidays.map((holiday: string, index: number) => (
                <Badge
                  key={index}
                  className="text-point-color-sub flex items-center gap-1 bg-point-color px-3 py-1"
                >
                  <span className="text-sm leading-tight">{holiday}</span>
                  <Button
                    type="button"
                    onClick={() => handleRemoveHoliday(holiday)}
                    className="h-4 w-4 bg-transparent p-0 pb-1 hover:text-red-400"
                  >
                    <X className="h-4 w-4 text-white dark:text-dark-bg" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default HolidaySettings;
