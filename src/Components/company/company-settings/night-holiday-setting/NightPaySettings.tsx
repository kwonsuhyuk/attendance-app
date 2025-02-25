import { useFormContext } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";

const NightPaySettings = () => {
  const {
    control,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const isDayNight = watch("companyNightHoliday.isDayNight");
  const nightStart = watch("companyNightHoliday.nightStart");
  const nightEnd = watch("companyNightHoliday.nightEnd");
  const nightPay = watch("companyNightHoliday.nightPay");

  return (
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

          <div className="text-sm text-gray-500">야간 시간 설정</div>
          <div className="flex space-x-3 items-center">
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
  );
};

export default NightPaySettings;
