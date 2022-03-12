import React, { useState } from "react";
import "./LoadingModal.css";
import PropagateLoader from "react-spinners/PropagateLoader";

const override = {
  display: "block",
  // margin: "auto",
  marginRight: "200px",
  borderColor: "red",
};

const LoadingModal = () => {
  // let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#E05448");
  return (
    <div className="modalBg">
      <h1 className="modalTxt">요약 중</h1>
      <div style={{ paddingRight: "1.25rem", marginTop: "-1.5rem" }}>
        <PropagateLoader
          color={"#E05448"}
          // loading={true}
          css={{ override }}
          size={25}
        />
      </div>
    </div>
  );
};

export default LoadingModal;
