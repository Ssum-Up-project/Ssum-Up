// 링크 입력 및 시작하기import React, { useState, useRef } from "react";
import "../../App.css";
import React, { useState } from "react";
import { Button } from "../../components/Button";
import "./Section2.css";
import { useNavigate } from "react-router";
import axios from "axios";
import { useVideoDispatcher } from '../../context/AppWrapper';


const Section2 = () => {
  const navigate = useNavigate();
  const [currentURL, setCurrentURL] = useState(); // link = currentURL
  const videoDispatch = useVideoDispatcher()
  
  const requestURL = async () => {
     return await axios
       .post(
     "http://localhost:8000/api/videoInfo",
      "http://elice-kdt-3rd-team04.koreacentral.cloudapp.azure.com:5000/api/videoInfo/",
        { url: currentURL }
       ).then((res) => {
          console.log(res.data);
          return res.data;})
        .catch((err) => {
            console.ERR("ERRRORRR");
        });
  };

  const handleClick = async () => {
    const regeX =
      /(http|https):(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(|([\w#!:.?+=&%@!]))?/;
    if (regeX.test(currentURL)) {
      const fetchedVideoInfo = await requestURL();
      localStorage.setItem("currentURL", JSON.stringify(currentURL));
      videoDispatch(fetchedVideoInfo);
      navigate("/video");
    } else {
      alert("URL을 확인해주세요.");
    }
  };

  return (
    <div className="Section2">
      <div className="intro_text">
        <p className="wow fadeInUp">영어 영상, 요약하고 핵심만 빠르게 파악해</p>
        <p className="wow fadeInUp">당신의 소중한 시간을 아껴보세요 :)</p>
      </div>
      <p className={["wow fadeInUp", "intro_text2"].join(" ")}>
        영상 링크를 입력해 주세요
      </p>

      {/* !! 링크 인풋이랑 버튼은 아직 에니메이션 효과가 없음  */}
      <form>
        <input
          value={currentURL}
          onChange={(e) => setCurrentURL(e.target.value)}
          type="text"
          name="currentURL"
          placeholder="링크 입력"
          className="input_currentURL"
        />
      </form>

      <div className="sec-btn">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
          onClick={handleClick}
        >
          GET STARTED
        </Button>
      </div>
    </div>
  );
};
export default Section2;

