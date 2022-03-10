import React, { useState, useEffect, useContext } from "react";
import ReactPlayer from "react-player";
import Summary from "./Summary";
import Subtitle from "./Subtitle";
import {
  Paper,
  Grid,
  Box,
  Button,
  Typography,
  // FormControlLabel,
  // Switch,
} from "@mui/material";
import { useVideoState } from "../../context/AppWrapper";

// const dummyList = {
//   title: "TEST",
//   subtitle:
//     "SUBTITLE SAMPLE : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque molestie eros eget ex aliquam auctor. In arcu felis, rutrum sit amet nunc ac, dignissim sodales metus. Donec velit enim, porttitor vel vehicula non, faucibus dignissim arcu. Aenean fringilla felis vitae pellentesque mollis. Morbi sodales non arcu id placerat. Integer eget arcu nisl. Donec dapibus leo sed urna pharetra, eu elementum diam eleifend. Ut pellentesque, enim non scelerisque feugiat, erat est pharetra elit, eu volutpat nisl nibh a ipsum. Proin gravida elit eu sapien vulputate semper. Phasellus metus metus, scelerisque sed nisi vitae, pulvinar dictum ante. In odio lectus, pharetra sed eros sit amet, maximus faucibus nibh.",
//   summary:
//     "SUMMARY SAMPLE : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque molestie eros eget ex aliquam auctor. In arcu felis, rutrum sit amet nunc ac, dignissim sodales metus. Donec velit enim, ",
// };

const Video = () => {
  // const { fetchedVideoInfo } = useContext(VideoInfoStateContext);
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
        p: 2,
        margin: "auto",
        maxWidth: 1500,
        maxHeight: 1500,
        flexGrow: 1,
        backgroundColor: "#151515",
        borderRadius: 2,
      }}
      elevation={3}
    >
      <Grid container spacing={2}>
        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
          <div style={{ height: "80vh", Width: "100vh" }}>
            <div style={{ backgroundColor: "red" }}>{videoState.title}</div>
            <ReactPlayer
              url={"CurrentURL"}
              playing={true}
              loop={true}
              className="react-player"
              width="100%"
              height="100%"
            />
          </div>
        </Grid>

        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(1, 1fr)",
              gap: 1,
              gridTemplateRows: "auto",
              gridTemplateAreas: `"header"
            "main"
            "footer"`,
              height: "80vh",
              width: "auto",
              bgcolor: "#FFF",
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            <Box
              sx={{
                padding: 2,
                height: "15vh",
                width: "auto",
                borderBottom: 1,
                borderColor: "grey.400",
              }}
            >
              <Typography variant="h5" component="div" gutterBottom>
                {/* TITLE : {fetchedVideoInfo.title} */}
              </Typography>
              <Typography variant="subtitle1" component="div" gutterBottom>
                {/* URL : {fetchedVideoInfo.url} */}
              </Typography>
            </Box>
            <Box
              sx={{
                gridArea: "main",
              }}
            >
              <Box
                sx={{
                  margin: "auto",
                  pr: 1,
                  textAlign: "right",
                }}
              >
                {/* <FormControlLabel
                  // control={<Switch onChange={handleChange} name="gilad" />}
                  control={<Switch name="gilad" />}
                  label="전체 자막"
                /> */}
              </Box>
              {/* <Summary fetchedVideoInfo={dummyList} /> */}
              {/* <Subtitle fetchedVideoInfo={dummyList} /> */}
              <Summary />

              <Subtitle />
            </Box>
            <Box
              sx={{
                textAlign: "center",
                gridArea: "footer",
              }}
            >
              <Button style={{ maxWidth: "60vh", minWidth: "30vh" }}>
                저장하기
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Video;
