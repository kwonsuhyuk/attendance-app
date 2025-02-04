import { Alert, Avatar, Box, Container, Grid, TextField, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import LoadingButton from "@mui/lab/LoadingButton";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Divider } from "antd";
import { login } from "../api/auth/index";
import { TLoginForm } from "../model";

function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = useCallback(async (loginForm: TLoginForm) => {
    // 화살표 함수 앞의 괄호를 수정
    setLoading(true);
    const response = await login(loginForm);
    if (!response.success) {
      setError(response.error || "로그인 실패");
    }
    setLoading(false);
  }, []);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = event.currentTarget;

      const loginForm = {
        email: form.email.value,
        password: form.password.value,
      };

      if (!loginForm.email || !loginForm.password) {
        setError("모든 항목을 입력해주세요");
        return;
      }
      login(loginForm);
    },
    [login],
  );

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
          <Avatar sx={{ m: 1, bgcolor: "black" }}>
            <LoginIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="black">
            로그인
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {/* 관리자 직원에 따라 추가정보 요구 */}
            <TextField margin="normal" required fullWidth label="이메일" name="email" autoComplete="off" />
            <TextField margin="normal" required fullWidth label="비밀번호" name="password" type="password" />
            {/* 에러시 오류 표시 */}
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
              sx={{ mt: 1, mb: 2 }}>
              로그인
            </LoadingButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signup" style={{ textDecoration: "none", color: "gray" }}>
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
