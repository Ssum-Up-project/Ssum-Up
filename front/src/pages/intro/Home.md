import "../../App.css";
import "./Home.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../components/Button";
import LoadingModal from "../../components/LoadingModal";
import { Typography } from "@mui/material";
import Layout from "../../Layout";
// import axios from "axios";
import WOW from "wowjs";
import UserService from "../../service/user.service";

// const fetchedVideoInfo = {
// id: 1,
// url: "https://www.youtube.com/watch?v=dKmHLAKQ5PI&ab_channel=TED",
// title: "title value",
// subtitles: "subtitles value",
// summarized_subtitles: "summarized subtitle sample value33333",
// translation: 'translated'
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
const fetchedVideoInfo = await UserService.postSearchLog(inputURL)
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
/(http|https):(\w+:{0,1}\w\*@)?(\S+)(:[0-9]+)?(|([\w#!:.?+=&%@!]))?/;

    if (regeX.test(inputURL)) {
      changeLoadingState();
      const fetchedVideoInfo = await requestURL();
      localStorage.setItem("storedURL", JSON.stringify(inputURL));

      navigate("/main", {
        state: {
          video: fetchedVideoInfo,
        },
      });
    } else {
      alert("URL을 확인해주세요.");
    }

};

return (
<Layout>
<div className="Home">
<div className="home_text">
<div className="home_h1">
<h1>영어 영상,</h1>
</div>
<div className="home_p1">
<p>요약해서 핵심만 빠르게 파악해</p>
</div>
<div className="home_p2">
<p>당신의 소중한 시간을 아껴보세요.</p>
</div>
</div>

        <div className="input_url">
          <form>
            <input
              className="wow fadeInUp"
              value={inputURL}
              onChange={(e) => setinputURL(e.target.value)}
              type="text"
              name="inputURL"
              placeholder="url"
            />
          </form>
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
          {/* <LoadingModal /> */}
        </div>
      </div>
    </Layout>

);
};
export default Home;

---

/_
배경
video {
object-fit: cover;
width: 100%;
height: 100%;
position: fixed;
z-index: -1;
} _/

.Home {
/_ background: url('images/ url') center center/cover no-repeat; _/
/_ background-color: #191718; _/
background-color: #d2302c;
height: 100vh;
width: 100%;
justify-content: center;
flex-direction: column;
align-items: center;
/_ box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.2); _/
object-fit: contain;
display: flex;
position: relative;
flex-direction: row;
margin-left: 40px;
}

.home_text {
flex-grow: 2;
margin-left: 4rem;
}

.home_text h1 {
color: #f7f7f9;
font-size: 140px;

position: relative;
top: -150px;
}

.home_text p {
color: #f7f7f9;
margin-left: 100px;
font-size: 50px;

position: relative;
top: -100px;

line-height: 6rem;
}

.home_text .home_p2 {
color: #f7f7f9;
margin-left: 50px;
}

.input_url {
flex-grow: 0.2;
}

.input_url input {
width: 700px;
height: 40px;
padding: 8px 20px;
/_ border-radius: 2px; _/
margin-top: 16rem;
margin-right: 10px;
/_ outline: black; _/
border: 2px solid #d2302c;
background-color: #f7f7f9;
font-size: 15px;
margin-bottom: 25px;

position: relative;
left: -140px;
}

input::placeholder {
color: #000;
}

.start_btn{

}

@media screen and (max-width: 960px) {
.Home h3 {
text-align: center;

    font-size: 20px;
    padding-right: 9px;
    padding-left: 9px;
    margin-top: 20px;

}
}

/_ Mobile _/
@media screen and (max-width: 768px) {
.Home .input_url {
width: 300px;
margin-top: 10px;
margin-bottom: 30px;
}
}
