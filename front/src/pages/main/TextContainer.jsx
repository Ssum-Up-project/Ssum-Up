// [#28]
import React, { useState } from "react";
import Summary from "./Summary";
import Subtitle from "./Subtitle";
import Translation from "./Translation";
import "./Main.css";

import { Box, ToggleButton, ToggleButtonGroup, Button } from "@mui/material";

const TextContainer = () => {
  const [alignment, setAlignment] = React.useState("left");

  const [showingSummary, setShowingSummary] = useState(true);
  const [showingSubtitle, setShowingSubtitle] = useState(false);
  const [showingTranslation, setShowingTranslation] = useState(false);
  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const showText = () => {
    if (showingSummary) {
      return <Summary />;
    } else if (!showingSummary && showingSubtitle) {
      return <Translation />;
    } else if (showingTranslation && !showingSubtitle) {
      return <Subtitle />;
    }
  };

  const control = {
    value: alignment,
    onChange: handleAlignment,
    exclusive: true,
  };
  return (
    <Box sm={{ xs: 12, md: 10, backgroundColor: "red", height: "100%" }}>
      <ToggleButtonGroup
        className="toggle_btn_container"
        fullWidth
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
        color="#E8E1C2"
      >
        <ToggleButton
          backgroundColor="#e8e1ce"
          className="toggle_btns"
          value="left"
          aria-label="left aligned"
          onClick={(e) => {
            setShowingSummary(true);
          }}
        >
          요약
        </ToggleButton>
        <ToggleButton
          value="center"
          aria-label="centered"
          onClick={(e) => {
            setShowingSubtitle(true);
            setShowingSummary(false);
            setShowingTranslation(false);
          }}
        >
          번역
        </ToggleButton>
        <ToggleButton
          value="right"
          aria-label="right aligned"
          onClick={(e) => {
            setShowingTranslation(true);
            setShowingSummary(false);
            setShowingSubtitle(false);
          }}
        >
          전체 자막
        </ToggleButton>
      </ToggleButtonGroup>
      <div>{showText()}</div>

      <div
        style={{
          textAlign: "right",
          gridArea: "footer",
          marginBottom: 3,
          // height: 100,
        }}
      >
        <Button
          variant="contained"
          // color="primary"
          style={{ height: 40 }}
          sx={{
            textAlign: "right",
            maxWidth: "100vh",
            minWidth: "30vh",
          }}
        >
          저장하기
        </Button>
      </div>
    </Box>
  );
};

export default TextContainer;
