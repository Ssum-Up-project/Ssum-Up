import * as React from "react";
import Box from "@mui/material/Box";

function Summary(props) {
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
      {props.videodata.subtitle}
    </Box>
  );
}
export default Summary;
