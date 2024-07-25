import React, { useEffect, useState } from "react";
import "./Welcome.css";

export const Welcome = () => {
  const [counter, setCounter] = useState(203498);

  useEffect(() => {
    const updateCounter = () => {
      setCounter(
        (prevCounter) => prevCounter + Math.floor(Math.random() * 10) + 1
      );

      const nextUpdate = Math.floor(Math.random() * 5) + 1;

      setTimeout(updateCounter, nextUpdate * 1000);
    };

    updateCounter();

    return () => clearTimeout(updateCounter);
  }, []);

  return (
    <div className="welcome-container">
      <h1>
        <span>Welcome to Custom Creamery</span>
        <div>World's best Ice Cream</div>
        <div> </div>
        <div className="counter">Pints sold: {counter}</div>
      </h1>
    </div>
  );
};
