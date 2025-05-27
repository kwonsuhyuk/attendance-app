import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useFormContext } from "react-hook-form";

interface IPayCheckDaySelectProps {
  type?: "setting" | "firstpage";
}

const PayCheckDaySelect = ({ type = "firstpage" }: IPayCheckDaySelectProps) => {
  const { setValue, watch } = useFormContext();
  const prefix = type === "firstpage" ? "companyNightHoliday." : "";
  const payCheckDay = watch(`${prefix}payCheckDay`);

  return (
    <Card className="w-full" data-tour="holiday_set-1">
      <CardHeader className="px-0">
        <CardTitle className="text-lg">급여 정산일</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <Select
          value={payCheckDay?.toString()}
          onValueChange={val => setValue(`${prefix}payCheckDay`, val.toString())}
        >
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder="급여 지급일을 선택하세요"
              defaultValue={payCheckDay?.toString()}
            />
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
  );
};

export default PayCheckDaySelect;
