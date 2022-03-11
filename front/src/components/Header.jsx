import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { Modal } from "@mui/material";
import "./Header.css";
import "./Button.css";
import MySummaryModal from "../pages/mysummary/MySummaryModal";
import LogInModal from "../pages/login/LogInModal";

function Header() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [isMySummary, setIsMySummary] = useState(false); // 로그인 상태면 true, 그러면 MySummary페이지로 이동
  // const [isLogIn, setIsLogIn] = useState(false);
  // const changeLoadingState = () => {
  //   setIsLoading((current) => !current);
  // };
  const [open, setOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

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
            {/* TODO: 여기서 로그인 전: 모달 띄우기, 로그인 후: MySummary페이지로 이동  */}
            <li className="nav-item">
              <Link
                to="/my-summary"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                My Summary
              </Link>
              {isMySummary && <MySummaryModal />}
            </li>

            {/* TODO: 페이지 아니고 모달 */}
            <li className="nav-item">
              <Link
                to="/log-in"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Log in
              </Link>
            </li>

            <li>
              <Link
                to="/sign-up"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </li>
          </ul>

          {button && (
            <Button buttonStyle="btn--outline" onClick={handleOpen}>
              LOG IN
            </Button>
          )}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <LogInModal />
          </Modal>
        </div>
      </nav>
    </>
  );
}
export default Header;
