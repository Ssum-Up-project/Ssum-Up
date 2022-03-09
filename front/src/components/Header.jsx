import React, { useState, useEffect } from "react";
import AuthService from "./../service/auth.service"
import { Link,Navigate } from "react-router-dom";
import { Button } from "./Button";
import "./Header.css";
import "./Button.css";
import MySummary from "../pages/mysummary/MyPage";
import LogInModal from "../pages/login/LogInModal";
import SignUpModal from "../pages/login/SignUpModal"

function Header() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [isMySummary, setIsMySummary] = useState(false); // 로그인 상태면 true, 그러면 MySummary페이지로 이동
  // const [isLogIn, setIsLogIn] = useState(false);
  // const changeLoadingState = () => {
  //   setIsLoading((current) => !current);
  // };

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const openDialog = () => {
    setClick(false);
    {<LogInModal/>}
  }

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
            {currentUser?(
                <><li className="nav-item">
                <Link to="/my-summary" className="nav-links" onClick={closeMobileMenu}>
                My Summary
                </Link>
              </li>
              <li className="nav-item">
                  <Link to="/" className="nav-links"  onClick={logOut} >
                    LogOut
                  </Link>
                </li></>
            ):(
              <>
            {/* TODO: 페이지 아니고 모달 */}
            <li className="nav-item">
              <Link
              className="nav-links"
               onClick={openDialog}
              >
                Log in
              </Link>
            </li>
            <li>
              <Link
                to="/sign-up"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </li></>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
export default Header;
