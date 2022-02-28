// 링크 입력 및 시작하기import React, { useState, useRef } from "react";
import "../../App.css";
import React, { useState } from "react";
import { Button } from "../../components/Button";
import "./Section2.css";
import { useNavigate } from "react-router";
import axios from "axios";

function Section2({ HandleCreate }) {
  const navigate = useNavigate();

  const [link, setLink] = useState("");
  const [videoInfo, setVideoInfo] = useState([
    { id: "" },
    { url: "" },
    { title: "" },
    { subtitles: "" },
  ]);

  const handleSubmit = () => {
    const regex =
      /(http|https):(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(|([\w#!:.?+=&%@!]))?/;
    if (regex.test(link)) {
      test();
      HandleCreate(link);
      localStorage.setItem("link", JSON.stringify(link));
      navigate("/video");
    } else {
      alert("URL을 확인해주세요.");

      return;
    }
  };
  const test = async () => {
    // 1. fetchedVideoInfo에 response객체를 받는다 -> 2. setVideoInfo 상태변화 함수로 fetchedVideoInfo를 videoInfo State에 담는다
    // 3. -> videoInfo State를 handleSubmit함수의 argument로 보낸다.
    const fetchedVideoInfo = await axios
      .post(
        "http://elice-kdt-3rd-team04.koreacentral.cloudapp.azure.com:5000/api/videoInfo/",
        { url: link }
      )
      .then((res) => {
        return res.data;
        // console.log(JSON.stringify(res.data));
      })
      .catch((err) => {
        console.err("ERROR💥");
      });

    setVideoInfo(fetchedVideoInfo);
    handleSubmit(videoInfo);
  };

  // res객체에는 (http request랑 response을 받을 때) response에 담겨있는 정보들이 들어있음
  // catch 에러났을 때 처리해 줄 콜백함수 / 에러 발생 시 백엔드에서 에러객체를? 넘겨줄 수 있다.

  return (
    <div className="Section2">
      {/* <video src="" autoPlay loop muted /> */}
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
          value={link}
          onChange={(e) => {
            setLink(e.target.value);
          }}
          type="text"
          name="link"
          placeholder="링크 입력"
          className="input_link"
        />
      </form>

      <div className="sec-btn">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
          onClick={handleSubmit}
        >
          GET STARTED
        </Button>
      </div>
    </div>
  );
}

export default Section2;
