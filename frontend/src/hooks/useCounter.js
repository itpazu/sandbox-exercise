import { useState, useEffect } from 'react';

const useCounter = (bool) => {
  const [start, setStart] = useState(bool);
  const [timePassed, setTimePassed] = useState({ seconds: 0, minutes: 0 });

  const toggleStart = () => setStart((prev) => !prev);

  useEffect(() => {
    let interval = setInterval(() => {
      setTimePassed((timeObject) => {
        let newTime;
        if (timeObject.seconds && timeObject.seconds % 59 === 0) {
          newTime = { minutes: timeObject.minutes + 1, seconds: 0 };
        } else {
          newTime = { ...timeObject, seconds: timeObject.seconds + 1 };
        }
        return newTime;
      });
    }, 1000);

    return () => {
      console.log(interval);
      clearInterval(interval);
    };
  }, [start]);

  return [timePassed, toggleStart];
};
export default useCounter;
