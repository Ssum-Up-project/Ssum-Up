import React, { useState, createContext } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/intro/Home.jsx";
import Team from "./pages/team/Team.jsx";
import LogIn from "./pages/login/LogIn.jsx";
import SignUp from "./pages/login/SignUp.jsx";
import Video from "front/src/pages/main/Video.jsx";
// import NavbarLogin from "./components/NavbarLogin";

export const VideoInfoDispatchContext = createContext(null); // 왜 null ??

function App() {
  const [link, setLink] = useState([]);
  const [videoInfo, setVideoInfo] = useState([]);

  const handleCreate = (link) => {
    const newLink = link;
    setLink(newLink);
  };

  // video response객체 받아와서 -> handleVideoInfo의 인자로 넣으면 -> videoInfo State의 값으로 반영되는 것 ->
  const handleVideoInfo = (videoInfoParam) => {
    setVideoInfo(videoInfoParam);
  };

  const VideoInfoDispatch = { link, handleCreate, handleVideoInfo };

  return (
    <>
      <Router>
        <Navbar />
        {/* <NavbarLogin /> */}

        <VideoInfoDispatchContext.Provider
          value={(link, VideoInfoDispatch, handleVideoInfo)}
        >
          <Routes>
            <Route path="/" element={<Home handleCreate={handleCreate} />} />
            <Route path="/team" element={<Team />} />
            <Route path="/log-in" element={<LogIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route
              path="/video"
              element={
                <Video
                  link={link}
                  videoInfo={videoInfo}
                  handleVideoInfo={handleVideoInfo}
                />
              }
              // {videoInfo.map((it) => (<Video key={it.id} {...it} />))}
            />
          </Routes>
        </VideoInfoDispatchContext.Provider>
      </Router>
    </>
  );
}

export default App;
