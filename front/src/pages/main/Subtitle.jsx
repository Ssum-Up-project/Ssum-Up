import React, { useContext } from "react";
import { VideoInfoStateContext } from "../../App.js";

import Box from "@mui/material/Box";

function Summary() {
  const { fetcedVideoInfo } = useContext(VideoInfoStateContext);

  return (
    <Box
      sx={{
        flexDirection: "column",
        display: "flex",
        overflow: "hidden",
        overflowY: "scroll", // added scroll
        margin: "auto",
        mr: 2,
        ml: 2,
        padding: 1,
        maxWidth: "95vh",
        height: "32vh",
        backgroundColor: "#F2F2F2",
        borderRadius: 5,
      }}
    >
      {fetcedVideoInfo.subtitles}

    </Box>
  );
}

Summary.difaultProps = {
  subtitle: "자막 자리 입니다아",
};
export default Summary;
