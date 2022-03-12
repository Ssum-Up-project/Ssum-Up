// [#28]
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";

const Youtube = ({ videoInfo }) => {
  const [playerURL, setPlayerURL] = useState(videoInfo);

  useEffect(() => {
    const storedUrlStringified = localStorage.getItem("storedURL");
    if (storedUrlStringified !== null) {
      const storedURL = JSON.parse(storedUrlStringified);
      setPlayerURL(storedURL);
    }
  }, [playerURL]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <ReactPlayer
        url={playerURL}
        playing={true}
        loop={true}
        muted={true}
        className="react-player"
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default Youtube;
