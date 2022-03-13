import DiaryItem from "./DiaryItem";
// DiaryItem으로 일기 데이터들 다 보내줌

const DiaryList = ({ diaryList }) => {
  return (
    <div>
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map((it) => (
          <DiaryItem key={it.id} {...it} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
