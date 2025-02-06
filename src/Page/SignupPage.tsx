import { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  Alert,
  Avatar,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { Button } from "antd";

import { TSignUpForm, TUserData, TSignUpFormData } from "src/model";
import { validateCompanyCode } from "../api/index";
import { signup } from "../api/auth";

function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [position, setPosition] = useState("");
  const [isManagerCheck, setManagerCheck] = useState(false);
  const [companyCode, setCompanyCode] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [tempCompInfo, setTempCompInfo] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!error) return;

    setTimeout(() => {
      setError("");
    }, 3000);
  }, [error]);

  const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPosition(e.target.value);
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
    async ({ name, email, password, companyCode, phoneNumber }: TSignUpForm) => {
      setLoading(true);
      try {
        const result = await signup({
          name,
          email,
          password,
          companyCode,
          phoneNumber,
        });

        if (!result.success || !result.userId) {
          throw new Error(result.error || "회원가입 중 오류가 발생했습니다.");
        }

        const userData: TUserData = {
          id: result.userId,
          name,
          companyCode,
          phoneNumber,
        };

        dispatch(setUser(userData));

        if (position === "manager") {
          navigate("/managerfirst", { state: userData });
        } else if (position === "employee") {
          navigate("/employeefirst", { state: userData });
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    },
    [dispatch, position, navigate],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const formData: TSignUpFormData = {
        name: data.get("name"),
        email: data.get("email"),
        phoneNumber: data.get("phoneNumber"),
        password: data.get("password"),
        confirmPW: data.get("confirmPW"),
        companyCode: companyCode, // state에서 관리되는 값
      } as TSignUpFormData;

      if (
        !formData.name ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPW ||
        !formData.phoneNumber
      ) {
        setError("모든 항목을 입력해주세요");
        return;
      }

      // 관리자일시 체크 확인
      if (position === "manager") {
        if (!isManagerCheck) {
          setError("체크 항목을 체크해주세요.");
          return;
        }
      }

      // 직원 일시 회사코드 입력
      if (position === "employee") {
        if (companyCode === "") {
          setError("회사코드를 입력해주세요.");
          return;
        }
        if (!isCodeValid) {
          setError("회사코드 인증버튼을 눌러주세요.");
          return;
        }
      }
      if (
        formData.password !== formData.confirmPW ||
        formData.password.length < 6 ||
        formData.confirmPW.length < 6
      ) {
        setError("비밀번호를 확인해 주세요");
        return;
      }

      const { name, email, password, phoneNumber } = formData;
      sendUserInfo({ name, email, password, companyCode, phoneNumber });
    },
    [sendUserInfo, position, isManagerCheck, isCodeValid, companyCode],
  );

  useEffect(() => {
    if (window.innerWidth <= 600 && isManagerCheck) {
      alert(
        "관리자는 PC 전용 서비스 입니다. PC버전으로 회원가입을 진행하셔야 추후에 문제가 발생하지 않습니다. PC로 회원가입 진행 부탁드립니다.",
      );
    }
  }, [isManagerCheck]);

  // varient="p" 임시 제거
  return (
    <div className="mt-20">
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Avatar sx={{ m: 1, bgcolor: "black" }}>
            <LockOpenIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="black">
            회원 가입
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <div className="p-3 rounded border-solid border-2 border-blue-400">
              <FormLabel id="demo-controlled-radio-buttons-group">가입 포지션</FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={position}
                onChange={handlePositionChange}>
                <FormControlLabel value="manager" control={<Radio />} label="관리자" />
                <FormControlLabel value="employee" control={<Radio />} label="직원" />
              </RadioGroup>
            </div>
            {/* 관리자 직원에 따라 추가정보 요구 */}
            {position === "manager" ? (
              <>
                <FormControlLabel
                  className="text-red-500"
                  label="관리자로 가입하는 것이 맞습니까?"
                  control={
                    <Checkbox
                      checked={isManagerCheck}
                      onChange={e => setManagerCheck(e.target.checked)}
                    />
                  }
                />
              </>
            ) : position === "employee" ? (
              <>
                <Typography component="p" color="black" sx={{ mt: 2 }}>
                  가입 회사 정보
                </Typography>
                <div className="flex flex-col items-stretch mb-2">
                  {!isCodeValid ? (
                    <TextField
                      className="w-full flex-grow"
                      margin="normal"
                      required
                      label="회사코드"
                      name="companycode"
                      autoComplete="off"
                      sx={{ border: error && "1px solid red" }}
                      disabled={isCodeValid}
                      value={companyCode}
                      onChange={e => setCompanyCode(e.target.value)}
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
                  <Button
                    className="w-full flex-grow"
                    onClick={() => checkCompanyCode(companyCode)}>
                    회사찾기
                  </Button>
                </div>
                <Typography component="p" color="gray" sx={{ fontSize: "12px", mb: 2 }}>
                  (회사 관리자에게 받은 회사코드를 입력해주세요.)
                </Typography>
              </>
            ) : (
              <div></div>
            )}
            <Divider />
            <Typography component="p" color="black" sx={{ mt: 2 }}>
              개인 정보
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              label="이름"
              name="name"
              autoComplete="off"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="이메일"
              name="email"
              autoComplete="off"
            />
            <Typography component="p" color="gray" sx={{ fontSize: "12px" }}>
              (유효한 이메일을 작성해주셔야 합니다!) <br />
              (이메일형식예시 : hongildong@naver.com)
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              label="전화번호"
              name="phoneNumber"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="비밀번호"
              name="password"
              type="password"
            />
            <Typography component="p" color="gray" sx={{ fontSize: "12px" }}>
              (비밀번호는 6자리 이상으로 작성해주세요.)
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              label="비밀번호확인"
              name="confirmPW"
              type="password"
            />
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
              회원가입
            </LoadingButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signin" style={{ textDecoration: "none", color: "gray" }}>
                  계정이 있나요? 로그인으로 이동
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default SignupPage;
