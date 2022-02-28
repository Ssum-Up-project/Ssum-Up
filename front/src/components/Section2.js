// 링크 입력 및 시작하기import React, { useState, useRef } from "react";
import "../App.css";
import React, { useState, useRef } from "react";
import { Button } from "./Button";
import "../css/Section2.css";
// import { useNavigate } from "react-router";
import axios from "axios";

function Section2({ onCreate, handleData }) {
  // const navigate = useNavigate();
  const [link, setLink] = useState("");
  const linkInput = useRef;

  const [videoData, setVideoData] = useState([
    { id: "" },
    { url: "" },
    { title: "" },
    { subtitles: "" },
  ]);

  const test = async () => {
    await axios
      // .post("http://127.0.0.1:8000/api/videodata/", { url: `${link}` })
      .post(
        "http://elice-kdt-3rd-team04.koreacentral.cloudapp.azure.com:5000/api/videodata/",
        { url: `${link}` }
      )
      .then((res) => {
        console.log(JSON.stringify(res.data.title));
        setVideoData(JSON.stringify(res.data));
        handleSubmit(videoData);
      })
      .catch((err) => {
        console.err("ERROR💥");
      });
  };

  // res객체에는 (http request랑 response을 받을 때) response에 담겨있는 정보들이 들어있음
  // catch 에러났을 때 처리해 줄 콜백함수 / 에러 발생 시 백엔드에서 에러객체를? 넘겨줄 수 있다.

  // 1. url을 입력하면 반환되는 response객체를 변수에 할당한다,
  // 2. 변수는 State로 관리한다. - 이 때 State는 객체 형태
  // 3. 상태변화 함수를 -> Home -> App으로 넘겨준다.
  // 4. App에서 데이터를 관리한다.
  // 5. 어떻게?
  // 6. App에서 관리되는 데이터를 Video.js로 보낸다.

  const handleSubmit = () => {
    const regex =
      /(http|https):(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(|([\w#!:.?+=&%@!]))?/;
    if (regex.test(link)) {
      test();
      onCreate(link);
      localStorage.setItem("link", JSON.stringify(link));
      // navigate("/video");
    } else {
      alert("URL을 확인해주세요.");

      return;
    }
  };

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
          ref={linkInput}
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
