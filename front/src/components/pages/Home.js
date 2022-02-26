import React, { useEffect } from "react";
import "../../App.css";
import Section0 from "../Section0";
import Section1 from "../Section1";
import Section2 from "../Section2";
import Footer from "./Footer";
import WOW from "wowjs";

function Home({ onCreate }) {
  useEffect(() => {
    new WOW.WOW().init();
  }, []);

  const handleCreate = (link) => {
    onCreate(link);
  };
  return (
    <>
      <Section0 />
      <Section1 />
      <Section2 onCreate={handleCreate} />
      <Footer />
    </>
  );
}

export default Home;
