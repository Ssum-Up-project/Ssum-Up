import React, { useState } from 'react';
import { useNavigate } from "react-router";
import axios from 'axios';
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  TextField,
  FormControl,
  FormHelperText,
  Grid,
  Typography,
  Container,
  styled,
  Modal
} from '@mui/material/';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LogInModal from "./LogInModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  width: 380,
  height:500,
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
const Boxs = styled(Box)`
  padding-bottom: 40px;
`;

const Register = () => {
  const theme = createTheme();
  const navigate = useNavigate();
  const [ email, setEmail ] = useState('')
  const [ password1, setPassword1 ] = useState('')
  const [ password2, setPassword2 ] = useState('')
  const [emailError, setEmailError] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [registerError, setRegisterError] = useState('');

  const[open,setOpen]= useState('')

  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await axios
    .post('http://localhost:8000/api/rest-auth/registration/', {
      email: email,
      password1: password1,
      password2: password2
    })
    .then(function (response) {
      alert("가입되었습니다.");
      setOpen(true);
    })
    .catch(function (err) {
      console.error(err)
      setRegisterError('회원가입에 실패하였습니다. 다시한번 확인해 주세요.');
    });
  };
  return (
    <>
      <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" sx={{ ...style }}>
        <CssBaseline>
          <Box
            sx={{
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
              <FormControl component="fieldset" variant="standard">
              {/* Grid spacing ???  */}
              <Grid container spacing={2}>
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
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
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
                    onChange={(e) => {
                      setPassword1(e.target.value)
                    }}
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
                    onChange={(e) => {
                      setPassword2(e.target.value)
                    }}
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
              </FormControl>
              <FormHelperTexts>{registerError}</FormHelperTexts>
              <Grid container justifyContent="flex-end">
              </Grid>
            </Box>
          </Box>
        </CssBaseline>
      </Container>
      </ThemeProvider>
      <Modal
         open={open}
         onClose={handleClose}
         aria-labelledby="child-modal-title"
         aria-describedby="child-modal-description"
        >
        <LogInModal />
      </Modal>
    </>
  );
};

export default Register;

