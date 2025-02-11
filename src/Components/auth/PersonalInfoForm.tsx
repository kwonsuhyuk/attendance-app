import React from "react";
import { UseFormReturn } from "react-hook-form";
import { TSignupFormData } from "@/model";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface IPersonalInfoFormProps {
  form: UseFormReturn<TSignupFormData>;
  password: string;
}

export const PersonalInfoForm = ({ form }: IPersonalInfoFormProps) => {
  return (
    <div className="space-y-4">
      <h4 className="text-black font-medium">개인 정보</h4>

      <FormField
        control={form.control}
        name="name"
        rules={{ required: "이름을 입력해주세요" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>이름</FormLabel>
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
        rules={{
          required: "이메일을 입력해주세요",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "유효한 이메일 주소를 입력해주세요",
          },
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>이메일</FormLabel>
            <FormControl>
              <Input {...field} autoComplete="off" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <p className="text-gray-500 text-sm">
        (유효한 이메일을 작성해주셔야 합니다!) <br />
        (이메일형식예시 : hongildong@naver.com)
      </p>

      <FormField
        control={form.control}
        name="phoneNumber"
        rules={{ required: "전화번호를 입력해주세요" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>전화번호</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="password"
        rules={{
          required: "비밀번호를 입력해주세요",
          minLength: {
            value: 6,
            message: "비밀번호는 6자리 이상이어야 합니다",
          },
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>비밀번호</FormLabel>
            <FormControl>
              <Input type="password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <p className="text-gray-500 text-sm">(비밀번호는 6자리 이상으로 작성해주세요.)</p>

      <FormField
        control={form.control}
        name="confirmPW"
        rules={{
          required: "비밀번호 확인을 입력해주세요",
          validate: value => value === form.watch("password") || "비밀번호가 일치하지 않습니다",
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>비밀번호확인</FormLabel>
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
