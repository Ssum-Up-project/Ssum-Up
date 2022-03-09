import React, { useEffect } from "react";
import Footer from "../../components/Footer";
import Home from "./Home";
import WOW from "wowjs";

function Intro() {
  useEffect(() => {
    new WOW.WOW().init();
  }, []);

  return (
    <>
      <Home />
      <Footer />
    </>
  );
}

export default Intro;
