import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Summary from "./Summary";
import Subtitle from "./Subtitle";
import Category from "./SelectCategory"
import AuthService from "../../service/auth.service"
import { Box, ToggleButton, ToggleButtonGroup, Button } from "@mui/material";

const TextContainer = () => {
  const [showingSummary, setShowingSummary] = useState(true);
  const [showingSubtitle, setShowingSubtitle] = useState(false);

  const [alignment, setAlignment] = useState("left");
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  //로그인한 유저인지 아닌지 확인
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  //로그인 모달로 이동
  const navigate=useNavigate();
  const ClickMoveLogin = () => {
    navigate("/log-in")
  };

  const showText = () => {
    if (showingSummary) {
      return <Summary />;
    } else {
      return <Subtitle />;
    }
  };

  const children = [
    <ToggleButton
      value="right"
      key="right"
      onClick={(e) => {
        setShowingSummary(true);
      }}
    >
      요약
      {showText}
    </ToggleButton>,
    <ToggleButton
      value="justify"
      key="justify"
      onClick={(e) => {
        setShowingSummary(false);
        setShowingSubtitle(true);
      }}
    >
      전체자막
      {showText}
    </ToggleButton>,
  ];
  const control = {
    value: alignment,
    onChange: handleChange,
    exclusive: true,
  };
  return (
    <Box
      sx={{
        height: "100%",
      }}
      sm={{ xs: 12, md: 10 }}
    >
      <ToggleButtonGroup size="m" {...control} fullWidth>
        {children}
      </ToggleButtonGroup>
      <Summary></Summary>

      <Box
        sx={{
          textAlign: "center",
          gridArea: "footer",
          marginBottom: 3,
        }}
      >
      {currentUser?
        (<Category />):
        (
          <Button 
          sx={{          
            variant:"contained",
            maxWidth: "100vh",
            minWidth: "30vh"
          }}
          onClick={ClickMoveLogin}>
              Save
          </Button>
      )}
        
      </Box>
    </Box>
  );
};

export default TextContainer;
