import React, { useState, useEffect } from "react";
import AuthService from "./../service/auth.service";
import { Link, Navigate } from "react-router-dom";
import { Button } from "./Button";
import { Modal } from "@mui/material";
import "./Header.css";
import "./Button.css";
import MySummary from "../pages/mysummary/MyPage";
import LogInModal from "../pages/login/LogInModal";
import SignUpModal from "../pages/login/SignUpModal";

function Header() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [isMySummary, setIsMySummary] = useState(false); // 로그인 상태면 true, 그러면 MySummary페이지로 이동

  const signUphandleOpen = () => setSignUpOpen(true);
  const signUphandleClose = () => setSignUpOpen(false);

  const [open, setOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const openDialog = () => {
    setClick(false);
    {
      <LogInModal />;
    }
  };

  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);
  const logOut = () => {
    AuthService.logout();
  };
  // const goLogin = () => {
  //   navigate("/login");
  // };
  // display the button on mobile or removes it depending on the screen size
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);
  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="Header">
        <div className="Header-container">
          <Link
            to="/"
            className="Header-logo"
            onClick={closeMobileMenu}
            style={{ fontWeight: "bold", fontSize: "41px" }}
          >
            SSum-Up
            <img src="image/pencil.png" alt="logo" width="40px" />
          </Link>

          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>

          {/* Nav menu */}
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item" style={{ marginTop: "10px" }}>
              <Link to="/home" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item" style={{ marginTop: "10px" }}>
              <Link to="/team" className="nav-links" onClick={closeMobileMenu}>
                About Team
              </Link>
            </li>
            {currentUser ? (
              <>
                <li className="nav-item" style={{ marginTop: "10px" }}>
                  <Link
                    to="/my-summary"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    My Summary
                  </Link>
                </li>
                <li className="nav-item" style={{ marginTop: "10px" }}>
                  <Link to="/" className="nav-links" onClick={logOut}>
                    LogOut
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item" style={{ marginTop: "33px" }}>
                  <Button
                    buttonStyle="btn--outline"
                    className="nav-links"
                    onClick={handleOpen}
                  >
                    Log in
                  </Button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                  >
                    <LogInModal />
                  </Modal>
                </li>

                <li style={{ marginTop: "33px" }}>
                  <Button
                    buttonStyle="btn--outline"
                    className="nav-links-mobile"
                    onClick={signUphandleOpen}
                  >
                    Sign Up
                  </Button>
                  <Modal
                    open={signUpOpen}
                    onClose={signUphandleClose}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                  >
                    <div>
                      <SignUpModal closeModal={() => setSignUpOpen(false)} />
                    </div>
                  </Modal>
                </li>
              </>
            )}
          </ul>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <div>
              <LogInModal />
            </div>
          </Modal>
        </div>
      </nav>
    </>
  );
}
export default Header;
