import React, { useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import axios from "axios";

// const checkPassword = (e) => {};
//
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const emailTextField = useRef();
  const password1TextField = useRef();
  const password2TextField = useRef();

  const onChangeEmail = (e) => {
    setEmail(e.target.vlaue);
  };
  const onChangePassword1 = (e) => {
    setPassword1(e.target.vlaue);
  };
  const onChangePassword2 = (e) => {
    setPassword2(e.target.vlaue);
  };

  const test = async () => {
    await axios
      .post("http://127.0.0.1:8000/api/rest-auth/registration/", {
        username: `${email}`,
        password1: `${password1}`,
        password2: `${password2}`,
      })

      .then((res) => {
        console.log(JSON.stringify(res.data));
      })
      .catch((err) => {
        console.err("ERROR💥");
      });
  };

  const onClick = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password1: data.get("password1"),
      password2: data.get("password2"),
    });
    test();
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
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              // onSubmit={handleSubmit}
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
                <Grid item xs={12}>
                  <TextField
                    ref={emailTextField}
                    value={email}
                    onChange={onChangeEmail}
                    required
                    fullWidth
                    id="email"
                    label="이메일"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    ref={password1TextField}
                    value={password1}
                    onChange={onChangePassword1}
                    required
                    fullWidth
                    name="password"
                    label="비밀번호"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    ref={password2TextField}
                    value={password2}
                    onChange={onChangePassword2}
                    required
                    fullWidth
                    name="password"
                    label="비밀번호 확인"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />{" "}
                </Grid>
              </Grid>
              <Button
                onClick={onClick}
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
