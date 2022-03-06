import React, { useState, useEffect } from "react";
import AuthService from "./../service/auth.service"
import { Link } from "react-router-dom";
import "./Navbar.css";
import "./Button.css";


function Navbar() {
  // const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

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
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
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
                <Link to="/myPage" className="nav-links">
                  My Page
                </Link>
              </li>
              <li className="nav-item">
                  <Link to="/" className="nav-links"  onClick={logOut}>
                    LogOut
                  </Link>
                </li></>
            ):(
              <>
              <li className="nav-item">
              <Link
                to="/log-in"
                className="nav-links"
               onClick={closeMobileMenu}
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
          {/* {button && <Button buttonStyle="btn--outline">LOG IN</Button>}
          {button && <Button buttonStyle="btn--outline">SIGN UP</Button>} */}
        </div>
      </nav>
    </>
  );
}
export default Navbar;
