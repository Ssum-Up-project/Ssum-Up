import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ReactPlayer from "react-player";
import SumOutput from "./SumOutput";
import axios from "axios";

import {
  Paper,
  Grid,
  Box,
  createTheme,
  ThemeProvider,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const theme = createTheme({
  palette: {
    neutral: {
      main: "#151515",
      contrastText: "#fff",
    },
  },
});

//영상 출력/ 텍스트 출력
export default function Player({ link }) {
  const [videodata, setVideoData] = useState([]);
  useEffect(() => {
    const temp = async () => {
      await axios
        .get("http://127.0.0.1:8000/api/videodata/")
        .then((response) => {
          setVideoData(response.data.filter((i) => i.url === { link })[0]);
        })
        .catch((err) => console.log("error"));
    };
    temp();
  }, []);

  const [output, setOutput] = useState({
    text: videodata.summarized_subtitles,
  });

  const handleChange = () => {
    setOutput({ text: videodata.summarized_subtitles });
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
              url={link}
              playing={true}
              controls={true}
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
            {" "}
            <Box
              sx={{
                padding: 2,
                height: "15vh",
                width: "auto",
                borderBottom: 1,
                borderColor: "grey.400",
              }}
            >
              <Typography variant="h4" component="div" gutterBottom>
                {videodata.title}
              </Typography>
              <Typography variant="subtitles" component="div" gutterBottom>
                {videodata.url}
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
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      output={output}
                      onChange={handleChange}
                      color="default"
                    />
                  }
                  label="See all subtitles"
                />
              </Box>
              <SumOutput output={output} />
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
