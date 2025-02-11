import { Input } from "@/components/ui/input";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { TLoginForm } from "@/model";

interface ILoginFormProps {
  register: UseFormRegister<TLoginForm>;
  errors: FieldErrors<TLoginForm>;
}

const LoginForm = ({ register, errors }: ILoginFormProps) => {
  // 폼 검증 규칙
  const validationRules = {
    email: {
      required: "이메일을 입력해주세요",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "올바른 이메일 형식이 아닙니다",
      },
    },
    password: {
      required: "비밀번호를 입력해주세요",
      minLength: {
        value: 6,
        message: "비밀번호는 최소 6자 이상이어야 합니다",
      },
    },
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Input
          id="email"
          type="email"
          placeholder="이메일을 입력하세요"
          {...register("email", validationRules.email)}
          aria-describedby="email-error"
        />
        {errors.email && (
          <p className="text-sm text-destructive" id="email-error">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Input
          id="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          {...register("password", validationRules.password)}
          aria-describedby="password-error"
        />
        {errors.password && (
          <p className="text-sm text-destructive" id="password-error">
            {errors.password.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
