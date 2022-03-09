import React, { useEffect } from "react";
import Home from "./Home";
import WOW from "wowjs";
import "./Intro.css";

function Intro() {
  useEffect(() => {
    new WOW.WOW().init();
  }, []);

  return (
    <div className="Intro">
      <div className="text_container">
        <h1>SSum Up</h1>
        <p>
          Wall Street Journal의 시사뉴스부터 The Verge의 최신 테크 뉴스까지,
          <br />
          영어와 시간의 제약을 넘어 더욱 효율적으로 유튜브를 이용하는 방법
        </p>
        <button className="intro__btn">시작하기</button>
      </div>

      <div className="img__container"></div>
    </div>
  );
}

export default Intro;
