// [#28]
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
// import { VideoInfoStateContext } from "../../App.js";

const Youtube = ({ playerURL }) => {
  // const { fetchedVideoInfo } = useContext(VideoInfoStateContext);
  // const [storedURL, setStoredURL] = useState();

  // useEffect(() => {
  //   const inputURL = localStorage.getItem("storedURL");
  //   if (storedURL !== null) {
  //     setStoredURL(inputURL);
  //   }
  // }, [storedURL]);

  return (
    <div style={{ height: "auto", width: "100%" }}>
      <ReactPlayer
        // url={"playerURL"}
        url={"https://www.youtube.com/watch?v=HO4m1w9tiSA"}
        playing={true}
        loop={true}
        className="react-player"
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default Youtube;
