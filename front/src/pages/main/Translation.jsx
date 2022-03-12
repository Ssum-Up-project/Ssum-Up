import React from "react";
import Box from "@mui/material/Box";

const Translation = ({ videoInfo }) => {
  return (
    <Box
      sx={{
        flexDirection: "column",
        display: "flex",
        overflow: "hidden",
        overflowY: "scroll",
        margin: "auto",
        mr: 2,
        ml: 2,
        mb: 3,
        padding: 2,
        maxWidth: "95vh",
        height: "22.4rem",
        fontSize: "20px",
      }}
    >
      <p
        style={{
          color: "black",
        }}
      >
        {videoInfo.translated_subtitles}
      </p>
    </Box>
  );
};

export default Translation;
