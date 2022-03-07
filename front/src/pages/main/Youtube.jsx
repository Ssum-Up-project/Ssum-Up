import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { VideoInfoStateContext } from "../../App.js";

const Youtube = () => {
  // const { fetchedVideoInfo } = useContext(VideoInfoStateContext);
  const [storedURL, setStoredURL] = useState();

  useEffect(() => {
    const inputURL = localStorage.getItem("storedURL");
    if (storedURL !== null) {
      setStoredURL(inputURL);
    }
  }, [storedURL]);

  return (
    <div style={{ height: "80vh", Width: "100vh" }}>
      <ReactPlayer
        url={storedURL}
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
