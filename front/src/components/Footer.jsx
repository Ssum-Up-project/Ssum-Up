import React from "react";
import { Link } from "react-router-dom";
// import { Button } from "../Button";
import "./Footer.css";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import BusinessIcon from "@mui/icons-material/Business";
import EmailIcon from "@mui/icons-material/Email";

function Footer() {
  return (
    <div className="Footer">
      <div className="footer-links">
        <section className="footer-container">
          <div className="footer_text">
            <p
              className="footer-heading"
              style={{ fontWeight: "bold", marginBottom: "40px" }}
            >
              SSUM UP
            </p>
            <p className="footer-text">
              <LocalPhoneIcon /> 02-123-4567
            </p>
            <p>
              <BusinessIcon /> 강남구 선릉로 443 세방빌딩 6층
            </p>
            <p>
              <EmailIcon /> support@ssumup.com
            </p>
          </div>

          <div className="input-areas"></div>
        </section>
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <Link to="/team">
              <h2>About Us</h2>
            </Link>
            {/* <Link to="/">Link 1</Link>
            <Link to="/">Link 2</Link>
            <Link to="/">Link 3</Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
