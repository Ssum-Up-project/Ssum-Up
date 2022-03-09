import React, { useState, createContext } from "react";
import Header from "./components/Header";
import "./App.css";
import GlobalStyle from "./styles/GlobalStyle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Team from "./pages/team/Team.jsx";
import Main from "./pages/main/Main";
import Intro from "./pages/intro/Intro";
import Home from "./pages/intro/Home";
import MySummary from "./pages/mysummary/MyPage"
import { AppWrapper } from "./context/AppWrapper";
import PrivateRoute from "./service/PrivateRoute";

import LogIn from "./pages/login/LogInModal";
import SignUp from "./pages/login/SignUpModal";

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
    <div style={{ width: "100%" }}>
     {/* <GlobalStyle />*/}
      <AppWrapper>
        <Router>
          <Header />
          <Routes>
            {/* <Route path="/" element={<Intro />}></Route> */}
            <Route path="/" element={<Home />}></Route>
            <Route path="/log-in" element={<LogIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/team" element={<Team />} />
            <Route path="/main" element={<Main />} />
            <Route path="/my-summary" element={
              <PrivateRoute>
                <MySummary />
              </PrivateRoute>
              }/>
          </Routes>
        </Router>
      </AppWrapper>
    </div>
 );
}


export default App;
