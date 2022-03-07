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

const LogInModal = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.vlaue);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.vlaue);
  };

  // API 연결 부분
  // const test = async () => {
  //   await axios
  //     .post("http://127.0.0.1:8000/api/rest-auth/login/", {
  //       email: `${email}`,
  //       password: `${password}`,
  //     })

  //     .then((res) => {
  //       console.log(JSON.stringify(res.data));
  //     })
  //     .catch((err) => {
  //       console.err("ERROR💥");
  //     });
  // };

  const onClick = () => {
    // test();
    navigate(`/`);
  };

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
              LOG IN
            </Typography>

            <TextField
              name="email"
              vlaue={email}
              onChange={onChangeEmail}
              margin="normal"
              label="Email adress"
              s
              required
              fullWidth
              autoComplete="email"
              autoFocus
            ></TextField>

            <TextField
              name="password"
              vlaue={password}
              onChange={onChangePassword}
              margin="normal"
              label="Password"
              type="password"
              required
              fullWidth
              autoComplete="current-password"
            ></TextField>

            <Button
              onClick={onClick}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, height: 50 }}
            >
              로그인
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href="/" variant="body2">
                  비밀번호 찾기
                </Link>
              </Grid>
              <Grid item>
                // TODO: 회원가입 모달로 연결하기
                <Link href="/sign-up" variant="body2">
                  아직 회원이 아니신가요? 회원가입
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Modal>
    </>
  );
};

export default LogInModal;
