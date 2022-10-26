import React, { useEffect, useState } from "react";
import "../style/App.css";
import Bar from "./Bar";
import { store } from "../firebase/firebase.config";
import { collection, query, getDocs } from "firebase/firestore";
import Dropdown from "./Dropdown";
import uniqid from "uniqid";
import Marker from "./Marker";
import Feedback from "./Feedback";
import Box from "./Box";

const App = () => {
  const [dropDown, setDropDown] = useState(false);
  const [clickCoords, setClickCoords] = useState(null);
  const [hidChars, setHidChars] = useState([]);
  const [waldo, setWaldo] = useState(null);
  const [wenda, setWenda] = useState(null);
  const [wizard, setWizard] = useState(null);
  const [feedback, setFeedback] = useState(false);
  const [didFind, setDidFind] = useState("incorrect");

  const getCoords = (e) => {
    const dimensions = e.target.getBoundingClientRect(); //use height and width of these to determine coords of x and y
    const x =
      ((e.nativeEvent.clientX - dimensions.left) / dimensions.width) * 100;
    const y =
      ((e.nativeEvent.clientY - dimensions.top) / dimensions.height) * 100;
    return { x, y, e, dimensions };
  };

  useEffect(() => {
    const setCharacters = (chars) => {
      chars.forEach((char) => {
        if (char.name === "waldo") setWaldo(char);
        if (char.name === "wenda") setWenda(char);
        if (char.name === "wizard") setWizard(char);
      });
    };

    const retrieveCharacters = async () => {
      try {
        const charactersQuery = query(collection(store, "characters"));
        const querySnapshot = await getDocs(charactersQuery);
        const chars = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          chars.push({
            name: data.name,
            x: data.locationX,
            y: data.locationY,
            id: uniqid(),
            found: false,
          });
        });
        setCharacters(chars);
      } catch (err) {
        console.log(err);
      }
    };
    retrieveCharacters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (wizard !== null) {
      const updateHidCharacters = () => {
        const stillHidden = [];
        if (!waldo.found) stillHidden.push(waldo);
        if (!wenda.found) stillHidden.push(wenda);
        if (!wizard.found) stillHidden.push(wizard);
        setHidChars(stillHidden);
      };
      updateHidCharacters();
    }
  }, [waldo, wenda, wizard]);

  const testX = (char) =>
    char.x[0] < clickCoords.x && clickCoords.x < char.x[1];
  const testY = (char) =>
    char.y[0] < clickCoords.y && clickCoords.y < char.y[1];

  const characterIsFound = (name) => {
    const thisChar =
      name === "waldo"
        ? [setWaldo, waldo]
        : name === "wenda"
        ? [setWenda, wenda]
        : name === "wizard"
        ? [setWizard, wizard]
        : false;
    thisChar[0]({
      name: thisChar[1].name,
      x: thisChar[1].x,
      y: thisChar[1].y,
      id: thisChar[1].id,
      found: true,
    });
  };

  const displayFeedback = () => {
    setFeedback(true);
    setTimeout(() => {
      setFeedback(false);
    }, 2000);
  };

  const isCharacterFound = (e) => {
    const name = e.target.id;
    hidChars.forEach((char) => {
      if (char.name === name) {
        if (testX(char) && testY(char)) {
          characterIsFound(name);
          setDidFind("correct");
        } else setDidFind("incorrect");
      }
    });
    displayFeedback();
  };

  const displayDropDown = () =>
    dropDown ? setDropDown(false) : setDropDown(true);

  const clickedCoord = (e) => {
    setClickCoords(getCoords(e));
    displayDropDown();
  };

  return (
    <div className="main">
      <Bar characters={[waldo, wenda, wizard]} />
      <img
        data-testid="game"
        src={require("../style/images/whereswaldo.jpg")}
        alt="wheres waldo. Click to play"
        onClick={clickedCoord}
        id="game-img"
      />
      {(() => {
        if (feedback) return <Feedback didFind={didFind} />;
      })()}
      {(() => {
        if (dropDown)
          return (
            <Dropdown
              characters={hidChars}
              dropDisplay={displayDropDown}
              coords={clickCoords}
              found={isCharacterFound}
            />
          );
      })()}
      {(() => {
        if (dropDown) return <Box coords={clickCoords} />;
      })()}
      {(() => {
        if (wizard !== null) {
          return [waldo, wenda, wizard].map((char) => {
            if (char.found === true) {
              return <Marker char={char} key={char.id} />;
            } else return null;
          });
        }
      })()}
    </div>
  );
};

export default App;
