// 링크 입력 및 시작하기import React, { useState, useRef } from "react";

import "../App.css";
import React, { useState, useRef } from "react";
import { Button } from "./Button";
import "../css/Section2.css";
import WOW from "wowjs";
import { useNavigate } from "react-router";
import axios from "axios";
// import validator from "validator";

function Section2({ onCreate }) {
  const navigate = useNavigate();

  const linkInput = useRef();
  const [link, setLink] = useState("");

  // const handleSubmit = () => {
  //   console.log(`링크 전송 : ${link}`);
  //   onCreate(link);
  //   navigate("/ssum-up");
  // };

  const handleSubmit = (e) => {
    // e.target.value();
    // e.preventDefault;
    // validation
    let regex =
      /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if (regex.test(e)) {
      console.log(`링크 전송 : ${link}`);
      // onCreate(link);
      // navigate("/ssum-up");
      test();
    } else {
      alert("URL을 확인해주세요.");
      return;
    }
  };

  const test = async () => {
    await axios
      .post("http://127.0.0.1:8000/api/videodata/", { url: `${link}` })
      // http://127.0.0.1:8000/api/videodata/
      .then((res) => {
        console.log(JSON.stringify(res.data));
      })
      .catch((err) => {
        console.err("ERROR💥");
      });
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

      {/* !! 링크 인풋이랑 버튼은 에니메이션 효과가 없음  */}
      <form>
        <input
          ref={linkInput}
          value={link}
          onChange={(e) => {
            console.log(e.target.value);
            console.log(e.target.name);
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
          onClick={handleSubmit(link)}
        >
          GET STARTED
        </Button>
      </div>
    </div>
  );
}

export default Section2;
