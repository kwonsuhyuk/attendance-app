import React from "react";
import { UseFormReturn } from "react-hook-form";
import { TSignupFormData } from "@/model/types/authTypes/signup.type";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface IPersonalInfoFormProps {
  form: UseFormReturn<TSignupFormData>;
  password: string;
}

export const PersonalInfoForm = ({ form }: IPersonalInfoFormProps) => {
  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/[^\d]/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-black">개인 정보</h4>

      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700">이름</FormLabel>
            <FormControl>
              <Input {...field} autoComplete="off" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700">이메일</FormLabel>
            <FormControl>
              <Input
                {...field}
                autoComplete="off"
                type="email"
                placeholder="예) hongildong@naver.com"
              />
            </FormControl>
            <p className="text-xs">※유효한 이메일을 입력하세요.</p>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phoneNumber"
        render={({ field: { onChange, ...field } }) => (
          <FormItem>
            <FormLabel className="text-gray-700">전화번호</FormLabel>
            <FormControl>
              <Input
                {...field}
                onChange={e => {
                  const formatted = formatPhoneNumber(e.target.value);
                  onChange(formatted);
                }}
                placeholder="'-'제외하고 숫자만 입력하세요."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700">비밀번호</FormLabel>
            <FormControl>
              <Input type="password" {...field} placeholder="6자리 이상 작성해주세요." />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="confirmPW"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700">비밀번호확인</FormLabel>
            <FormControl>
              <Input type="password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PersonalInfoForm;
