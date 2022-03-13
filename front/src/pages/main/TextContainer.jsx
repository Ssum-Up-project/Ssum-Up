import React, { useState } from "react";
import Summary from "./Summary";
import Subtitle from "./Subtitle";
import Translation from "./Translation";
import Button from "../../components/Button";
import "./Main.css";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

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
    <div className="text_box">
      <ToggleButtonGroup
        className="toggle_btn_container"
        fullWidth
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
        color="#E8E1C2"
      >
        {/* Buttons */}
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
          요약 번역
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
      <Button
        buttonStyle="btn--outline2"
        buttonSize="btn--large"
        style={{
          textAlign: "right",
          maxWidth: "100vh",
          minWidth: "30vh",
        }}
      >
        내 목록에 저장
        <AddCircleOutlineIcon
          style={{ marginLeft: "10px", marginBottom: "-6px" }}
        />
      </Button>
    </div>
  );
};

export default TextContainer;
