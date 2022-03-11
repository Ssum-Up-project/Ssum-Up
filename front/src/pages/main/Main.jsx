import "./Main.css";
import React, { useState, useContext,useEffect } from "react";
import Youtube from "./Youtube";
import Summary from "./Summary";
import Subtitle from "./Subtitle";
import Translation from "./Translation";
import LoginModal from "../login/LogInModal"
import AuthService from "../../service/auth.service"
import Category from "./SelectCategory"
import { ToggleButton, ToggleButtonGroup,Modal } from "@mui/material";
import { Button } from "../../components/Button";
import Layout from "../Layout";
import { VideoStateContext } from "../../context/AppWrapper";


const Main = () => {
  const state = useContext(VideoStateContext);
  const [alignment, setAlignment] = useState("left");
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
    //로그인한 유저인지 아닌지 확인
    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
      const user = AuthService.getCurrentUser();
      if (user) {
        setCurrentUser(user);
      }
    }, []);

    const [open, setOpen] = useState(false);
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  return (
    <Layout>
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

                {currentUser?
                (<Category/>):
                (
                  <div className="save_btn_main">
                  <Button
                    className="start_btn"
                    buttonStyle="btn--outline2"
                    buttonSize="btn--large"
                    onClick={handleOpen}
                  >
                    저장
                  </Button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                  >
                  <LoginModal />
                </Modal>
                </div>)}
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Main;
