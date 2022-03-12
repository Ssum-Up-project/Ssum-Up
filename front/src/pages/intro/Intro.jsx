import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import Home from "./Home";
import WOW from "wowjs";
import "./Intro.css";
import { createTheme } from "@mui/material/styles";
import { Button } from "../../components/Button";

const theme = createTheme({
  palette: {
    main_red: {
      main: "#e05448",
    },
    main_beige: {
      // main: "#E8E1C2",
      main: " #f7f7f9",
    },
  },
});

const Intro = () => {
  useEffect(() => {
    new WOW.WOW().init();
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    new WOW.WOW().init();
  }, []);

  const onClick = () => {
    navigate("/home");
  };

  return (
    <div className="Intro">
      <div className="text_container">
        <h1 className="wow bounceInLeft">SSumUp</h1>
        {/* <img src="image/logo_red.png" alt="logo" className="intro_logo" /> */}
        <div className="wow fadeIn">
          <p>
            Wall Street Journal시사 뉴스부터 The Verge의 최신 테크 뉴스까지,
          </p>
          <p style={{ fontSize: "24px" }}>
            {" "}
            영어와 시간의 제약을 넘어 더욱 효율적으로 유튜브를 이용하는 방법
          </p>
        </div>

        <div className="start_btn_intro">
          <Button
            buttonStyle="btn--outline2"
            buttonSize="btn--large"
            onClick={onClick}
          >
            시작하기
          </Button>
        </div>
      </div>

      <div className="img__container">
        <div className="img__wrapper">
          <video src="/videos/intro_mov.mp4" autoPlay loop muted></video>
        </div>
      </div>
    </div>
  );
};

export default Intro;
