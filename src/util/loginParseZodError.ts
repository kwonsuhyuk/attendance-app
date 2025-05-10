import { ZodError } from "zod";

export function loginParseZodError(error: ZodError) {
  const field = error.errors[0]?.path[0];
  if (field === "email") return "이메일 형식이 올바르지 않습니다";
  if (field === "password") return "비밀번호는 6자 이상이어야 합니다";
  return "입력값을 확인해주세요.";
}
