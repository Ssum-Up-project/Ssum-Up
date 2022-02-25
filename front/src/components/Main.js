import React from "react";

const Main = ({ link }) => {
  console.log({ link });

  return (
    <div className="Main">
      <div>link: {}</div>
      {/* {link.map((it) => (
        <div key={it.id}>
          <div>url:{it}</div>
          <div>title:{it.id}</div>
          <div>subtitles:{it.subtitles}</div>
          <div>summarized_subtitles:{it.summarized_subtitles}</div>
        </div>
      ))}
      <span>{link}</span> */}
    </div>
  );
};

Main.defaultProps = {
  link: [],
};

export default Main;
