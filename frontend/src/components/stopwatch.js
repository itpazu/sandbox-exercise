import React, { useState, useEffect } from 'react';
// import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';

const Counter = () => {
  const [TimePassed, setTimePassed] = useState({ seconds: 0, minutes: 0 });
  const {
    state: { start },
  } = useLocation();

  useEffect(() => {
    console.log(start);
    let interval;
    if (!start) {
      clearInterval(interval);
    } else {
      interval = setInterval(() => {
        setTimePassed((timeObject) => {
          if (timeObject.seconds && timeObject.seconds % 59 === 0) {
            return { minutes: timeObject.minutes + 1, seconds: 0 };
          }

          return { ...timeObject, seconds: timeObject.seconds + 1 };
        });
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [start]);

  return (
    <>
      <div>
        {TimePassed.minutes} : {TimePassed.seconds}
      </div>
      {/* <Button
        onClick={() => {
          start = false;
        }}
      >
        stop
      </Button> */}
    </>
  );
};
export default Counter;
