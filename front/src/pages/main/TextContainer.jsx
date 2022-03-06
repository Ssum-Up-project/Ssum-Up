import React, { useState } from "react";
import Summary from "./Summary";
import Subtitle from "./Subtitle";
import { Box, ToggleButton, ToggleButtonGroup, Button } from "@mui/material";

const TextContainer = () => {
  const [showingSummary, setShowingSummary] = useState(true);
  const [showingSubtitle, setShowingSubtitle] = useState(false);

  const [alignment, setAlignment] = useState("left");
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
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
        {/* <ToggleButton
          value="right"
          key="right"
          onClick={(e) => {
            setShowingSummary(true);
          }}
        >
          요약
          {showText}
        </ToggleButton>
        ,
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
        </ToggleButton> */}
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
        <Button
          style={{
            maxWidth: "100vh",
            minWidth: "30vh",
            // textAlign: "center",
            // gridArea: "footer",
            // marginBottom: 3,
            variant: "contained",
          }}
        >
          저장하기
        </Button>
      </Box>
    </Box>
  );
};

export default TextContainer;
