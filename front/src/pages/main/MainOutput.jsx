import React, { useState, useEffect, useContext } from "react";
import { Paper, Grid, Box, Button, Typography } from "@mui/material";
import TextContainer from "./TextContainer";
import Youtube from "./Youtube";
import { useVideoState } from "../../context/AppWrapper";

// const dummyList = {
//   title: "TEST",
//   subtitle:
//     "SUBTITLE SAMPLE : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque molestie eros eget ex aliquam auctor. In arcu felis, rutrum sit amet nunc ac, dignissim sodales metus. Donec velit enim, porttitor vel vehicula non, faucibus dignissim arcu. Aenean fringilla felis vitae pellentesque mollis. Morbi sodales non arcu id placerat. Integer eget arcu nisl. Donec dapibus leo sed urna pharetra, eu elementum diam eleifend. Ut pellentesque, enim non scelerisque feugiat, erat est pharetra elit, eu volutpat nisl nibh a ipsum. Proin gravida elit eu sapien vulputate semper. Phasellus metus metus, scelerisque sed nisi vitae, pulvinar dictum ante. In odio lectus, pharetra sed eros sit amet, maximus faucibus nibh.",
//   summary:
//     "SUMMARY SAMPLE : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque molestie eros eget ex aliquam auctor. In arcu felis, rutrum sit amet nunc ac, dignissim sodales metus. Donec velit enim, ",
// };

const MainOutput = ({ TextList }) => {
  console.log(TextList); // 에러남 type error
  const videoState = useVideoState;
  const [playerURL, setPlayerURL] = useState();

  useEffect(() => {
    const getCurrentURL = localStorage.getItem("currentURL");
    if (playerURL !== null) {
      setPlayerURL(getCurrentURL);
    }
  }, [playerURL]);

  return (
    <Paper
      sx={{
        p: 1,
        margin: "auto",
        maxWidth: 1500,
        maxHeight: 1500,
        // flexGrow: 1,
        // backgroundColor: "#151515",
        // borderRadius: 2,
      }}
      elevation={3}
    >
      <Grid container spacing={0} marginTop={12}>
        <Grid item lg={7} xs={12}>
          <Youtube />
        </Grid>

        <Grid item lg={5} xs={12}>
          <Box
            sx={{
              padding: 0,
              height: "auto",
              width: "auto",
              // borderBottom: 1,
              // borderColor: "grey.400",
            }}
          >
            <TextContainer fetchedText={TextList}></TextContainer>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MainOutput;