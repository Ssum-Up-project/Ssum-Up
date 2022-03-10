```jsx
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function 회원가입모달() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>회원가입 하기</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">회원가입 모달 화면</h2>
          <p id="child-modal-description">이메일 비번 입력 하는 곳</p>
          <Button onClick={handleClose}>로그인으로 돌아가기</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

//  로그인 모달
export default function NestedModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>로그인 하기</Button>
      // 이 Button 누르면 아래 모달 뜸<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">로 그 인 </h2>
          <p id="parent-modal-description">로그인을 하세요~!~!~!~ 입력~~~</p>
          <회원가입모달 />
        </Box>
      </Modal>
    </div>
  );
}
```
