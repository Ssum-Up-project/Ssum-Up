import React, { useState } from "react";
import {
  Avatar,
  Button,
  Modal,
  TextField,
  FormControl,
  FormHelperText,
  CssBaseline,
  Grid,
  Box,
  Typography,
  Container,
  styled,
  Link
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AuthService from "../../service/auth.service";
import { useNavigate } from "react-router-dom";
import SignUpModal from "./SignUpModal";

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

const Boxs = styled(Box)`
  padding-bottom: 40px;
`;


function ModalContainer() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>회원가입 하기</Button>
      <Modal>
        <SignUpModal />
      </Modal>
    </>
  );
}

const LogInModal = ({openModal}) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(openModal);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    AuthService.login(email, password).then(
      () => {
        navigate("/home");
        window.location.reload();
      });
  }
  return (
        <Container component="main" maxWidth="xs" sx={{ ...style }}>
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
                      onChange={(e) => {
                        setEmail(e.target.value)
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      type="password"
                      id="password"
                      name="password"
                      label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                      onChange={(e) => {
                        setPassword(e.target.value)
                      }}
                    />
                  </Grid> 
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
    );
  };
  
export default LogInModal;
