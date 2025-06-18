import { Input } from "@/components/ui/input";
import { RefObject } from "react";

interface ILoginFormProps {
  emailRef: RefObject<HTMLInputElement>;
  passwordRef: RefObject<HTMLInputElement>;
}

const LoginForm = ({ emailRef, passwordRef }: ILoginFormProps) => {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <Input
          id="email"
          type="email"
          placeholder="이메일을 입력하세요"
          ref={emailRef}
          aria-describedby="email-error"
          className="px-3"
        />
      </div>

      <div className="space-y-2">
        <Input
          id="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          ref={passwordRef}
          aria-describedby="password-error"
          className="px-3"
        />
        <p className="text-xs">※ 비밀번호 분실 시 관리자에게 문의하세요.</p>
      </div>
    </div>
  );
};

export default LoginForm;
