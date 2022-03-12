import React from "react";
import "./Team.css";

const Introduction = () => {
  return (
    <div className="Introduction">
      <div className="Introduction__title">
        <h1>What</h1>
      </div>

      <div className="Introduction__text">
        <p>
          SSumUp은 자연어 처리 기술을 통해 사람들의 불편을 해소하고 더 편리하고
          효율적으로 만들 수 있는 것이 무엇일까 라는 고민에서 출발했어요. 요즘은
          문자보다 영상이 더 각광받는 정보매체이고, 그 중심에는Youtube가 있죠.
          하지만 영상 매체의 특성상 끝까지 집중해서 보지 않으면 우리가 원하는
          정보를 놓치기도 쉬워 ‘간결하고 효율적으로' 정보를 제공하지는 못한다는
          단점이 있어요. 그래서 영상에서 가장 중요한 부분만 요약해서 전달한다면,
          훨씬 더 효율적으로 유튜브를 이용할 수 있을 것이라고 생각해서 SSumUp을
          만들게 되었어요. SSumUP은 엘리스_AI트랙 3기의 팀프로젝트로 제작되었고,
          다음의 6명이 함께 만들었어요.
        </p>
      </div>
    </div>
  );
};

export default Introduction;

// 제목
