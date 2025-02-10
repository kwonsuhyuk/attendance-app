import { Alert, Avatar, Box, Container, Grid, TextField, Typography, Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import LoadingButton from "@mui/lab/LoadingButton";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Divider } from "antd";
import { login } from "../api/auth/index";
import type { TLoginForm } from "../model";
import { useForm } from "react-hook-form";

function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginForm>();

  const validationRules = {
    email: {
      required: "이메일을 입력해주세요",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "올바른 이메일 형식이 아닙니다",
      },
    },
    password: {
      required: "비밀번호를 입력해주세요",
      minLength: {
        value: 6,
        message: "비밀번호는 최소 6자 이상이어야 합니다",
      },
    },
  };

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
            <TextField
              margin="normal"
              required
              fullWidth
              label="이메일"
              autoComplete="off"
              {...register("email", validationRules.email)}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="비밀번호"
              type="password"
              {...register("password", validationRules.password)}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            {error ? (
              <Alert sx={{ mt: 3 }} severity="error">
                {error}
              </Alert>
            ) : null}
            <Divider />
            <LoadingButton
              type="submit"
              fullWidth
              variant="outlined"
              color="primary"
              loading={loading}
              sx={{ mt: 1, mb: 2 }}
            >
              로그인
            </LoadingButton>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() => handleGuestLogin("test@naver.com", "qweqwe")}
              disabled={loading}
              sx={{ mb: 2 }}
            >
              관리자 Guest 로그인
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="info"
              onClick={() => handleGuestLogin("testep@naver.com", "qweqwe")}
              disabled={loading}
              sx={{ mb: 2 }}
            >
              직원 Guest 로그인
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  to="/signup"
                  style={{
                    textDecoration: "none",
                    color: "gray",
                  }}
                >
                  계정이 없나요? 회원가입으로 이동
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default LoginPage;
