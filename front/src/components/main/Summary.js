import * as React from "react";
import PropTypes from "prop-types";
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
        mb: 3,
        padding: 2,
        maxWidth: "95vh",
        height: "14vh",
        backgroundColor: "#F2F2F2",
        borderRadius: 5,
      }}
    >
      {props.videodata.summary}
    </Box>
  );
}
export default Summary;
