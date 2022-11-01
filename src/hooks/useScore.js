import { useState } from "react";

const useScore = () => {
  const [score, setScore] = useState(0);

  return { score, setScore };
};

export default useScore;
