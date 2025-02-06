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
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import "../firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { get, ref, getDatabase } from "firebase/database";
import { Button } from "antd";

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

  const handlePositionChange = e => {
    setPosition(e.target.value);
  };

  const checkCompanyCode = async code => {
    const database = getDatabase();
    const idRef = ref(database, "companyCode/" + code);
    const snapshot = await get(idRef);
    if (snapshot.exists()) {
      setTempCompInfo(snapshot.val().companyInfo.companyName);
      setIsCodeValid(true);
      return;
    } else {
      setError("일치하는 회사가 없습니다.");
      setIsCodeValid(false);
      return;
    }
  };

  const sendUserInfo = useCallback(
    async (name, email, password, companyCode, phoneNumber) => {
      setLoading(true);
      try {
        const auth = getAuth();
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        await updateProfile(user, {
          displayName: name,
          photoURL: companyCode,
        });

        dispatch(setUser(user));
        // 유저 정보 다음 페이지로 이동해서 한번에 보낼거임
        const userData = {
          name: name,
          id: user.uid,
          companyCode: companyCode,
          phoneNumber: phoneNumber,
        };

        // 추가 정보 입력창으로 이동하게 함
        if (position === "manager") {
          navigate("/managerfirst", { state: userData });
        } else if (position === "employee") {
          navigate("/employeefirst", { state: userData });
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    },
    [dispatch, position, navigate],
  );

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const name = data.get("name");
      const email = data.get("email");
      const phoneNumber = data.get("phoneNumber");
      const password = data.get("password");
      const confirmPW = data.get("confirmPW");

      if (!name || !email || !password || !confirmPW || !phoneNumber) {
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
        password !== confirmPW ||
        password.length < 6 ||
        confirmPW.length < 6
      ) {
        setError("비밀번호를 확인해 주세요");
        return;
      }

      sendUserInfo(name, email, password, companyCode, phoneNumber);
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
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}>
            <div className="p-3 rounded border-solid border-2 border-blue-400">
              <FormLabel id="demo-controlled-radio-buttons-group">
                가입 포지션
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={position}
                onChange={handlePositionChange}>
                <FormControlLabel
                  value="manager"
                  control={<Radio />}
                  label="관리자"
                />
                <FormControlLabel
                  value="employee"
                  control={<Radio />}
                  label="직원"
                />
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
                <Typography
                  component="p"
                  variant="p"
                  color="black"
                  sx={{ mt: 2 }}>
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
                <Typography
                  component="p"
                  variant="p"
                  color="gray"
                  sx={{ fontSize: "12px", mb: 2 }}>
                  (회사 관리자에게 받은 회사코드를 입력해주세요.)
                </Typography>
              </>
            ) : (
              <div></div>
            )}
            <Divider />
            <Typography component="p" variant="p" color="black" sx={{ mt: 2 }}>
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
            <Typography
              component="p"
              variant="p"
              color="gray"
              sx={{ fontSize: "12px" }}>
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
            <Typography
              component="p"
              variant="p"
              color="gray"
              sx={{ fontSize: "12px" }}>
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
                <Link
                  to="/signin"
                  style={{ textDecoration: "none", color: "gray" }}>
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
