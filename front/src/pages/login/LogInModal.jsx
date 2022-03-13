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
  Link,
} from "@mui/material";
import AuthService from "../../service/auth.service";
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

const LogInModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerError, setRegisterError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    AuthService.login(email, password)
      .then(() => {
        window.location.reload();
      })
      .catch(function (err) {
        setRegisterError("로그인에 실패하였습니다. 다시한번 확인해 주세요.");
      });
  };
  return (
    <Container component="main" maxWidth="xs" sx={{ ...style }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} />
        <Typography component="h1" variant="h5">
          로그인
        </Typography>
        <Boxs
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
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
                    setEmail(e.target.value);
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
                  label="비밀번호 (숫자+영문자 8자리 이상)"
                  onChange={(e) => {
                    setPassword(e.target.value);
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
          <FormHelperTexts>{registerError}</FormHelperTexts>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button size="small" onClick={handleOpen}>
                아직 회원이 아니신가요? 회원가입
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
              >
                <SignUpModal />
              </Modal>
            </Grid>
          </Grid>
        </Boxs>
      </Box>
    </Container>
  );
};

export default LogInModal;
