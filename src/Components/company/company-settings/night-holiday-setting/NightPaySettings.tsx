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

interface INightPaySettingsProps {
  type?: "setting" | "firstpage";
}

const NightPaySettings = ({ type = "firstpage" }: INightPaySettingsProps) => {
  const {
    control,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const prefix = type === "firstpage" ? "companyNightHoliday." : "";
  const isDayNight = watch(`${prefix}isDayNight`);
  const nightStart = watch(`${prefix}nightStart`, "1");
  const nightEnd = watch(`${prefix}nightEnd`, "1");
  const nightPay = watch(`${prefix}nightPay`);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col items-start space-y-2">
        <div className="flex w-full items-center justify-between">
          <CardTitle className="text-lg">주간/야간 급여 구분</CardTitle>
          <Switch
            {...register(`${prefix}isDayNight`)}
            checked={isDayNight}
            onCheckedChange={value => setValue(`${prefix}isDayNight`, value)}
          />
        </div>
      </CardHeader>
      {isDayNight && (
        <CardContent className="space-y-4">
          <div className="text-sm text-white-text dark:text-dark-nav-text">야간 급여 배율</div>
          <div className="flex items-center space-x-4">
            <Slider
              defaultValue={[1]}
              min={1}
              max={3}
              step={0.1}
              value={[nightPay]}
              onValueChange={val => setValue(`${prefix}nightPay`, val[0])}
            />
            <Input
              type="number"
              value={nightPay?.toFixed(1)}
              onChange={e => setValue(`${prefix}nightPay`, Number(e.target.value))}
              min={1}
              max={3}
              step={0.1}
              className="w-16 text-center"
            />
          </div>
          <div className="text-sm text-white-text dark:text-dark-nav-text">야간 시간 설정</div>
          <div className="flex items-center space-x-3">
            <FormField
              name={`${prefix}nightStart`}
              control={control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Select
                      value={nightStart}
                      onValueChange={val => setValue(`${prefix}nightStart`, val)}
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
            <span className="text-white-text dark:text-dark-text">~</span>
            <FormField
              name={`${prefix}nightEnd`}
              control={control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Select
                      value={nightEnd}
                      onValueChange={val => setValue(`${prefix}nightEnd`, val)}
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
          {errors[`${prefix}nightStart`] && (
            <FormMessage>야간 근무에 적용할 시간을 선택해주세요</FormMessage>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default NightPaySettings;
