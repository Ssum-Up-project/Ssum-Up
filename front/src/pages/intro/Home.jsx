import "../../App.css";
import "./Home.css";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../components/Button";
import { VideoDispatchContext } from "../../context/AppWrapper";
import LoadingModal from "../../components/LoadingModal";
import { Typography } from "@mui/material";
import Layout from "../../Layout";
import axios from "axios";
import WOW from "wowjs";

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
  const videoDispatch = useContext(VideoDispatchContext);

  useEffect(() => {
    new WOW.WOW().init();
  }, []);
  useEffect(() => {
    console.log("Loading", isLoading);
  }, [isLoading]);

  const changeLoadingState = () => {
    setIsLoading((current) => !current);
  };

  const requestURL = async () => {
    const fetchedVideoInfo = await axios
      .post(
        "http://elice-kdt-3rd-team04.koreacentral.cloudapp.azure.com:5000/api/videodata/",
        // "http://elice-kdt-3rd-team04.koreacentral.cloudapp.azure.com:5000/api/videoInfo/",
        { url: inputURL }
      )
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((err) => {
        console.ERR("ERRRORRR");
      });
    return fetchedVideoInfo;
  };

  const onClickButton = async () => {
    const regeX =
      /(http|https):(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(|([\w#!:.?+=&%@!]))?/;

    if (regeX.test(inputURL)) {
      // changeLoadingState(); // 💥 오류 안남 & 로딩 안 켜짐 & 화면 넘어감

      // 위 requestURL 함수 사용할 경우 아래 주석 풀기
      // const fetchedVideoInfo = await requestURL(); // 💥 오류 남(ERR_CONNECTION_REFUSED) & 로딩 켜짐 & 화면 안넘어감
      // localStorage.setItem("storedURL", JSON.stringify(inputURL)); // 💥 오류남 (Error while trying to use the following icon) & 로딩 안 켜짐 & 화면 넘어감
      // videoDispatch(fetchedVideoInfo);

      setTimeout(() => {
        changeLoadingState();
        navigate("/main");
      }, [2000]);
      // console.log(localStorage);
      // 위 setTiemout 안 쓸 경우 여기 주석 풀기
      // changeLoadingState();
      // navigate("/main");
      // 💥 여기서 이동이 안됨 ..
    } else {
      alert("URL을 확인해주세요.");
    }
  };

  return (
    <Layout>
      <div className="Home">
        <div className="typography">
          <Typography
            className="wow fadeInUp"
            variant="h3"
            gutterBottom
            component="h3"
            color="#f7f7f9"
          >
            {/* 영어 영상, 요약해서 핵심만 빠르게 파악해 */}
          </Typography>
          <Typography
            className="wow fadeInUp"
            variant="h3"
            gutterBottom
            component="h3"
            color="#f7f7f9"
          >
            {/* 당신의 소중한 시간을 아껴보세요. */}
          </Typography>
        </div>
        <div>
          <form>
            <input
              className="input_url wow fadeInUp"
              value={inputURL}
              onChange={(e) => setinputURL(e.target.value)}
              type="text"
              name="inputURL"
              placeholder="url"
            />
          </form>
        </div>

        <div className="sumup_btn wow fadeIn" style={{ margin: "3rem" }}>
          <Button
            className="start_btn"
            buttonStyle="btn--outline2"
            buttonSize="btn--large"
            onClick={onClickButton}
          >
            요약 하기
          </Button>
        </div>
        {isLoading && <LoadingModal />}
      </div>
    </Layout>
  );
};
export default Home;
