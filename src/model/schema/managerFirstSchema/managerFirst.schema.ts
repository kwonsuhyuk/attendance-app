import { z } from "zod";

// 유효성 검사 스키마 (Zod)
export const companyBasicSchema = z.object({
  companyName: z.string().min(1, "회사 이름을 입력하세요."),
  adminName: z.string().min(2, "대표자 이름을 입력하세요."),
  companyIntro: z.string().min(5, "회사 소개를 5자 이상 입력하세요."),
  companyLogo: z
    .union([z.string().url("올바른 이미지 URL을 입력하세요."), z.string().max(0)])
    .optional(),
});

export const companyJobListSchema = z.object({
  companyJobs: z
    .array(z.object({ id: z.string(), name: z.string().min(1, "직무 이름을 입력하세요.") }))
    .optional(),
});

export const companyNightHolidaySchema = z
  .object({
    payCheckDay: z.string().optional(),
    isDayNight: z.boolean(),
    nightStart: z.string().optional(),
    nightEnd: z.string().optional(),
    nightPay: z.number().min(1, "최소 1 이상의 값을 입력하세요.").optional(),
    isHoliday: z.boolean(),
    holidayPay: z.number().min(1, "최소 1 이상의 값을 입력하세요."),
    holidayList: z.array(z.string()).optional(),
  })
  .refine(data => (data.isDayNight ? data.nightStart && data.nightEnd : true), {
    message: "야간 근무 설정 시 시작 및 종료 시간을 입력해야 합니다.",
    path: ["nightStart", "nightEnd"],
  });

export const companyFormSchema = z.object({
  companyBasic: companyBasicSchema,
  companyJobList: companyJobListSchema,
  companyNightHoliday: companyNightHolidaySchema,
  companyWorkPlacesList: z.any().optional(),
});
