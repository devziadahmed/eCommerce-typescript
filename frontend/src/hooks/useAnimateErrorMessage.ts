import { useState } from "react";

const useAnimate = (reset: number) => {
  const [animateError, setAnimateError] = useState(false);

  const handleComplete = () => {
    setAnimateError(true);

    setTimeout(() => {
      setAnimateError(false);
    }, reset);
  };

  return { animateError, handleComplete };
};

export default useAnimate;
