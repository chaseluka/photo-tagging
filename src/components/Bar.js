import React, { useEffect, useRef } from "react";
import "../style/Bar.css";

const Bar = (props) => {
  const chars = props.characters;
  const waldo = useRef(null);
  const wenda = useRef(null);
  const wizard = useRef(null);

  useEffect(() => {
    if (chars[0] !== null) {
      chars.forEach((char) => {
        if (char.found === true) {
          const thisChar =
            char.name === "Waldo"
              ? waldo
              : char.name === "Wenda"
              ? wenda
              : char.name === "Wizard"
              ? wizard
              : false;
          thisChar.current.classList.add("opaque");
        }
      });
    }
  }, [chars]);

  return (
    <div className="bar">
      <div className="timer">00:00</div>
      <div className="characters">
        <div
          className="character-container"
          id="waldo-face"
          data-testid="waldo"
          ref={waldo}
        >
          <img src={require("../style/images/waldo.jpeg")} alt="Waldo" />
          <div className="character">Waldo</div>
        </div>
        <div
          className="character-container"
          id="wenda-face"
          ref={wenda}
          data-testid="wenda"
        >
          <img src={require("../style/images/wenda.png")} alt="Wenda" />
          <div className="character">Wenda</div>
        </div>
        <div className="character-container" id="wizard-face" ref={wizard}>
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
