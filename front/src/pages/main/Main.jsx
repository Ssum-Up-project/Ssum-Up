import "./Main.css";
import React, { useState } from "react";
import Youtube from "./Youtube";
import Summary from "./Summary";
import Subtitle from "./Subtitle";
import Translation from "./Translation";
// import { useVideoState } from "../../context/AppWrapper";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Button } from "../../components/Button";
// import Layout from "../Layout";

const Main = () => {
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

  return (
    // <Layout>
    <div className="Main">
      <div className="line">
        <div className="container">
          <section className="section">
            <div className="youtube_container">
              <Youtube></Youtube>
            </div>
          </section>
        </div>

        <div className="container">
          <section className="section_text">
            <div className="text_container_main">
              <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
                fullWidth
              >
                <ToggleButton
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
                  전체 영상
                </ToggleButton>
              </ToggleButtonGroup>

              <div>{showText()}</div>

              <div className="save_btn_main">
                <Button
                  className="start_btn"
                  buttonStyle="btn--outline2"
                  buttonSize="btn--large"
                >
                  저장
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    // </Layout>
  );
};

export default Main;
