import React, { useEffect } from "react";

import Section0 from "./Section0";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Footer from "../../components/Footer";
import WOW from "wowjs";

function Home() {
  useEffect(() => {
    new WOW.WOW().init();
  }, []);

  return (
    <>
      <Section0 />
      <Section1 />
      <Section2 />
      <Footer />
    </>
  );
}

export default Home;
