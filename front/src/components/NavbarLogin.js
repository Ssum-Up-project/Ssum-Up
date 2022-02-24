import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import "../css/Navbar.css";

function NavbarLogin() {
  // const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

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
  // invoke function underneath this [38:10]
  // window.addEventListener("resize", showButton); // whenever i resize the screen, get show button
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container-login">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            (LOGO)
            {/* <i class="fab fa-typo3" /> */}
          </Link>
          <form>
            <input
              type="text"
              name="link"
              placeholder="링크 입력"
              className="input_afterLogin"
            />
          </form>

          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>

          {/* Nav menu */}
          <ul className={click ? "nav-menu active" : "nav-menu-login"}>
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

          {button && <Button buttonStyle="btn--outline">LOG IN</Button>}
          {button && <Button buttonStyle="btn--outline">SIGN UP</Button>}
        </div>
      </nav>
    </>
  );
}
export default NavbarLogin;
