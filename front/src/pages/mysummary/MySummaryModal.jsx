import React, { useState, useEffect } from "react";
import { Box, Modal, Button, Typography, Container } from "@mui/material";
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

const MySummaryModal = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // const onClick = () => {
  //   navigate(`/log-in`);
  // };

  return (
    <div>
      <Modal hideBackdrop open={open} onClose={handleClose}>
        <Container component="main" maxWidth="sm" sx={{ ...style }}>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              로그인이 필요한 서비스입니다 로그인 하시겠습니까?
            </Typography>

            <Button
              // onClick={onClick} 로그인 모달로 이동
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, height: 50 }}
            >
              로그인
            </Button>
          </Box>
          <Box>
            <Typography component="h1" variant="h5">
              아직 회원이 아니신가요?
            </Typography>
            <Button
              // onClick={onClick} 회원가입 모달로 이동
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, height: 50 }}
            >
              회원가입
            </Button>
          </Box>
        </Container>
      </Modal>
    </div>
  );
};

export default MySummaryModal;
