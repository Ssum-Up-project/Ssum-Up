import "../../App.css";
import "./Home.css";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../components/Button";
import LoadingModal from "../../components/LoadingModal";
import { Typography } from "@mui/material";
import Layout from "../Layout";
// import axios from "axios";
import WOW from "wowjs";
import UserService from "../../service/user.service";

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
  const [inputURL, setInputURL] = useState();
  const inputRef = useRef();
  useEffect(() => {
    new WOW.WOW().init();
  }, []);

  const changeLoadingState = () => {
    setIsLoading((current) => !current);
  };

  const requestURL = async () => {
    const result = await UserService.postVideoData(inputURL)
      .then((response) => {
        console.log(response.data);
        return {
          status: response.status,
          statusText: response.statusText,
          data: response.data,
        };
      })
      .catch((err) => {
        console.error(err.response);
        const response = err.response;
        return {
          status: response.status,
          statusText: response.statusText,
          data: response.data,
        };
      });
    return result;
  };

  const onClickButton = async () => {
    const regeX =
      /(http|https):(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(|([\w#!:.?+=&%@!]))?/;

    if (regeX.test(inputURL)) {
      changeLoadingState();
      const result = await requestURL();
      localStorage.setItem("storedURL", JSON.stringify(inputURL));

      if (result.status === 400) {
        const resultData = result.data;
        if (resultData.code === "NoTranscriptException") {
          alert(resultData.detail + "\nUrl을 다시 확인해주세요.");
          changeLoadingState();
          setInputURL("https://");
          inputRef.current.focus();
          return;
        }
      }

      navigate("/main", {
        state: {
          video: result.data,
        },
      });
    } else {
      alert("URL을 확인해주세요.");
    }
  };

  return (
    <Layout>
      <div className="Home" style={{ height: "50rem" }}>
        <section className="banner major">
          <div className="inner">
            <header className="major wow fadeInDown">
              <h1 style={{ fontWeight: "bold", marginBottom: "2rem" }}>
                Youtube,
              </h1>
            </header>
            <div className="content wow fadeIn">
              <p>
                요약해서 핵심만 빠르게 파악해서
                <br />
                당신의 소중한 시간을 아껴보세요.
              </p>
            </div>
          </div>
          <div
            className="input_btn"
            style={{ marginLeft: "2rem", marginTop: "9rem" }}
          >
            <form>
              <input
                className="wow fadeInUp"
                value={inputURL}
                onChange={(e) => setInputURL(e.target.value)}
                type="text"
                name="inputURL"
                placeholder="url"
              />
            </form>
            <div
              className="sumup_btn wow fadeIn"
              style={{ marginLeft: "2rem" }}
            >
              <Button
                className="start_btn"
                buttonStyle="btn--outline2"
                buttonSize="btn--large"
                onClick={onClickButton}
              >
                요약 하기
              </Button>
            </div>
          </div>
        </section>

        <div className="input_url">
          {/* <form>
            <input
              className="wow fadeInUp"
              value={inputURL}
              onChange={(e) => setinputURL(e.target.value)}
              type="text"
              name="inputURL"
              placeholder="url"
            />
          </form> */}
          {/* <div className="sumup_btn wow fadeIn" style={{ margin: "3rem" }}>
            <Button
              className="start_btn"
              buttonStyle="btn--outline2"
              buttonSize="btn--large"
              onClick={onClickButton}
            >
              요약 하기
            </Button>
          </div> */}
          {isLoading && <LoadingModal />}
        </div>
      </div>
    </Layout>
  );
};
export default Home;
