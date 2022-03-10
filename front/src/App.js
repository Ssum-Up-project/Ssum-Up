import React, { useState, createContext } from "react";
import Header from "./components/Header";
import "./App.css";
import GlobalStyle from "./styles/GlobalStyle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Team from "./pages/team/Team.jsx";
import Main from "./pages/main/Main";
import Intro from "./pages/intro/Intro";
import Home from "./pages/intro/Home";
import ReHome from "./pages/intro/ReHome";

import Layout from "./Layout";
import { AppWrapper } from "./context/AppWrapper";

export const VideoInfoStateContext = createContext(null);
export const VideoInfoDispatchContext = createContext(null);

const dummyList = [
  {
    summary: "SM",
    subtitle: "SB",
    Translation: "TL",
  },
];

function App() {
  return (
    <div>
      <GlobalStyle />
      <AppWrapper>
        <Router>
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/home" element={<Home />} />
            <Route path="/re-home" element={<ReHome />} />
            <Route path="/team" element={<Team />} />
            <Route path="/main" element={<Main />} />
          </Routes>
        </Router>
      </AppWrapper>
    </div>
  );
}

export default App;
