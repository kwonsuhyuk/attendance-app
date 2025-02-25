import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

const HolidaySettings = () => {
  const { setValue, watch, register } = useFormContext();
  const isHoliday = watch("companyNightHoliday.isHoliday");
  const holidayPay = watch("companyNightHoliday.holidayPay");
  const holidays: string[] = watch("companyNightHoliday.holidays") || [];
  //  모달 상태 관리
  const [date, setDate] = useState<Date | undefined>();

  //  날짜 추가 핸들러
  const handleAddHoliday = () => {
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd");
      if (!holidays.includes(formattedDate)) {
        setValue("companyNightHoliday.holidays", [...holidays, formattedDate]);
      }
      setDate(undefined); // 날짜 초기화
    }
  };

  //  선택한 공휴일 삭제 핸들러
  const handleRemoveHoliday = (holiday: string) => {
    setValue(
      "companyNightHoliday.holidays",
      holidays.filter(h => h !== holiday),
    );
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col items-start space-y-2">
        <div className="flex justify-between items-center w-full">
          <CardTitle className="text-lg">공휴일/주말 추가 급여 적용</CardTitle>
          <Switch
            {...register("companyNightHoliday.isHoliday")}
            checked={isHoliday}
            onCheckedChange={value => setValue("companyNightHoliday.isHoliday", value)}
          />
        </div>
      </CardHeader>
      {isHoliday && (
        <CardContent className="space-y-4">
          <div className="text-sm text-gray-500">공휴일 급여 배율</div>
          <div className="flex items-center space-x-4">
            <Slider
              defaultValue={[1]}
              min={1}
              max={3}
              step={0.1}
              value={[holidayPay]}
              onValueChange={val => setValue("companyNightHoliday.holidayPay", val[0])}
              className="flex"
            />
            <Input
              type="number"
              value={holidayPay?.toFixed(1)}
              onChange={e => setValue("companyNightHoliday.holidayPay", Number(e.target.value))}
              min={1}
              max={3}
              step={0.1}
              className="w-16 text-center"
            />
          </div>

          {/*  회사 지정 공휴일 추가 기능 */}
          <div className="space-y-3">
            <div className="text-sm text-gray-500">회사 지정 공휴일 추가</div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">날짜 선택</Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-3">
                <Calendar mode="single" selected={date} onSelect={setDate} />
                <Button onClick={handleAddHoliday} className="mt-3 w-full">
                  추가
                </Button>
              </PopoverContent>
            </Popover>

            {/*  선택된 공휴일 리스트 (깔끔한 UI 적용) */}
            <div className="flex flex-wrap gap-2">
              {holidays.map((holiday: string, index: number) => (
                <Badge key={index} className="flex items-center space-x-2 px-3 py-1">
                  <span>{holiday}</span>
                  <Button
                    onClick={() => handleRemoveHoliday(holiday)}
                    className="h-auto p-0 bg-transparent hover:bg-transparent hover:border-none"
                  >
                    <X className="w-4 h-4 text-white hover:text-red-300" />
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
