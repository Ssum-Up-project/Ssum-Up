import "../../App.css";
import "./Home.css";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../components/Button";
// import { VideoDispatchContext } from "../../context/AppWrapper";
import LoadingModal from "../../components/LoadingModal";
import { Typography } from "@mui/material";
import Layout from "../../Layout";
import axios from "axios";
import WOW from "wowjs";

const ReHome = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [inputURL, setinputURL] = useState();
  // const videoDispatch = useContext(VideoDispatchContext);

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
        "http://127.0.0.1:8000/swagger/",
        // "http://elice-kdt-3rd-team04.koreacentral.cloudapp.azure.com:5000/api/videoInfo/",
        { url: inputURL }
      )
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((err) => {
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
      // videoDispatch(fetchedVideoInfo);

      setTimeout(() => {
        changeLoadingState();
        navigate("/main"); // navigate
      }, [2000]);
      console.log(localStorage);
      // changeLoadingState();
      // navigate("/main");
    } else {
      alert("URL을 확인해주세요.");
    }
  };

  return (
    <Layout>
      <div className="Home">
        <Typography
          className="wow fadeInUp"
          variant="h3"
          gutterBottom
          component="h3"
          color="#e8e1c2"
        >
          영문 자막이 제공되는 영상으로 다시 입력해주세요!
        </Typography>

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
            buttonStyle="btn--outline"
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

export default ReHome;
