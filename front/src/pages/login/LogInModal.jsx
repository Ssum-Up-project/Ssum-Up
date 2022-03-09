import React, { useState } from "react";
import {
  Avatar,
  Button,
  Dialog,
  TextField,
  FormControl,
  FormHelperText,
  Grid,
  Box,
  Typography,
  Container,
  styled,
  Link,
  CssBaseline
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router";
import AuthService from "../../service/auth.service";

const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700;
  color: #d32f2f;
`;

const Boxs = styled(Box)`
  padding-bottom: 40px;
`;

// const theme = createTheme(); ()안에 값 세팅 해야함
export default function LogIn(){
  const theme = createTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState('');
  const [passwordState, setPasswordState] = useState('');


  const [open, setOpen]= useState(true);
  const handleClose  = () => setOpen(false);
  const handleSubmit = () => {
      AuthService.login(email, password).then(
      () => {
        setOpen(false);
      });
    }

  
  return (
    <Dialog        
     onClose={handleClose} 
    open={open}
    scroll="paper">
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <Boxs component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    type="email"
                    id="email"
                    name="email"
                    label="이메일 주소"
                    error={emailError !== '' || false}
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                  />
                </Grid>
                <FormHelperTexts>{emailError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="password"
                    name="password"
                    label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                    error={passwordState !== '' || false}
                    onChange={(e) => {
                      setPassword(e.target.value)
                    }}
                  />
                </Grid>
                <FormHelperTexts>{passwordState}</FormHelperTexts> 
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
              >
                로그인
              </Button>
            </FormControl>
            <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/sign-up" variant="body2">
                    회원가입
                  </Link>
                </Grid>
              </Grid>
          </Boxs>
        </Box>
      </Container>
    </ThemeProvider>
    </Dialog>                  
  );
};

