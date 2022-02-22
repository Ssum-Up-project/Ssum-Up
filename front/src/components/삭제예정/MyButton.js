import * as React from "react";
import Stack from "@mui/material/Stack";
import ButtonUnstyled, {
  buttonUnstyledClasses,
} from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/system";

const pink = {
  500: "#FF4081",
  600: "#F50057",
  700: "#C51162",
};

const CustomButtonRoot = styled("button")`
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 0.875rem;
  background-color: ${pink[500]};
  padding: 12px 24px;
  border-radius: 13px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: ${pink[600]};
  }

  &.${buttonUnstyledClasses.active} {
    background-color: ${pink[700]};
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1),
      0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

function CustomButton(props) {
  return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
}

// export default function UnstyledButtonsSimple() {
//   return (
//     <Stack spacing={2} direction="row">
//       <CustomButton>LOG IN</CustomButton>
//       <CustomButton>SIGN UP</CustomButton>
//       {/* <CustomButton disabled>Disabled</CustomButton> */}
//     </Stack>
//   );
// }

const MyButton = ({ text, type, onClick }) => {
  const btnType = ["positive", "negative"].includes(type) ? type : "default";
  // [].includes() 배열안에 들어있냐 (type)이  ? 있으면 type그대로 반환 : 없으며'default'반환

  return <CustomButton onClick={onClick}>{text}</CustomButton>;
};

MyButton.defaultProps = {
  type: "default",
};

export default MyButton;
