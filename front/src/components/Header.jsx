import React, { useState, useEffect } from "react";
import AuthService from "./../service/auth.service";
import { Link, Navigate } from "react-router-dom";
import { Button } from "./Button";
import { Modal } from "@mui/material";
import "./Header.css";
import "./Button.css";
import LogInModal from "../pages/login/LogInModal";
import SignUpModal from "../pages/login/SignUpModal";

function Header() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [isMySummary, setIsMySummary] = useState(false); // 로그인 상태면 true, 그러면 MySummary페이지로 이동

  const [open, setOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const signUphandleOpen = () => setSignUpOpen(true);
  const signUphandleClose = () => setSignUpOpen(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

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
          <Link to="/" className="Header-logo" onClick={closeMobileMenu}>
            (LOGO)
            {/* <i class="fab fa-typo3" /> */}
          </Link>

          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>

          {/* Nav menu */}
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/team" className="nav-links" onClick={closeMobileMenu}>
                About Team
              </Link>
            </li>
            {/* 로그인, 회원가입 - 링크아니고 모달 띄울 것 */}
            {currentUser ? (
              <>
                <li className="nav-item">
                  <Link
                    to="/my-summary"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    My Summary
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-links" onClick={logOut}>
                    LogOut
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
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
                <li>
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
                    <SignUpModal />
                  </Modal>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
export default Header;

