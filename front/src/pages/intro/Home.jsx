import "../../App.css";
import "./Home.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../components/Button";
import LoadingModal from "../../components/LoadingModal";
import { Typography } from "@mui/material";
import Layout from "../../Layout";
import axios from "axios";
import WOW from "wowjs";

// const fetchedVideoInfo = {
//   id: 1,
//   url: "https://www.youtube.com/watch?v=dKmHLAKQ5PI&ab_channel=TED",
//   title: "title value",
//   subtitles: "subtitles value",
//   summarized_subtitles: "summarized subtitle sample value33333",
//   translation: 'translated'
// };

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [inputURL, setinputURL] = useState();

  useEffect(() => {
    new WOW.WOW().init();
  }, []);

  const changeLoadingState = () => {
    setIsLoading((current) => !current);
  };

  const requestURL = async () => {
    const fetchedVideoInfo = await axios
      .post("http://elice-kdt-3rd-team04.koreacentral.cloudapp.azure.com:5000/api/videodata/",{
        url: inputURL
      }).then((response) => {
        console.log(response.data);
        return response.data;
      }).catch((err) => {
        console.error(err);
      });
    return fetchedVideoInfo;
  };

  const onClickButton = async () => {
    const regeX =
      /(http|https):(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(|([\w#!:.?+=&%@!]))?/;

    if (regeX.test(inputURL)) {
      changeLoadingState();
      const fetchedVideoInfo = await requestURL();
      localStorage.setItem("storedURL", JSON.stringify(inputURL));

      navigate("/main", {
        state: {
          video: fetchedVideoInfo
        }
      });
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
        {/* {isLoading && <LoadingModal />} */}
        <LoadingModal />
      </div>
    </Layout>
  );
};
export default Home;
