import { TextField } from "@mui/material";
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
    <>
      <TextField
        margin="normal"
        required
        fullWidth
        label="이메일"
        autoComplete="off"
        {...register("email", validationRules.email)}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="비밀번호"
        type="password"
        {...register("password", validationRules.password)}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
    </>
  );
};

export default LoginForm;
