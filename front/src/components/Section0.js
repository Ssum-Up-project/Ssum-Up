import React from "react";
import "../App.css";
// import { Button } from "./Button";
import "../css/Section0.css";

function Section0() {
  return (
    <div className="Section0">
      {/* <video src="" autoPlay loop muted /> */}
      <div className="intro_h1">
        <h1 className="wow fadeInUp">Section 0</h1>
      </div>
      <p className="wow fadeInUp">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et
      </p>

      {/* <div className="sec-btn">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          GET STARTED
        </Button>
        <Button
          className="btns"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
        >
          WATCH TRAILER <i className="far fa-play-circle" />
        </Button>
      </div> */}
    </div>
  );
}
export default Section0;
