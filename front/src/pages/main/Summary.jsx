import React from "react";
import Box from "@mui/material/Box";

function Summary({ videoInfo }) {
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
        height: "80%",
        backgroundColor: "#fff",
        fontSize: "20px",
      }}
    >
      <p
        style={{
          color: "black",
        }}
      >
        {videoInfo.summarized_subtitles}
      </p>
    </Box>
  );
}

Summary.defaultProps = {
  summary: "요약글 자리 입니다아",
};
export default Summary;
