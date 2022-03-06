import React, { useState, createContext } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/intro/Home.jsx";
import Team from "./pages/team/Team.jsx";
import LogIn from "./pages/login/LogIn.jsx";
import MyPage from "./pages/mypage/MyPage";
import SignUp from "./pages/login/SignUp.jsx";
import Video from "./pages/main/Video";
import { AppWrapper } from './context/AppWrapper';

export const VideoInfoStateContext = createContext(null);
export const VideoInfoDispatchContext = createContext(null);

// import NavbarLogin from "./components/NavbarLogin";

function App() {
// const [fetchedVideoInfo, setFetchedVideoInfo] = useState();

  // Response 받은거 state로 넣는 함수
  // const handleResponse = (
  //   idParam,
  //   urlParam,
  //   titleParam,
  //   subtitleParam
  //   // summaryParam,
  // ) => {
  //   const fetchedInfo = {
  //     id: idParam,
  //     url: urlParam,
  //     title: titleParam,
  //     subtitles: subtitleParam,
  //     // summaryParam,
  //   };
  //   setFetchedVideoInfo([fetchedInfo]);
  // };

  return (
    <AppWrapper>
      {/* <VideoInfoStateContext.Provider value={fetchedVideoInfo}>
        <VideoInfoDispatchContext.Provider value={handleResponse}> */}
          <Router>
            <Navbar />
            {/* <NavbarLogin /> */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/team" element={<Team />} />
              <Route path="/log-in" element={<LogIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/video" element={<Video />} />
              <Route path="/my-page" element={<MyPage />} />
            </Routes>
          </Router>
        {/* </VideoInfoDispatchContext.Provider>
      </VideoInfoStateContext.Provider> */}
    </AppWrapper>
  );
}

export default App;
