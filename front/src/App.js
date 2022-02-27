import React, { useState } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Team from "./components/pages/Team";
import LogIn from "./components/pages/LogIn";
import SignUp from "./components/pages/SignUp";
import Video from "./components/main/Video";
// import NavbarLogin from "./components/NavbarLogin";

function App() {
  const [link, setLink] = useState([]);
  const [data, setData] = useState();
  // const linkId = useRef(0);

  const onCreate = (link) => {
    const newLink = link;
    // linkId.current += 1;
    setLink(newLink);
  };

  const handleVideoData = () => {
    const newData = data;
    setLink(newData);
  };

  return (
    <>
      <Router>
        <Navbar />
        {/* <NavbarLogin /> */}
        <Routes>
          <Route
            path="/"
            element={
              <Home onCreate={onCreate} handleVideoData={handleVideoData} />
            }
          />
          <Route path="/team" element={<Team />} />
          {/* 로그인 회원가입 - 페이지 아니고 모달 띄울 것.. */}
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          {/* <Route path="/main" element={<Main link={link} />} /> */}
          <Route path="/video" element={<Video link={link} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
