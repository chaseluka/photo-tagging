import React from "react";
import "../style/Bar.css";

const Bar = () => {
  return (
    <div className="bar">
      <div className="timer">00:00</div>
      <div className="characters">
        <img src={require("../style/images/waldo.jpeg")} alt="Waldo" />
        <img src={require("../style/images/wenda.png")} alt="Wenda" />
        <img
          src={require("../style/images/wizard.png")}
          alt="Wizard Whitebeard"
        />
      </div>
    </div>
  );
};

export default Bar;
