import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  createContext,
} from "react";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import "./App.css";

export const DiaryDispatchContext = createContext(null);

const App = () => {
  const [data, setData] = useState([]);

  // 일기 생성(추가)함수
  const onCreate = (author, content, emotion) => {
    const newItem = {
      author,
      content,
      emotion,
    };
    setData([newItem]);
  };

  const store = {
    data,
  };
  const dispatch = { onCreate };

  return (
    <div>
      <DiaryEditor onCreate={onCreate} />

      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}%</div>

      <DiaryList diaryList={data} />
    </div>
  );
};

export default App;
