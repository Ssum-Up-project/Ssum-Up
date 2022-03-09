import React from "react";
import Box from "@mui/material/Box";
import { useVideoState } from "../../context/AppWrapper";

const Translation = () => {
  const videoState = useVideoState();

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
      {videoState.translation}
    </Box>
  );
};

export default Translation;
