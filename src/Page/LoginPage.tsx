import { Alert, Avatar, Box, Container, Grid, TextField, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

import { useEffect, useState } from "react";
import { Divider } from "antd";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { login } from "../api/auth/index";
import { loginFormSchema, TLoginForm } from "../model";

import AuthHeader from "@/Components/auth/AuthHeader";
import AuthFooter from "@/Components/auth/AuthFooter";
import LoginForm from "@/Components/auth/LoginForm";

const LoginPage = () => {

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TLoginForm>({ resolver: zodResolver(loginFormSchema) });


  const onSubmit = async (formData: TLoginForm) => {
    try {
      setLoading(true);
      const response = await login(formData);
      if (!response.success) {
        setError("이메일 또는 비밀번호가 올바르지 않습니다");

      }
    } catch (error) {
      setError("로그인 중 오류가 발생했습니다");
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);

      const response = await login({ email, password });
      if (!response.success) {
        setError("게스트 로그인 실패");
      }
    } catch (error) {
      setError("게스트 로그인 중 오류가 발생했습니다");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(""), 3000);
    return () => clearTimeout(timer);
  }, [error]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Container component="main" maxWidth="xs">
        <Box className="flex flex-col justify-center items-center">
          <AuthHeader icon={LoginIcon} title="로그인" />
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
