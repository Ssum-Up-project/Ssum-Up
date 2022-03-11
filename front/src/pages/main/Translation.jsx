import React, { useContext } from "react";
import Box from "@mui/material/Box";
import { VideoStateContext } from "../../context/AppWrapper";

const Translation = ({ videoInfo }) => {
  // const state = useContext(VideoStateContext);

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
      }}
    >
      <p style={{
        color: 'black'
      }}>
        {videoInfo.translation}
      </p>
    </Box>
  );
};

export default Translation;
