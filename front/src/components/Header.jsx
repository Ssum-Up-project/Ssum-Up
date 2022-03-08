import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import "./Header.css";
import "./Button.css";
function Header() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

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
            <li className="nav-item">
              <Link to="/team" className="nav-links" onClick={closeMobileMenu}>
                My Summary
              </Link>
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
            // <Link to="./log-in" className="btn-mobile">
            <Button buttonStyle="btn--outline">LOG IN</Button>
            // </Link>
          )}

          {/* {button && <Button buttonStyle="btn--outline">LOG IN</Button>}
          {button && <Button buttonStyle="btn--outline">SIGN UP</Button>} */}
        </div>
      </nav>
    </>
  );
}
export default Header;
