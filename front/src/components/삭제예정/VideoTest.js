import React, { useState } from "react";
import ReactDOM from "react-dom";
import ReactPlayer from "react-player";
import SumOutput from "./SumOutput";

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

//테스트 데이터
const videodata = {
  id: 3,
  url: "https://youtu.be/KEqpwpfFfhE",
  title: "TEST",
  subtitles:
    "요리법(料理法) 혹은 레시피(영어: recipe)는 요리, 음식 등을 만드는 방법이나 기술을 뜻한다. 요리법에 관한 책에는 일반적으로 요리의 이름, 조리 시간, 준비 재료, 생산 단계, 칼로리, 제품 사진 등이 담겨있다.알려져 있는 최초의 요리법은 기원전 약 1600년으로 거슬러 올라가며 남바빌로니아의 아카드어로 이루어진 평판이 기원이다.[1] 한국사에서도 조선시대 양반댁 부인이 쓴 음식디미방(현대국어로는 음식지미방)이라는 한글로 쓴 요리법 책이 있어서 한국의 전통 음식과 술을 이해하는 중요한 사료 노릇을 한다.(효형출판에서 펴낸 역사스페셜 3권 참조)참고로, 레시피란 용어는 조제약(medicine)이나 베타 테스트(user acceptance testing)와 관련된 IT분야에서도 쓰인다.",
  summarized_subtitles: "요리법(料理法) 혹은 레시피(영어: recipe)는 요리",
};

//영상 출력/ 텍스트 출력
export default function Player({ link }) {
  const [output, setOutput] = useState({
    text: videodata.summarized_subtitles,
  });

  const handleChange = () => {
    setOutput({ text: videodata.subtitles });
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
