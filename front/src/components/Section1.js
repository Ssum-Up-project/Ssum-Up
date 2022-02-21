import React, { useEffect } from "react";
import "../App.css";
import { Button } from "./Button";
import "./Section1.css";
import WOW from "wowjs";

function Section1() {
  useEffect(() => {
    new WOW.WOW().init();
  }, []);

  return (
    <div className="Section1">
      {/* <video src="" autoPlay loop muted /> */}
      <div className="intro_h1">
        <h1 className="wow fadeInUp">Section 1</h1>
      </div>
      <p className="wow fadeInUp">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et{" "}
      </p>
    </div>
  );
}

export default Section1;
