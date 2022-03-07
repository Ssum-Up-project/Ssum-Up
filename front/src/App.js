import React, { useState, createContext } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/intro/Home.jsx";
import Team from "./pages/team/Team.jsx";
import LogIn from "./pages/login/LogIn.jsx";
import MyPage from "./pages/mypage/MyPage";
import SignUp from "./pages/login/SignUp.jsx";
import MainOutput from "./pages/main/MainOutput";
import { AppWrapper } from "./context/AppWrapper";


export const VideoInfoStateContext = createContext(null);
export const VideoInfoDispatchContext = createContext(null);


function App() {
  return (
    <AppWrapper>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/main-output" element={<MainOutput />} />
          <Route path="/my-page" element={<MyPage />}/>
        </Routes>
      </Router>
    </AppWrapper>
  );
}


export default App;
