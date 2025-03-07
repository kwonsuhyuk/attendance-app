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
  const payCheckDay = watch(`${prefix}payCheckDay`, "1");

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">급여 정산일</CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={payCheckDay} onValueChange={val => setValue(`${prefix}payCheckDay`, val)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="급여 지급일을 선택하세요" defaultValue={payCheckDay} />
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
