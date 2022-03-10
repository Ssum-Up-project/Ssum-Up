```jsx
import { createContext, useContext, useReducer } from "react";

const VideoStateContext = createContext(null);
const VideoDispatchContext = createContext(null);

// action = 새로 업뎃되는 videodata
function videoReducer(state, action) {
  // 액션에 따라서 행해줄 state를 명시해줌 ---> switch?
  console.log(action);
  return action;
}

// childeren은 뭐지 ? 아 컴포넌트들
const AppWrapper = ({ children }) => {
  const [videoInfos, dispatchVideoInfos] = useReducer(videoInfos, {
    id: 0,
    url: "url",
    title: "title",
    subtitles: "subtitles",
    summarized_subtitles: "summarized subtitle sample",
  });

  return (
    <VideoStateContext.Provider value={videoInfos}>
      <VideoDispatchContext.Provider value={dispatchVideoInfos}>
        {children}
      </VideoDispatchContext.Provider>
    </VideoStateContext.Provider>
  );
};
// videoInfos,dispatchVideoInfos얘네는 위에 Reducer에서 받아오는 애들

// "state 와 dispatch 를 쉽게 사용하기 위한 커스텀 Hooks"
export function useVideoState() {
  const state = useContext(VideoStateContext); // 아 이거는 Video.jsx에 있던  const { fetchedVideoInfo } = useContext(VideoInfoStateContext);
  if (!state) throw new Error("Cannot find VideoState"); // "유효하지 않을땐 에러를 발생" -> 뭐가 유효하지 않은거지 아 videoInfo 제대로 (형식에 맞춰서) 안왔을 때?
  return state;
}

export function useVideoDispatcher() {
  const dispatch = useContext(VideoDispatchContext);
  if (!dispatch) throw new Error("Cannot find VideoProvider");
  return dispatch;
}

export default AppWrapper;
```

Hook
Functional

Context에 담을변수 데이터 하나랑 함수 하나

Context

1. 충분히 시간을 들여서 해결 할 수 있는가? (이해 포함, 지금 몰라도)
   시간 들여서도 안된다
   : 다른 방법을 찾음 이걸 고쳐서 (시간 들여서) 할 수 있다 ? 면 그대로 가고
   각 안나온다 - 아예 갈아 엎음 ..
   갈아 엎었을 때 내가 시간 들여서 완성 할 수 있는가?
   고치는 것 보다 시간이 덜 들건가? ,
   애초에 설계 자체가 잘못됬나 ?
   이 설계를 뜯어서 고쳤을 때

시간 들이며 ㄴ할 수 있다

- 이해 덜 되더라도 일단 완성하는 쪽으로.. 좀 답답해도
- 지금 설계가 잘못되도 무조건 넘어가야되

- !! 프로젝트 끝날때 대비해서 지그 ㅁ내가 놓쳤던 것들을 잘 메모해놔야함 !!!!!!
- 이런 자료를 받았는데 이런 거 다시 본다던 지 , 관련된 영상, 책 사서 본다던지... 정리하면서 블로그 쓴 다던가
- 나중에 볼 때는 꼭 하나하나 봐야

- 개념 공부, 그 개념이 어떤 식으로 구현 되는 가 왔다갔다 하면서 공부 .. 너무 이론 공부만 하는 건 좋지 않아요..
- 넘 개발만 하면 근본적인 부분에서 설계가 안되
-

material ui 코드 다 까서 볼 것

설계
