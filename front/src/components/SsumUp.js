import React from "react";
import ReactDOM from "react-dom";
import ReactPlayer from "react-player";
// import SumOutput from "../SumOutput";

import {
  Paper,
  Grid,
  Typography,
  Box,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Button,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  ></Box>
);

export default function Player({ link }) {
  console.log({ link });
  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: 1300,
        maxHeight: 1300,
        flexGrow: 1,
        backgroundColor: "#1A2027",
      }}
      elevation={3}
    >
      <Grid container spacing={2}>
        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
          <div style={{ height: "70vh", Width: "100vh" }}>
            <ReactPlayer
              url="https://youtu.be/tIDV-7cPZVw"
              className="react-player"
              playing={false}
              width="100%"
              height="100%"
            />
          </div>
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
          <Card sx={{ minWidth: 275 }}>
            <CardHeader
              action={<Button startIcon={<SaveAltIcon />}>save</Button>}
              title="TEST"
              subheader="2022/02/25"
            />
            <div>link: {link}</div>
            <CardContent></CardContent>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Player />, rootElement);
