import "../../App.css";
import "./Home.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../components/Button";
import { useVideoDispatcher } from "../../context/AppWrapper";
import LoadingModal from "../../components/LoadingModal";
import { Typography, Input, Box } from "@mui/material";
import axios from "axios";

const fetchedVideoInfo = {
  id: 1,
  url: "https://www.youtube.com/watch?v=dKmHLAKQ5PI&ab_channel=TED",
  title: "title value",
  subtitles: "subtitles value",
  summarized_subtitles: "summarized subtitle sample value33333",
};

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [inputURL, setinputURL] = useState();
  const videoDispatch = useVideoDispatcher();

  useEffect(() => {
    console.log("Loading", isLoading);
  }, [isLoading]);

  const changeLoadingState = () => {
    setIsLoading((current) => !current);
  };

  const requestURL = async () => {
    // const fetchedVideoInfo = await axios
    //   .post(
    //     "http://127.0.0.1:8000/swagger/",
    //     // "http://elice-kdt-3rd-team04.koreacentral.cloudapp.azure.com:5000/api/videoInfo/",
    //     { url: inputURL }
    //   )
    //   .then((res) => {
    //     console.log(res.data);
    //     return res.data;
    //   })
    //   .catch((err) => {
    //     console.ERR("ERRRORRR");
    //   });
    return fetchedVideoInfo;
  };
  const onClickButton = async () => {
    const regeX =
      /(http|https):(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(|([\w#!:.?+=&%@!]))?/;
    if (regeX.test(inputURL)) {
      changeLoadingState();
      const fetchedVideoInfo = await requestURL();
      localStorage.setItem("storedURL", JSON.stringify(inputURL));
      videoDispatch(fetchedVideoInfo);
      setTimeout(() => {
        changeLoadingState();
        navigate("/main"); // navigate
      }, [5000]);
      console.log(localStorage);
      // changeLoadingState();
      // navigate("/main");
    } else {
      alert("URL을 확인해주세요.");
    }
  };

  return (
    <div className="Home">
      {/* <div className="description_short">
        <h2 className="wow fadeInUp">
          영어 영상, 요약하고 핵심만 빠르게 파악해
        </h2>
        <h2 className="wow fadeInUp">당신의 소중한 시간을 아껴보세요</h2>
      </div> */}
      <Typography
        className="wow fadeInUp"
        variant="h3"
        gutterBottom
        component="h3"
        color="#e8e1c2"
      >
        영어 영상, 요약하고 핵심만 빠르게 파악해
      </Typography>
      <Typography
        className="wow fadeInUp"
        variant="h3"
        gutterBottom
        component="h3"
        color="#e8e1c2"
      >
        당신의 소중한 시간을 아껴보세요.
      </Typography>

      {/* TODO: 링크 인풋이랑 버튼 에니메이션 효과*/}
      <div>
        <form>
          <input
            className="input_url"
            value={inputURL}
            onChange={(e) => setinputURL(e.target.value)}
            type="text"
            name="inputURL"
            placeholder="url"
          />
        </form>
      </div>
      {/* <Box
        sx={{
          width: 500,
          maxWidth: "100%",
        }}
      >
        <Input
          fullWidth
          multiline
          value={inputURL}
          onChange={(e) => setinputURL(e.target.value)}
          id="outlined-textarea"
          type="text"
          name="inputURL"
          label="Multiline Placeholder"
          // variant="filled"
          color="#fff"
        />
      </Box> */}

      <div className="sumup_btn">
        <Button
          className="start_btn"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
          onClick={onClickButton}
        >
          GET STARTED
        </Button>
      </div>
      {isLoading && <LoadingModal />}
    </div>
  );
};
export default Home;
