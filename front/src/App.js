import React from "react";
import "./App.css";
import GlobalStyle from "./styles/GlobalStyle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Team from "./pages/team/Team.jsx";
import Main from "./pages/main/Main";
import Intro from "./pages/intro/Intro";
import Home from "./pages/intro/Home";
import MySummary from "./pages/mysummary/MyPage";
import ReHome from "./pages/intro/ReHome";
import Login from "./pages/login/LogInModal";
import SignUp from "./pages/login/SignUpModal";
import PrivateRoute from "./service/PrivateRoute";
import PublicRoute from "./service/PublicRoute";

function App() {
  return (
    <div>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/home" element={<Home />} />
          <Route path="/re-home" element={<ReHome />} />
          <Route path="/team" element={<Team />} />
          <Route path="/main" element={<Main />} />

          <Route
            path="/log-in"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/sign-up"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route
            path="/my-summary"
            element={
              <PrivateRoute>
                <MySummary />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
