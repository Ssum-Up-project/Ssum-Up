import React, { useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Youtube from "./Youtube";
import Summary from "./Summary";
import Subtitle from "./Subtitle";
import Translation from "./Translation";
import LoginModal from "../login/LogInModal"
import AuthService from "../../service/auth.service"
import Category from "./SelectCategory"
// import { useVideoState } from "../../context/AppWrapper";
import "./Main.css";
import { ToggleButton, ToggleButtonGroup, Button, Stack } from "@mui/material";

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

  return (
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
          <section className="section">
            {/* TEXT */}
            <div className="text_container">
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
                  A
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
                  B
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
                  C
                </ToggleButton>
              </ToggleButtonGroup>
              {/* 텍스트 자리 */}
              <div>{showText()}</div>
              {/* 저장 버튼 자리 */}
              {currentUser?
                (<Category />):
                (
                  <Button 
                    variant="contained"
                    sx={{      
                        height: 40 ,    
                        variant:"contained",
                        maxWidth: "100vh",
                        minWidth: "30vh"
                      }}
                  onClick={ClickMoveLogin}>
                  저장하기
                </Button>)}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Main;
