import React from "react";

const DiaryItem = ({ emotion, author }) => {
  return (
    <div>
      <span className="author_info">
        작성자 : {author} | 감정 : {emotion}
      </span>
    </div>
  );
};

export default DiaryItem;
