import { z } from "zod";
import { loginFormSchema } from "./login.schema";

// 기본 회원가입 정보 스키마
const signupUserBaseSchema = z.object({
  name: z
    .string()
    .min(2, { message: "이름은 2자 이상이어야 합니다." })
    .regex(/^[가-힣a-zA-Z\s]+$/, { message: "올바른 이름 형식이 아닙니다" }),
  companyCode: z.string().min(5, { message: "올바른 회사 코드를 입력해주세요" }),
  phoneNumber: z.string().regex(/^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/, {
    message: "올바른 전화번호 형식이 아닙니다 (예: 010-1234-5678)",
  }),
});

export const signupFormSchema = loginFormSchema
  .merge(
    z.object({
      name: z.string().min(2, { message: "이름은 2자 이상이어야 합니다." }),
      phoneNumber: z.string().regex(/^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/, {
        message: "올바른 전화번호 형식이 아닙니다 (예: 010-1234-5678)",
      }),
      position: z.enum(["manager", "employee"]).default("employee"),
      companyCode: z.string().optional(), // 기본적으로 선택 사항
    }),
  )
  .extend({
    confirmPW: z.string().min(1, { message: "비밀번호 확인을 입력해주세요" }),
  })
  .refine(data => data.password === data.confirmPW, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPW"],
  })
  .superRefine((data, ctx) => {
    // position이 "employee"일 때만 companyCode 필수 체크
    if (data.position === "employee" && (!data.companyCode || data.companyCode.trim() === "")) {
      ctx.addIssue({
        path: ["companyCode"],
        code: z.ZodIssueCode.custom,
        message: "직원은 회사 코드를 입력해야 합니다.",
      });
    }
  });

// 회원가입 데이터 스키마 (id 포함)
export const signupUserDataSchema = signupUserBaseSchema.extend({
  id: z.string(),
});
