import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

const Counter = ({ start, toggleStart }) => {
  const [TimePassed, setTimePassed] = useState({ seconds: 0, minutes: 0 });

  useEffect(() => {
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
      <Button
        onClick={() => {
          toggleStart(false);
        }}
      >
        stop
      </Button>
    </>
  );
};
export default Counter;
