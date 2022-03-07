import React, { useState } from "react";
import {
  Box,
  Modal,
  Button,
  TextField,
  Link,
  Grid,
  Typography,
  Avatar,
  Container,
  CssBaseline,
  FormHelperText,
  styled,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 6,
  boxShadow: 24,
  pt: 7,
  px: 4,
  pb: 20,
};
const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700;
  color: #d32f2f;
`;

const SignUpModal = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const [emailError, setEmailError] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // API 연결 부분
  //   await axios
  //     .post("http://127.0.0.1:8000/api/rest-auth/registration/", postData)
  //     .then((response) => {
  //       console.log(response, "성공!");
  //       navigate("/log-in");
  //     })
  //     .catch((err) => {
  //       console.log("Error: ", err);
  //       // setRegisterError('회원가입에 실패하였습니다. 다시한번 확인해 주세요.'); // ??? 이건 뭐야
  //     });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const joinData = {
      email: data.get("email"),
      name: data.get("name"),
      password: data.get("password"),
      rePassword: data.get("rePassword"),
    };
    const { email, password1, Password2 } = joinData;

    return (
      <>
        <Button onClick={handleOpen}>Open Child Modal</Button>
        <Modal
          hideBackdrop
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Container component="main" maxWidth="sm" sx={{ ...style }}>
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
                        type="password"
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
                        type="password"
                        id="password2"
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
                    onClick={handleSubmit}
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
        </Modal>
      </>
    );
  };
};

export default SignUpModal;
