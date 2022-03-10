import { createContext, useContext, useReducer } from "react";

const VideoStateContext = createContext(null);
const VideoDispatchContext = createContext(null);

function videoReducer(state, action) {
  // 액션에 따라서 행해줄 state를 명시해줌
  console.log(action);
  return action;
}

export function AppWrapper({ children }) {
  const [videoInfos, dispatchVideoInfos] = useReducer(videoReducer, {
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
}

// state 와 dispatch 를 쉽게 사용하기 위한 커스텀 Hooks
export function useVideoState() {
  const state = useContext(VideoStateContext);
  if (!state) throw new Error("Cannot find VideoState"); // 유효하지 않을땐 에러를 발생
  return state;
}

export function useVideoDispatcher() {
  const dispatch = useContext(VideoDispatchContext);
  if (!dispatch) throw new Error("Cannot find VideoProvider"); // 유효하지 않을땐 에러를 발생
  return dispatch;
}