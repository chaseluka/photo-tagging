import React from "react";
import "../style/App.css";
import Bar from "./Bar";
import { store } from "../firebase/firebase.config";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const App = () => {
  const coords = (e) => {
    const dimensions = e.target.getBoundingClientRect(); //use height and width of these to determine coords of x and y
    const x =
      ((e.nativeEvent.clientX - dimensions.left) / dimensions.width) * 100;
    const y =
      ((e.nativeEvent.clientY - dimensions.top) / dimensions.height) * 100;
    console.log("x: " + x + " y: " + y);
  };
  const recentMessagesQuery = query(
    collection(store, "characters"),
    orderBy("name", "desc")
  );

  onSnapshot(recentMessagesQuery, function (snapshot) {
    snapshot.docChanges().forEach(function (change) {
      const characters = change.doc.data();
      console.log(characters);
    });
  });
  console.log(recentMessagesQuery);

  return (
    <div className="main">
      <Bar />
      <img
        src={require("../style/images/whereswaldo.jpg")}
        alt="wheres waldo. Click to play"
        onClick={coords}
        id="game-img"
      />
    </div>
  );
};

export default App;
