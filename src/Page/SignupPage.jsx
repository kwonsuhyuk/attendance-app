import { useCallback, useState } from "react";
import {
  Alert,
  Avatar,
  Box,
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
import "../firebase";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
// import {
//   PhoneAuthProvider,
//   RecaptchaVerifier,
//   createUserWithEmailAndPassword,
//   getAuth,
//   signInWithCredential,
//   signInWithPhoneNumber,
//   updateProfile,
// } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { useSetRecoilState } from "recoil";
import { isLoading, user } from "../RecoilState";

function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [position, setPosition] = useState("");
  const [isManagerCheck, setManagerCheck] = useState(false);
  const setCurrentUser = useSetRecoilState(user);
  const setIsLoading = useSetRecoilState(isLoading);

  const navigate = useNavigate();

  // const [phoneNum, setPhoneNum] = useState("");
  // const [phoneCheckCode, setPhoneCheckCode] = useState("");
  // const [isPhoneNumCheck, setIsPhoneNumCheck] = useState(false);
  // const [isErrorMsg, setIsErrorMsg] = useState(false);
  // const [confirmationResult, setConfirmationResult] = useState("");

  // const auth = getAuth();
  // auth.languageCode = "ko";

  // // 휴대폰 인증번호 보내주는 부분
  // const handleSendNumber = useCallback(
  //   (e) => {
  //     e.preventDefault();

  //     const appVerifier = window.recaptchaVerifier;
  //     signInWithPhoneNumber(getAuth(), "+82" + phoneNum, appVerifier)
  //       .then((confirmationResult) => {
  //         // SMS sent. Prompt user to type the code from the message, then sign the
  //         // user in with confirmationResult.confirm(code).
  //         window.confirmationResult = confirmationResult;
  //         // ...
  //         setConfirmationResult(confirmationResult);
  //         console.log(confirmationResult);
  //       })
  //       .catch((error) => {
  //         // Error; SMS not sent
  //         // ...
  //         console.log(error.message);
  //       });
  //   },
  //   [phoneNum]
  // );

  // useEffect(() => {
  //   window.recaptchaVerifier = new RecaptchaVerifier(
  //     auth,
  //     "sendCodeBtn",
  //     {
  //       size: "invisible",
  //       callback: (response) => {
  //         // reCAPTCHA solved, allow signInWithPhoneNumber.
  //         handleSendNumber();
  //       },
  //     },
  //     auth
  //   );
  // }, [auth, handleSendNumber]);

  // // 휴대폰 인증번호 비교하고 확인해서 가입시키는 방법
  // const confirmPhoneCode = async (e) => {
  //   e.preventDefault();
  //   confirmationResult
  //     .confirm(phoneCheckCode)
  //     .then((result) => {
  //       // User signed in successfully.
  //       const user = result.user;
  //       console.log(user);
  //       if (position === "manager") {
  //         navigate("/managerfirst");
  //       } else {
  //         navigate("/employeefirst");
  //       }
  //       // ...
  //     })
  //     .catch((error) => {
  //       setError(error);
  //       // User couldn't sign in (bad verification code?)
  //       // ...
  //     });
  // };

  const handlePositionChange = (e) => {
    setPosition(e.target.value);
  };

  const findCompanyCode = (e) => {
    // 데이터 베이스에서 회사코드가 있는지 찾는 메서드
  };

  // firebase 에 데이터 전송
  const sendUserInfo = useCallback(
    async (name, email, password, companyCode) => {
      setLoading(true);
      try {
        const auth = getAuth();
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(user, {
          displayName: name,
          password: password,
          companyCode: companyCode,
        });
        await set(ref(getDatabase(), "users/" + user.uid), {
          name: user.displayName,
          password: password,
          companyCode: companyCode,
          id: user.uid,
        });
        // recoil에 user 등록하기
        setCurrentUser(user);
        setIsLoading(false);

        if (position === "manager") {
          setLoading(false);
          navigate("/managerfirst");
        } else {
          setLoading(false);
          navigate("/employeefirst");
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    },
    [navigate, position, setCurrentUser]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const data = new FormData(e.currentTarget);
      const name = data.get("name");
      const email = data.get("email");
      const password = data.get("password");
      const confirmPW = data.get("confirmPW");
      const companyCode = data.get("companycode");

      // 회원가입 폼 유효성 검사
      if (position === "") {
        setError("가입 포지션을 선택해주세요");
        return;
      }

      if (position === "manager" && !isManagerCheck) {
        setError("체크 항목을 체크해주세요");
        return;
      }

      if (position === "employee" && !companyCode) {
        setError("회사 코드를 입력해주세요");
        return;
      }

      // if (!isPhoneNumCheck) {
      //   setError("인증코드를 올바르게 입력해주세요.");
      //   return;
      // }

      if (!name || !email || !password || !confirmPW) {
        setError("모든 항목을 입력해주세요");
        return;
      }

      if (
        password !== confirmPW ||
        password.length < 6 ||
        confirmPW.length < 6
      ) {
        setError("비밀번호를 확인해 주세요");
        return;
      }

      // 회사 코드 유효한지 확인

      sendUserInfo(name, email, password, companyCode);
    },
    [sendUserInfo, isManagerCheck, position]
  );
  return (
    <div className="mt-20">
      <Container component="main" maxWidth="xs">
        <Box className="flex flex-col justify-center items-center">
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
                      onChange={(e) => setManagerCheck(e.target.checked)}
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
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="회사코드"
                  name="companycode"
                  autoComplete="off"
                />
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

            {/* <div className="inline-flex items-center justify-between w-full">
              <TextField
                margin="normal"
                required
                label="휴대전화번호"
                name="phoneNum"
                className="w-8/12"
                onChange={(e) => setPhoneNum(e.target.value)}
                value={phoneNum}
              />
              <Button
                variant="outlined"
                color="primary"
                id="sendCodeBtn"
                sx={{ flexGrow: 0.3 }}
                onClick={handleSendNumber}>
                인증번호 전송
              </Button>
            </div>
            <Typography
              component="p"
              variant="p"
              color="gray"
              sx={{ fontSize: "12px" }}>
              (-을 빼고 입력해주세요. (ex.01012345678))
            </Typography>
            <FormControlLabel
              className="text-red-500 "
              label="인증번호가 오지 않습니까?"
              control={
                <Checkbox
                  checked={isErrorMsg}
                  onChange={(e) => setIsErrorMsg(e.target.checked)}
                />
              }
            />
            <div className="inline-flex items-center justify-between w-full">
              <TextField
                required
                margin="normal"
                label="인증번호"
                onChange={(e) => setPhoneCheckCode(e.target.value)}
                value={phoneCheckCode}
                name="checkPhoneNum"
                className="w-8/12"
              />
            </div> */}
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
