import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ReactPlayer from "react-player";
import Summary from "./Summary";
import Subtitle from "./Subtitle";

import {
  Paper,
  Grid,
  Box,
  createTheme,
  ThemeProvider,
  Button,
  Typography,
  // Checkbox,
  FormControlLabel,
  // linkClasses,
  Switch,
  // Container,
} from "@mui/material";

const theme = createTheme({
  palette: {
    neutral: {
      main: "#151515",
      contrastText: "#fff",
    },
  },
});

// TEXT SAMPLE
const videodata = {
  title: "TEST",
  subtitle:
    "SUBTITLE SAMPLE : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque molestie eros eget ex aliquam auctor. In arcu felis, rutrum sit amet nunc ac, dignissim sodales metus. Donec velit enim, porttitor vel vehicula non, faucibus dignissim arcu. Aenean fringilla felis vitae pellentesque mollis. Morbi sodales non arcu id placerat. Integer eget arcu nisl. Donec dapibus leo sed urna pharetra, eu elementum diam eleifend. Ut pellentesque, enim non scelerisque feugiat, erat est pharetra elit, eu volutpat nisl nibh a ipsum. Proin gravida elit eu sapien vulputate semper. Phasellus metus metus, scelerisque sed nisi vitae, pulvinar dictum ante. In odio lectus, pharetra sed eros sit amet, maximus faucibus nibh.",
  summary:
    "SUMMARY SAMPLE : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque molestie eros eget ex aliquam auctor. In arcu felis, rutrum sit amet nunc ac, dignissim sodales metus. Donec velit enim, ",
};

// 링크를 받아옴 - localStorage에 저장함 - 새로고침 될 때 마다 localStorage에서 다시 가져옴

function Player({ link }) {
  const [videoData, setVideoData] = useState(); // localStorage에 저장된 video객체 가져올 State
  const [newLink, setNewLink] = useState(link);

  const [showSubtitle, SetShowSubtitle] = useState(false);
  const [switchSubtitle, setSwitchSubtitle] = useState(false);

  useEffect(() => {
    console.log(localStorage.getItem());
    const saved = localStorage.getItem("videoData"); // saved에 저장됨
    // console.log(saved);
    if (saved !== null) {
      let new_link = saved.url;
      setNewLink(new_link);
      console.log(new_link);
    }
  }, [link]);

  const handleChange = (event) => {
    if (switchSubtitle === false) {
      SetShowSubtitle(!showSubtitle);
      setSwitchSubtitle(([event.target.name] = event.target.checked));
    } else {
      SetShowSubtitle(showSubtitle);
      setSwitchSubtitle(([event.target.name] = event.target.checked));
    }
  };

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
            <ReactPlayer
              url={newLink}
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
                {videodata.title}
              </Typography>
              <Typography variant="subtitle1" component="div" gutterBottom>
                {link}
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
                  control={<Switch checked={switch} onChange={handleChange} name="switch"/>}
                  label="전체 자막"
                  // onChange={handleChange}
                /> */}

                <FormControlLabel
                  control={<Switch onChange={handleChange} name="gilad" />}
                  label="전체 자막"
                />
              </Box>
              <Summary videodata={videodata} />
              {showSubtitle && <Subtitle videodata={videodata} />}
            </Box>
            <Box
              sx={{
                textAlign: "center",
                gridArea: "footer",
              }}
            >
              <ThemeProvider theme={theme}>
                <Button
                  color="neutral"
                  variant="contained"
                  style={{ maxWidth: "60vh", minWidth: "30vh" }}
                >
                  Save
                </Button>
              </ThemeProvider>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Player />, rootElement);

export default Player;
