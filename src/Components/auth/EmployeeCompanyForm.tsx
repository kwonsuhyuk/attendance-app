import { Typography, TextField, Button } from "@mui/material";
import { Controller } from "react-hook-form";
import { TEmployeeCompanyFormProps } from "@/model";

export const EmployeeCompanyForm = ({
  control,
  errors,
  isCodeValid,
  tempCompInfo,
  companyCode,
  checkCompanyCode,
}: TEmployeeCompanyFormProps) => {
  return (
    <>
      <Typography component="p" color="black" sx={{ mt: 2 }}>
        가입 회사 정보
      </Typography>
      <div className="flex flex-col items-stretch mb-2">
        {!isCodeValid ? (
          <Controller
            name="companyCode"
            control={control}
            rules={{
              required: "회사코드를 입력해주세요",
              validate: value => (!isCodeValid ? "회사코드 인증버튼을 눌러주세요" : true),
            }}
            render={({ field }) => (
              <TextField
                {...field}
                className="w-full flex-grow"
                margin="normal"
                required
                label="회사코드"
                autoComplete="off"
                error={!!errors.companyCode}
                helperText={errors.companyCode?.message}
                disabled={isCodeValid}
              />
            )}
          />
        ) : (
          <TextField
            className="w-full flex-grow"
            margin="normal"
            autoComplete="off"
            disabled={isCodeValid}
            value={tempCompInfo}
          />
        )}
        <Button className="w-full flex-grow" onClick={() => checkCompanyCode(companyCode || "")}>
          회사찾기
        </Button>
      </div>
      <Typography component="p" color="gray" sx={{ fontSize: "12px", mb: 2 }}>
        (회사 관리자에게 받은 회사코드를 입력해주세요.)
      </Typography>
    </>
  );
};
