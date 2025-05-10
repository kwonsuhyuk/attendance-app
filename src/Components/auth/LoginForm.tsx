import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/auth/useLogin";
import { useRef } from "react";
import { Alert, AlertDescription } from "../ui/alert";
import AuthTestLoginBtn from "./AuthTestLoginBtn";
import AuthFooter from "./AuthFooter";

const LoginForm = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { error, isLoading, handleSubmit, handleGuestLogin } = useLogin({ emailRef, passwordRef });
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
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
        </div>
      </div>
      {error && (
        <Alert variant="destructive" className="mt-0 py-0">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <AuthTestLoginBtn handleGuestLogin={handleGuestLogin} loading={isLoading} />
      <AuthFooter
        buttonText="로그인"
        linkText="계정이 없나요? 회원가입으로 이동"
        linkTo="/signup"
        loading={isLoading}
      />
    </form>
  );
};

export default LoginForm;
