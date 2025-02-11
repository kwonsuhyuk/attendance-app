import { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Alert, Container, Divider } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { useForm } from "react-hook-form";

import { TSignupUserData, TSignupFormData, TPosition } from "@/model";
import { validateCompanyCode } from "../api/index";
import { signup } from "../api/auth";

import AuthHeader from "@/components/auth/AuthHeader";
import AuthFooter from "@/components/auth/AuthFooter";
import { PositionSelector } from "@/components/auth/PositionSelector";
import { ManagerConfirmation } from "@/components/auth/ManagerConfirmation";
import { EmployeeCompanyForm } from "@/components/auth/EmployeeCompanyForm";
import { PersonalInfoForm } from "@/components/auth/PersonalInfoForm";

const SignupPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [position, setPosition] = useState<TPosition>("");
  const [isManagerCheck, setManagerCheck] = useState<boolean>(false);
  const [isCodeValid, setIsCodeValid] = useState<boolean>(false);
  const [tempCompInfo, setTempCompInfo] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TSignupFormData>({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPW: "",
      companyCode: "",
    },
  });

  const password = watch("password");
  const companyCode = watch("companyCode");

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(""), 3000);
    return () => clearTimeout(timer);
  }, [error]);

  const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPosition(e.target.value as TPosition);
  };

  const checkCompanyCode = async (code: string) => {
    const result = await validateCompanyCode(code);
    if (result.isValid && result.companyName) {
      setTempCompInfo(result.companyName);
      setIsCodeValid(true);
    } else {
      setError(result.error || "회사 코드 확인 중 오류가 발생했습니다.");
      setIsCodeValid(false);
    }
  };

  const sendUserInfo = useCallback(
    async (formData: TSignupFormData) => {
      setLoading(true);
      try {
        const result = await signup({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          companyCode: formData.companyCode,
          phoneNumber: formData.phoneNumber,
        });

        if (!result.success || !result.data) {
          throw new Error(result.error);
        }

        const userData: TSignupUserData = {
          id: result.data.userId,
          name: formData.name,
          companyCode: formData.companyCode,
          phoneNumber: formData.phoneNumber,
        };

        dispatch(setUser(userData));

        navigate(position === "manager" ? "/managerfirst" : "/employeefirst", {
          state: userData,
        });
      } catch (e) {
        console.error("Detailed error:", e);
        setError(e instanceof Error ? e.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    },
    [dispatch, position, navigate],
  );

  const onSubmit = (data: TSignupFormData) => {
    sendUserInfo(data);
  };

  useEffect(() => {
    if (window.innerWidth <= 600 && isManagerCheck) {
      alert(
        "관리자는 PC 전용 서비스 입니다. PC버전으로 회원가입을 진행하셔야 추후에 문제가 발생하지 않습니다. PC로 회원가입 진행 부탁드립니다.",
      );
    }
  }, [isManagerCheck]);

  return (
    <div className="mt-10">
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AuthHeader icon={LockOpenIcon} title="회원가입" />

          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <PositionSelector position={position} onPositionChange={handlePositionChange} />

            {position === "manager" && (
              <ManagerConfirmation
                isManagerCheck={isManagerCheck}
                setManagerCheck={setManagerCheck}
              />
            )}

            {position === "employee" && (
              <EmployeeCompanyForm
                control={control}
                errors={errors}
                isCodeValid={isCodeValid}
                tempCompInfo={tempCompInfo}
                companyCode={companyCode}
                checkCompanyCode={checkCompanyCode}
              />
            )}

            <Divider />

            <PersonalInfoForm control={control} errors={errors} password={password} />

            {error && (
              <Alert sx={{ mt: 3 }} severity="error">
                {error}
              </Alert>
            )}

            <Divider />

            <AuthFooter
              buttonText="회원가입"
              linkText="계정이 있나요? 로그인으로 이동"
              linkTo="/signin"
              loading={loading}
            />
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default SignupPage;
