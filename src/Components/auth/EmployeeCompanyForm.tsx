import { UseFormReturn } from "react-hook-form";
import { TSignupFormData } from "@/model/types/authTypes/signup.type";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface IEmployeeCompanyFormProps {
  form: UseFormReturn<TSignupFormData>;
  isCodeValid: boolean;
  tempCompInfo: string;
  companyCode: string | undefined;
  checkCompanyCode: (code: string) => Promise<void>;
}

export const EmployeeCompanyForm = ({
  form,
  isCodeValid,
  tempCompInfo,
  companyCode,
  checkCompanyCode,
}: IEmployeeCompanyFormProps) => {
  return (
    <div className="space-y-4">
      <h4 className="font-medium text-black">가입 회사 정보</h4>

      <div className="space-y-4">
        {!isCodeValid ? (
          <FormField
            control={form.control}
            name="companyCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">회사코드</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    autoComplete="off"
                    disabled={isCodeValid}
                    placeholder="회사 관리자에게 받은 회사코드를 입력해주세요."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <FormItem>
            <FormLabel>회사정보</FormLabel>
            <FormControl>
              <Input disabled value={tempCompInfo} className="bg-gray-100" />
            </FormControl>
          </FormItem>
        )}

        <Button
          type="button"
          variant="secondary"
          className="w-full"
          onClick={() => checkCompanyCode(companyCode || "")}
          disabled={isCodeValid}
        >
          회사찾기
        </Button>
        <p className="text-xs">※ 올바른 회사코드 입력 후 버튼을 누르면 적용됩니다.</p>
      </div>
    </div>
  );
};

export default EmployeeCompanyForm;
