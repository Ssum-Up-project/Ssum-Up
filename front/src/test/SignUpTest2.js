// import React, { useState, useRef } from "react";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import {
  TextField,
  Grid,
  Avatar,
  Typography,
  Box,
  Container,
  CssBaseline,
  Button,
  Link,
  styled,
  FormHelperText,
} from "@mui/material/";
import axios from "axios";

const FormHelperTexts = styled(FormHelperText)`
width: 100%; padding-left:16px; front-weight:700, color: #d32f2f;`;

// Boxs

const SignUp = () => {
  const navigate = useNavigate();

  const [emailError, setEmailError] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // const [registerError, setRegisterError] = useState("");

  // handleAgree
  const onHandlePost = async (data) => {
    const { email, password1, password2 } = data;
    const postData = { email, password1, password2 };

    await axios
      .post("http://127.0.0.1:8000/api/rest-auth/registration/", postData)
      .then((response) => {
        console.log(response, "성공!");
        navigate("/log-in");
      })
      .catch((err) => {
        console.log("Error: ", err);
        // setRegisterError('회원가입에 실패하였습니다. 다시한번 확인해 주세요.'); // ??? 이건 뭐야
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const joinData = {
      email: data.get('email'),
      name: data.get('name'),
      password: data.get('password'),
      rePassword: data.get('rePassword'),
    };
    const { age, city, email, name, password, rePassword } = joinData;

    // 이메일 유효성 체크
    const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailRegex.test(email)) setEmailError('올바른 이메일 형식이 아닙니다.');
    else setEmailError('');

    // 비밀번호 유효성 체크
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegex.test(password))
      setPasswordState('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!');
    else setPasswordState('');

    // 비밀번호 같은지 체크
    if (password !== rePassword) setPasswordError('비밀번호가 일치하지 않습니다.');
    else setPasswordError('');

    if (
      emailRegex.test(email) &&
      passwordRegex.test(password1) &&
      password1 === Password2 &&
    ) {
      onhandlePost(joinData);
    }
  };
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              회원가입
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              {/* Grid spacing ???  */}
              <Grid container spacing={2}>
                {/* xs, sm?? breakpoints? */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="성"
                    name="firstName"
                    autoComplete="family-name"
                    required
                    fullWidth
                    id="firstName"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="이름"
                    name="lastName"
                    autoComplete="given-name"
                    required
                    fullWidth
                    id="lastName"
                  />{" "}
                </Grid>
                {/* ====================================================== */}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    name="email"
                    autoComplete="email"
                    label="이메일 주소"
                    error={emailError !== "" || false}
                  />
                  <FormHelperTexts>{emailError}</FormHelperTexts>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password1"
                    label="비밀번호 (숫자+영문자+특수문자 포함 8자리 이상)"
                    type="password1"
                    id="password1"
                    autoComplete="new-password"
                    error={passwordState !== "" || false}
                  />
                </Grid>
                <FormHelperTexts>{passwordState}</FormHelperTexts>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password2"
                    label="비밀번호 재입력"
                    type="password2"
                    id="password1"
                    autoComplete="new-password"
                    error={passwordState !== "" || false}
                  />{" "}
                </Grid>
                <FormHelperTexts>{passwordError}</FormHelperTexts>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, height: 50 }}
              >
                회원가입
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/log-in" variant="body2">
                    이미 계정이 있으신가요? 로그인
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </CssBaseline>
      </Container>
    </div>
  );
};

export default SignUp;
