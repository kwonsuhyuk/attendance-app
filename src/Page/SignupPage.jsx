import { useCallback, useEffect, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import "../firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { getDatabase, ref, set } from "firebase/database";

function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [position, setPosition] = useState("");
  const [isManagerCheck, setManagerCheck] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!error) return;
    setTimeout(() => {
      setError("");
    }, 3000);
  }, [error]);

  const handlePositionChange = (e) => {
    setPosition(e.target.value);
  };

  const findCompanyCode = (e) => {
    // 데이터 베이스에서 회사코드가 있는지 찾는 메서드
  };

  // firebase 에 데이터 전송

  const sendUserInfo = useCallback(
    async (name, email, password) => {
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
        });
        // await set(ref(getDatabase(), "users/" + user.uid), {
        //   name: user.displayName,
        //   avatar: user.photoURL,
        //   id: user.uid,
        // });
        dispatch(setUser(user));
        console.log(user);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const name = data.get("name");
      const email = data.get("email");
      const password = data.get("password");
      const confirmPW = data.get("confirmPW");

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
      console.log(name, email, password);
      sendUserInfo(name, email, password);
    },
    [sendUserInfo]
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
