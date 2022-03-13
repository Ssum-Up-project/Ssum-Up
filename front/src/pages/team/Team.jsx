import React from "react";
import "./Team.css";
import CardItem from "./CardItem";
import Introduction from "./Introduction";
import Layout from "../../Layout";

function Team() {
  return (
    <Layout>
      <div className="Team">
        <div className="cards">
          <Introduction />
          <div className="cards__container">
            <div className="cards__wrapper">
              <ul className="cards__items">
                <CardItem
                  src="/image/SJ.png"
                  name="FrontEnd_이상지"
                  text="열심히 하는게 즐거운 계획충"
                  text1="https://velog.io/@sanglee"
                  text2="https://github.com/saanglee"
                />

                <CardItem
                  src="/image/SA.png"
                  name="AI_이슬아"
                  text="진짜 Generalist가 뭔지 보여드릴게요!"
                  text1=" www.notion.so/sahsa/"
                  text2=""
                />
                <CardItem
                  src="/image/JH.png"
                  name="BackEnd_박진화"
                  text="백엔드 개발자 지망생"
                  text1=""
                  text2="https://github.com/Clark19"
                />
              </ul>
              <ul className="cards__items">
                <CardItem
                  src="/image/SS.jpg"
                  name="BackEnd_김승수"
                  text="몰라도 일단 들이받고 보자!"
                  text1=""
                  text2="kss123456789 (ss.k) (github.com)"
                />
                <CardItem
                  src="/image/GY.jpg"
                  name="AI_유가연"
                  text="끊임없이 질문하고 데이터로 답하는 사람이 되고 싶습니다."
                  text1="https://velog.io/@7ryean"
                  text2=" https://github.com/7ryean"
                />
                <CardItem
                  src="/image/NE.jpg"
                  name="FrontEnd_박나은"
                  text="공부할 게 너무 많아 슬픈 개발자 지망생입니다! "
                  text1=""
                  text2="https://github.com/world970511 ("
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Team;
