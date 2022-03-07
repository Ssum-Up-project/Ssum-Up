import React, { useState, createContext } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/intro/Home.jsx";
import Team from "./pages/team/Team.jsx";
import LogIn from "./pages/login/LogIn.jsx";
import SignUp from "./pages/login/SignUp.jsx";
import MainOutput from "./pages/main/MainOutput";
import LogInModal from "./pages/login/LogInModal";
import SignUpModal from "./pages/login/SignUpModal";

import { AppWrapper } from "./context/AppWrapper";

export const VideoInfoStateContext = createContext(null);
export const VideoInfoDispatchContext = createContext(null);

// const dummyList = [
//   {
//     summary: "요약 텍스트으으으으으으으으으으",
//     subtitle: "저어어어어어어어언체에에에 자아아아아막",
//   },
// ];

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
          <Route path="test-modal" element={<LogInModal />} />
          <Route path="test-modal2" element={<SignUpModal />} />
        </Routes>
      </Router>
    </AppWrapper>
  );
}

export default App;
