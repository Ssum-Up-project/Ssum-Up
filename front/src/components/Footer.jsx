import React from "react";
import { Link } from "react-router-dom";
// import { Button } from "../Button";
import "./Footer.css";

function Footer() {
  return (
    <div className="Footer">
      <div className="footer-links">
        <section className="footer-container">
          <p className="footer-heading">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod
          </p>
          <p className="footer-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod
          </p>
          <div className="input-areas"></div>
        </section>
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>About Us</h2>
            <Link to="/sign-up">How it works</Link>
            <Link to="/">Link 1</Link>
            <Link to="/">Link 2</Link>
            <Link to="/">Link 3</Link>
          </div>
        </div>
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>About Us</h2>
            <Link to="/sign-up">How it works</Link>
            <Link to="/">Link 1</Link>
            <Link to="/">Link 2</Link>
            <Link to="/">Link 3</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
