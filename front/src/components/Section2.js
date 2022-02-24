// 링크 입력 및 시작하기

import Reac, { useState, useRef } from "react";
import "../App.css";
import { Button } from "./Button";
import "../css/Section2.css";
import WOW from "wowjs";
import { useNavigate } from "react-router";

function Section2({ onCreate }) {
  const navigate = useNavigate();

  const linkInput = useRef();
  const [link, setLink] = useState("");

  const handleSubmit = () => {
    console.log(`링크 전송 : ${link}`);
    if (link.length < 8) {
      // 8 글자 미만 작성 시 input focus
      linkInput.current.focus();
      return;
    }
    onCreate(link);
    navigate("/main");
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
          onClick={handleSubmit}
        >
          GET STARTED
        </Button>
      </div>
    </div>
  );
}
export default Section2;
