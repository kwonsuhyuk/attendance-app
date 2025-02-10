import React from "react";
import { TextField, Typography } from "@mui/material";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { TSignupFormData } from "@/model";

interface IPersonalInfoFormProps {
  control: Control<TSignupFormData>;
  errors: FieldErrors<TSignupFormData>;
  password: string;
}

export const PersonalInfoForm = ({ control, errors, password }: IPersonalInfoFormProps) => {
  return (
    <>
      <Typography component="p" color="black" sx={{ mt: 2 }}>
        개인 정보
      </Typography>

      <Controller
        name="name"
        control={control}
        rules={{ required: "이름을 입력해주세요" }}
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            required
            fullWidth
            label="이름"
            error={!!errors.name}
            helperText={errors.name?.message}
            autoComplete="off"
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        rules={{
          required: "이메일을 입력해주세요",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "유효한 이메일 주소를 입력해주세요",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            required
            fullWidth
            label="이메일"
            error={!!errors.email}
            helperText={errors.email?.message}
            autoComplete="off"
          />
        )}
      />

      <Typography component="p" color="gray" sx={{ fontSize: "12px" }}>
        (유효한 이메일을 작성해주셔야 합니다!) <br />
        (이메일형식예시 : hongildong@naver.com)
      </Typography>

      <Controller
        name="phoneNumber"
        control={control}
        rules={{ required: "전화번호를 입력해주세요" }}
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            required
            fullWidth
            label="전화번호"
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={{
          required: "비밀번호를 입력해주세요",
          minLength: {
            value: 6,
            message: "비밀번호는 6자리 이상이어야 합니다",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            required
            fullWidth
            label="비밀번호"
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        )}
      />

      <Typography component="p" color="gray" sx={{ fontSize: "12px" }}>
        (비밀번호는 6자리 이상으로 작성해주세요.)
      </Typography>

      <Controller
        name="confirmPW"
        control={control}
        rules={{
          required: "비밀번호 확인을 입력해주세요",
          validate: value => value === password || "비밀번호가 일치하지 않습니다",
        }}
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            required
            fullWidth
            label="비밀번호확인"
            type="password"
            error={!!errors.confirmPW}
            helperText={errors.confirmPW?.message}
          />
        )}
      />
    </>
  );
};
