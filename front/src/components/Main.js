import React from "react";
const Main = ({ link }) => {
  console.log({ link });
  return (
    <div className="Main">
      {/* {link.map((it) => (
        <div key={it.id}>
          <div>url:{it.url}</div>
          <div>title:{it.title}</div>
          <div>subtitles:{it.subtitles}</div>
          <div>summarized_subtitles:{it.summarized_subtitles}</div>
        </div>
      ))} */}
      <span>{link}</span>
    </div>
  );
};

Main.defaultProps = {
  link: [],
};

export default Main;
