import "./Main.css";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Youtube from "./Youtube";
import Summary from "./Summary";
import Subtitle from "./Subtitle";
import Translation from "./Translation";
import AuthService from "../../service/auth.service";
import Category from "./SelectCategory";
import "./Main.css";
import { ToggleButton, ToggleButtonGroup,Modal } from "@mui/material";
import { Button } from "../../components/Button";
import Layout from "../Layout";
import LogInModal from "../login/LogInModal";


const CONTENT = {
  SUMMARY: "SUMMARY",
  SUBTITLE: "SUBTITLE",
  TRANSLATION: "TRANSLATION",
};

const Main = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [currentUser, setCurrentUser] = useState(undefined);
  const [alignment, setAlignment] = useState("left");
  const [showingContent, setShowingContent] = useState(CONTENT.SUMMARY);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <Layout>
      <div className="Main">
        <div className="line">
          {state ? (
            <>
              <div className="container">
                <section className="section">
                  <div className="youtube_container">
                    <Youtube videoInfo={state.video} />
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
                        onClick={() => setShowingContent(CONTENT.SUMMARY)}
                      >
                        요약
                      </ToggleButton>
                      <ToggleButton
                        value="center"
                        aria-label="centered"
                        onClick={() => setShowingContent(CONTENT.TRANSLATION)}
                      >
                        번역
                      </ToggleButton>
                      <ToggleButton
                        value="right"
                        aria-label="right aligned"
                        onClick={() => setShowingContent(CONTENT.SUBTITLE)}
                      >
                        전체 영상
                      </ToggleButton>
                    </ToggleButtonGroup>
                    {showingContent === CONTENT.SUMMARY && (
                      <Summary videoInfo={state.video} />
                    )}
                    {showingContent === CONTENT.TRANSLATION && (
                      <Translation videoInfo={state.video} />
                    )}
                    {showingContent === CONTENT.SUBTITLE && (
                      <Subtitle videoInfo={state.video} />
                    )}

                    {currentUser ? (
                      <Category />
                    ) : (
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
                    <LogInModal />
                  </Modal>
                      </div>
                    )}
                  </div>
                </section>
              </div>
            </>
          ) : (
            <p style={{ color: "#fff" }}>요청된 URL이 없습니다.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Main;
