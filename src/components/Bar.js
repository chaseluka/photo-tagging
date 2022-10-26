import React, { useEffect } from "react";
import "../style/Bar.css";

const Bar = (props) => {
  const chars = props.characters;

  useEffect(() => {
    if (chars[0] !== null) {
      chars.forEach((char) => {
        if (char.found === true) {
          document.getElementById(`${char.name}-face`).classList.add("opaque");
        }
      });
    }
  }, [chars]);

  return (
    <div className="bar">
      <div className="timer">00:00</div>
      <div className="characters">
        <div className="character-container" id="waldo-face">
          <img src={require("../style/images/waldo.jpeg")} alt="Waldo" />
          <div className="character">Waldo</div>
        </div>
        <div className="character-container" id="wenda-face">
          <img src={require("../style/images/wenda.png")} alt="Wenda" />
          <div className="character">Wenda</div>
        </div>
        <div className="character-container" id="wizard-face">
          <img
            src={require("../style/images/wizard.png")}
            alt="Wizard Whitebeard"
          />
          <div className="character">Wizard</div>
        </div>
      </div>
    </div>
  );
};

export default Bar;
