// [#28]
import React, { useState, useEffect, useContext } from "react";
import { Paper, Grid, Box, Button, Typography } from "@mui/material";
import TextContainer from "./TextContainer";
import Youtube from "./Youtube";
import { useVideoState } from "../../context/AppWrapper";
import "./Main.css";

// const dummyList = {
//   title: "TEST",
//   subtitle:
//     "SUBTITLE SAMPLE : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque molestie eros eget ex aliquam auctor. In arcu felis, rutrum sit amet nunc ac, dignissim sodales metus. Donec velit enim, porttitor vel vehicula non, faucibus dignissim arcu. Aenean fringilla felis vitae pellentesque mollis. Morbi sodales non arcu id placerat. Integer eget arcu nisl. Donec dapibus leo sed urna pharetra, eu elementum diam eleifend. Ut pellentesque, enim non scelerisque feugiat, erat est pharetra elit, eu volutpat nisl nibh a ipsum. Proin gravida elit eu sapien vulputate semper. Phasellus metus metus, scelerisque sed nisi vitae, pulvinar dictum ante. In odio lectus, pharetra sed eros sit amet, maximus faucibus nibh.",
//   summary:
//     "SUMMARY SAMPLE : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque molestie eros eget ex aliquam auctor. In arcu felis, rutrum sit amet nunc ac, dignissim sodales metus. Donec velit enim, ",
// };

const Main = ({ TextList }) => {
  // console.log(TextList); // 에러남 type error
  const videoState = useVideoState;
  const [playerURL, setPlayerURL] = useState();

  useEffect(() => {
    const storedURL = localStorage.getItem("storedURL");
    if (playerURL !== null) {
      setPlayerURL(storedURL);
    }
  }, [playerURL]);

  return (
    // TODO: 전체 화면에서 이 Paper 안의 Grid들이 가운데로 안옴
    <Paper
      sx={{
        marginTop: 6,
        p: 1,
        marginRight: 13,
        marginLeft: 13,
        height: "auto",
        flexGrow: 1,
        border: "3px solid",
        // textAlign: "center",
        // position: "relative",
        // width: "100%",
        // textAlign: "center",
      }}
      elevation={3}
      item
      lg={8}
      md={8}
      xs={12}
    >
      <Grid container spacing={0} width="100%">
        <Grid
          item
          lg={6}
          xs={12}
          sx={{
            // backgroundColor: "blue",
            height: "30rem",
            width: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Youtube playerURL={playerURL} />
        </Grid>

        <Grid item lg={5} xs={12} width="50%">
          <Box
            sx={{
              backgroundColor: "red",
              height: "30rem",
            }}
          >
            <TextContainer></TextContainer>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Main;
