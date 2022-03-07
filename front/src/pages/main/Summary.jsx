import React, { useContext } from "react";
import { VideoInfoStateContext } from "../../App.js";

import Box from "@mui/material/Box";

function Summary() {
  // const { fetchedVideoInfo } = useContext(VideoInfoStateContext);
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
        mb: 3,
        padding: 2,
        maxWidth: "95vh",
        height: "14vh",
        // backgroundColor: "#F2F2F2",
        backgroundColor: "yellow",
      }}
    >
      {/* {fetchedVideoInfo.summary} */}
      요약 내용ㅇㅇㅇㅇ
    </Box>
  );
}

Summary.difaultProps = {
  summary: "요약글 자리 입니다아",
};
export default Summary;
