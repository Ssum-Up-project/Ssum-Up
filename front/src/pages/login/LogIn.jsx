import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { createTheme, ThemeProvider } from '@mui/material/styles';

// const theme = createTheme(); ()안에 값 세팅 해야함

const LogIn = () => {
  const navigate = useNavigate();

  // const goMain = () => {
  //   navigate(`/`);
  // };

  // const [link, setLink] = useState(""); // ? ?

  // const handleSubmit = () => {
  //   // 유효성 검사
  //   const regex =
  //     /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  //   if (regex.test(link)) {
  //     console.log(`링크 전송 : ${link}`);
  //     // axios
  //     test();
  //     // navigate("/"); // 로그인 후 갈 페이지
  //   } else {
  //     alert("URL을 확인해주세요.");
  //     return;
  //   }
  // };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.vlaue);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.vlaue);
  };

  const validateEmail = () => {
    const regexEmail =
      /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
    return regexEmail.test(email);
  };

  const validatePasswrod = () => {
    // 영어 소문자 1개 이상, 숫자 1개 이상, 특수문자 1개 이상 그리고 8자리 이상
    const regexPassword =
      /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
    return regexPassword.test(password);
  };

  const test = async () => {
    await axios
      .post("http://127.0.0.1:8000/api/rest-auth/login/", {
        email: `${email}`,
        password: `${password}`,
      })

      .then((res) => {
        console.log(JSON.stringify(res.data));
      })
      .catch((err) => {
        console.err("ERROR💥");
      });
  };

  const onClick = () => {
    validateEmail();
    validatePasswrod();
    test();
    navigate(`/`);
  };

  return (
    <Container component="main" maxWidth="xs">
      {/*  max width = extra small --- mui breakpoints */}
      <Box
        // Box = css의 div같은 역할
        sx={{
          // css
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Avatar - 아이콘 동그랗게 만들기 / sx {{m = margin, bgcolor = background color / "secondary.main" mui에서 지정한 컬러컨셉}}*/}
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          {/* Typography - 텍스트의 폰트를 지정할 수 있도록 함 / html상에서는 h1태그인데 보이는건 mui의 h5를 적용 component="h1" variant="h5" */}
          LOG IN
        </Typography>

        <TextField
          name="email"
          vlaue={email}
          onChange={onChangeEmail}
          // error={() => console.log(this.state.data.email)}
          error={validateEmail()}
          helperText={validatePasswrod() ? "이메일을 확인해주세요" : ""}
          margin="normal"
          label="Email adress"
          s
          required // 필수 입력 값
          fullWidth // 화면 전체 너비
          autoComplete="email"
          autoFocus
        ></TextField>

        <TextField
          name="password"
          vlaue={password}
          onChange={onChangePassword}
          error={validatePasswrod()}
          helperText={
            validatePasswrod()
              ? "영어 소문자와 숫자 및 특수기호만 입력 가능합니다."
              : ""
          }
          margin="normal"
          label="Password"
          type="password" // 비밀번호 안보이게
          required
          fullWidth
          autoComplete="current-password"
        ></TextField>
        {/* <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="로그인 상태 유지"
        /> */}

        <Button
          onClick={onClick} // 여기서 validate해야함
          type="submit" // 클릭 시 서버로 전송 submit
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, height: 50 }} // sx = css 효과 주는 프롭 / mt = margin top, mb = margin bottom
        >
          로그인
        </Button>

        {/* Grid comtainer 안에 있는 컴포넌트들이 '행'이 되는 것 - 하위 Grid컴포넌트 안에 들어가는 것item이 '열'이 됨*/}
        <Grid container>
          <Grid item xs>
            {/* 얘가 너비 여백(빈 컬럼 부분)을 다 가져가도록 설정 xs = auto layout*/}
            <Link href="/" variant="body2">
              비밀번호 찾기
            </Link>
          </Grid>
          <Grid item>
            {/* <Link to="/sign-up">회원가입</Link> */}
            <Link href="/sign-up" variant="body2">
              아직 회원이 아니신가요? 회원가입
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default LogIn;
