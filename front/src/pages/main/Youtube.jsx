// [#28]
import React, { useState, useEffect, useContext } from "react";
import ReactPlayer from "react-player";
import { VideoStateContext } from "../../context/AppWrapper";

const Youtube = () => {
  // const [storedURL, setStoredURL] = useState();

  // useEffect(() => {
  //   const inputURL = localStorage.getItem("storedURL");
  //   if (storedURL !== null) {
  //     setStoredURL(inputURL);
  //   }
  // }, [storedURL]);

  const state = useContext(VideoStateContext);
  const [playerURL, setPlayerURL] = useState();

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
