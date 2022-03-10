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

function ModalContainer() {
  const [open, setOpen] = React.useState(false);
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

  const onClick = () => {
    navigate(`/`);
  };

  return (
    <>
      {/* <Button onClick={handleOpen}>Open Child Modal</Button> */}

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
              아직 회원이 아니신가요?
              {/* <Link href="/sign-up" variant="body2">
                 회원가입
              </Link> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, height: 50 }}
                onClick={handleOpen}
              >
                회원가입
              </Button>
              <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
              >
                <ModalContainer />
              </Modal>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default LogInModal;
