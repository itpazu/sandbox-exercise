import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { StyledPaper } from '../theme/styledPaper';

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
      <Stack
        direction='row'
        divider={<Divider orientation='vertical' />}
        spacing={3}
      >
        <StyledPaper padding={'45px'} width={80} elevation={2}>
          {TimePassed.minutes}
        </StyledPaper>
        <StyledPaper padding={'45px'} elevation={2} width={80}>
          {TimePassed.seconds}
        </StyledPaper>
      </Stack>
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
