import React, { useState, useEffect, useRef } from 'react';

const Counter = ({ start }) => {
  const [secondsPassed, setSecondsPassed] = useState(0);
  const [minutesPassed, setMinutesPassed] = useState(0);
  const cachedSeconds = useRef(0);

  const calculateMinutes = () => {
    console.log(cachedSeconds.current % 60 === 0);
    if (cachedSeconds.current && cachedSeconds.current % 10 === 0) {
      setMinutesPassed((minutesPassed) => minutesPassed + 1);
    }
  };

  useEffect(() => {
    let interval;
    if (!start) {
      clearInterval(interval);
    } else {
      interval = setInterval(() => {
        setSecondsPassed((secondsPassed) => secondsPassed + 1);
        cachedSeconds.current = cachedSeconds.current + 1;
        calculateMinutes();
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [start]);

  return (
    <>
      <div>
        {minutesPassed} : {secondsPassed}
      </div>
    </>
  );
};
export default Counter;
