import { Input } from "@/components/ui/input";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { TLoginForm } from "@/model";

interface ILoginFormProps {
  register: UseFormRegister<TLoginForm>;
  errors: FieldErrors<TLoginForm>;
}

const LoginForm = ({ register, errors }: ILoginFormProps) => {
  return (
    <div className="space-y-4 mr-6">
      <div className="space-y-2">
        <Input
          id="email"
          type="email"
          placeholder="이메일을 입력하세요"
          {...register("email")}
          aria-describedby="email-error"
          className="px-3"
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
          {...register("password")}
          aria-describedby="password-error"
          className="px-3"
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
