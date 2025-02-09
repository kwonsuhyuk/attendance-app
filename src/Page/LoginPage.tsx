import { Alert, Avatar, Box, Container, Grid, TextField, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import LoadingButton from "@mui/lab/LoadingButton";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Divider } from "antd";
import { login } from "../api/auth/index";
import { TLoginForm } from "../model";
import { useForm } from "react-hook-form";

import AuthFooter from "@/Components/auth/AuthFooter";
import LoginForm from "@/Components/auth/LoginForm";

const LoginPage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginForm>();

  const onSubmit = async (formData: TLoginForm) => {
    try {
      setLoading(true);
      const response = await login(formData);
      if (!response.success) {
        let errorMessage = "로그인 실패";
        if (response.error?.includes("wrong-password")) {
          errorMessage = "비밀번호가 올바르지 않습니다";
        } else if (response.error?.includes("user-not-found")) {
          errorMessage = "등록되지 않은 이메일입니다";
        }
        setError(errorMessage);
      }
    } catch (error) {
      setError("로그인 중 오류가 발생했습니다");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!error) return;
    setTimeout(() => {
      setError("");
    }, 3000);
  }, [error]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Container component="main" maxWidth="xs">
        <Box className="flex flex-col justify-center items-center">
          <Avatar
            sx={{
              m: 1,
              bgcolor: "black",
            }}
          >
            <LoginIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="black">
            로그인
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <LoginForm register={register} errors={errors} />
            {error ? (
              <Alert sx={{ mt: 3 }} severity="error">
                {error}
              </Alert>
            ) : null}
            <Divider />
            <AuthFooter
              buttonText="로그인"
              linkText="계정이 없나요? 회원가입으로 이동"
              linkTo="/signup"
              loading={loading}
            />
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default LoginPage;
