import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Separator } from "../ui/separator";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";

const CompanyNightHolidayStep = () => {
  const {
    control,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const isDayNight = watch("companyNightHoliday.isDayNight");
  const nightStart = watch("companyNightHoliday.nightStart");
  const nightEnd = watch("companyNightHoliday.nightEnd");
  const nightPay = watch("companyNightHoliday.nightPay");
  const isHoliday = watch("companyNightHoliday.isHoliday");
  const holidayPay = watch("companyNightHoliday.holidayPay");
  const holidays: string[] = watch("companyNightHoliday.holidays") || [];
  const payCheckDay = watch("companyNightHoliday.payCheckDay");

  // ✅ 모달 상태 관리
  const [date, setDate] = useState<Date | undefined>();

  // ✅ 날짜 추가 핸들러
  const handleAddHoliday = () => {
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd");
      if (!holidays.includes(formattedDate)) {
        setValue("companyNightHoliday.holidays", [...holidays, formattedDate]);
      }
      setDate(undefined); // 날짜 초기화
    }
  };

  // ✅ 선택한 공휴일 삭제 핸들러
  const handleRemoveHoliday = (holiday: string) => {
    setValue(
      "companyNightHoliday.holidays",
      holidays.filter(h => h !== holiday),
    );
  };
  console.log(errors);

  return (
    <div className="flex flex-col items-center space-y-6 w-full max-w-md">
      <h2 className="text-xl font-semibold text-gray-800">급여 정산일 및 야간/공휴일 설정</h2>
      <p className="text-sm text-gray-600 text-center">
        급여 정산일 및 야간/공휴일 급여 구분 여부를 설정하세요. 필요 시 이후에도 변경 가능합니다.
      </p>

      {/* ✅ 급여 지급일 설정 */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">급여 지급일</CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={payCheckDay}
            onValueChange={val => setValue("companyNightHoliday.payCheckDay", val)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="급여 지급일을 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              {[...Array(31)].map((_, i) => (
                <SelectItem key={i + 1} value={String(i + 1)}>
                  {i + 1}일
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* ✅ 주간/야간 근무 설정 */}
      <Card className="w-full">
        <CardHeader className="flex flex-col items-start space-y-2">
          <div className="flex justify-between items-center w-full">
            <CardTitle className="text-lg">주간/야간 급여 구분</CardTitle>
            <Switch
              {...register("companyNightHoliday.isDayNight")}
              checked={isDayNight}
              onCheckedChange={value => setValue("companyNightHoliday.isDayNight", value)}
            />
          </div>
        </CardHeader>
        {isDayNight && (
          <CardContent className="space-y-4">
            {/* ✅ 야간 급여 배율 */}
            <div className="text-sm text-gray-500">야간 급여 배율</div>
            <div className="flex items-center space-x-4">
              <Slider
                defaultValue={[1]}
                min={1}
                max={3}
                step={0.1}
                value={[nightPay]}
                onValueChange={val => setValue("companyNightHoliday.nightPay", val[0])}
              />
              <Input
                type="number"
                value={nightPay?.toFixed(1)}
                onChange={e => setValue("companyNightHoliday.nightPay", Number(e.target.value))}
                min={1}
                max={3}
                step={0.1}
                className="w-16 text-center"
              />
            </div>

            {/* ✅ 야간 시간 설정 */}
            <div className="text-sm text-gray-500">야간 시간 설정</div>

            <div className="flex space-x-3 items-center">
              {/* ✅ 시작 시간 필드 */}
              <FormField
                name="companyNightHoliday.nightStart"
                control={control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Select
                        value={nightStart}
                        onValueChange={val => setValue("companyNightHoliday.nightStart", val)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="시작 시간" />
                        </SelectTrigger>
                        <SelectContent>
                          {[...Array(24)].map((_, i) => (
                            <SelectItem key={i} value={String(i)}>
                              {i}시
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <span className="text-gray-500">~</span>

              {/* ✅ 종료 시간 필드 */}
              <FormField
                name="companyNightHoliday.nightEnd"
                control={control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Select
                        value={nightEnd}
                        onValueChange={val => setValue("companyNightHoliday.nightEnd", val)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="끝나는 시간" />
                        </SelectTrigger>
                        <SelectContent>
                          {[...Array(24)].map((_, i) => (
                            <SelectItem key={i} value={String(i)}>
                              {i}시
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            {errors.companyNightHoliday && (
              <FormMessage>야간 근무에 적용할 시간을 선택해주세요</FormMessage>
            )}
          </CardContent>
        )}
      </Card>

      <Separator />

      {/* ✅ 공휴일 적용 여부 */}
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

            {/* ✅ 회사 지정 공휴일 추가 기능 */}
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

              {/* ✅ 선택된 공휴일 리스트 (깔끔한 UI 적용) */}
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
    </div>
  );
};

export default CompanyNightHolidayStep;
