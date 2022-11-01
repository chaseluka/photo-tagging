import {
  addDoc,
  collection,
  getFirestore,
  query,
  getDocs,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import "../style/Leaderboard.css";
import { store } from "../firebase/firebase.config";
import uniqid from "uniqid";

const Leaderboard = (props) => {
  const [scores, setScores] = useState([]);
  const [name, setName] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const score = props.score;

  const addNewScore = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(getFirestore(), "scores"), {
        name: name,
        score: score,
        id: uniqid(),
      });
    } catch (error) {
      console.log("Oops something went wrong", error);
    }
    setSubmitted(true);
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    const retrieveScores = async () => {
      const scoresQuery = query(collection(store, "scores"));
      const querySnapshot = await getDocs(scoresQuery);
      const scrs = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        scrs.push(data);
      });
      return scrs;
    };

    const mergeSort = (array) => {
      if (array.length < 2) return array;
      const half = Math.ceil(array.length / 2);
      const leftHalf = array.splice(0, half);
      const rightHalf = array;
      const sortLeft = mergeSort(leftHalf);
      const sortRight = mergeSort(rightHalf);
      const sortedArray = [];
      while (sortLeft !== [] || sortRight !== []) {
        if (sortLeft[0] === undefined) {
          sortedArray.push.apply(sortedArray, sortRight);
          break;
        }
        if (sortRight[0] === undefined) {
          sortedArray.push.apply(sortedArray, sortLeft);
          break;
        } else {
          const smallNum =
            sortLeft[0].score < sortRight[0].score
              ? sortLeft.splice(0, 1)
              : sortRight.splice(0, 1);
          sortedArray.push.apply(sortedArray, smallNum);
        }
      }
      return sortedArray;
    };
    const sortTopScores = async () => {
      const scrs = await retrieveScores();
      setScores(mergeSort(scrs));
    };
    sortTopScores();
  }, [submitted]);

  return (
    <div id="leaderboard">
      <div className="game-over">Game Over!</div>
      <div className="player-score">Your Score: {score}s</div>
      {(() => {
        if (!submitted && score !== 0) {
          return (
            <form onSubmit={addNewScore}>
              <input
                type="text"
                id="name"
                placeholder="Enter Your Name "
                onChange={handleChange}
              />
              <button type="submit">Save</button>
            </form>
          );
        }
      })()}
      <div className="title">Leaderboard: </div>
      <div id="scores">
        {(() => {
          if (scores[0] !== undefined) {
            const top10 = scores.slice(0, 10);
            return top10.map((score, index) => {
              index++;
              return (
                <div className="score" key={score.id}>
                  {index}. {score.name} - {score.score}s
                </div>
              );
            });
          }
          return <div>No submissions yet. Be the first!</div>;
        })()}
      </div>
    </div>
  );
};

export default Leaderboard;
