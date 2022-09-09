import React, { useState, useEffect } from 'react';
import { Divider, Grid, Stack } from '@mui/material';
import { StyledPaper } from '../theme/styledPaper';
import { formatTimeString } from '../data_models/helper';

const Counter = ({ start, getFinalTime }) => {
  const [timePassed, setTimePassed] = useState({ seconds: 0, minutes: 0 });

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

  // const formatTimeString = (timeElm) => {
  //   const twoDigitsTime =
  //     timeElm.toString().length < 2 ? `0${timeElm}` : timeElm;
  //   return twoDigitsTime;
  // };

  return (
    <>
      <Stack
        direction='row'
        divider={<Divider orientation='vertical' flexItem />}
        spacing={1}
      >
        {Object.entries(timePassed)
          .sort()
          .map(([key, val]) => {
            return (
              <Grid align='center' key={key}>
                <StyledPaper key={val} width={'50%'} fontSize={'30px'}>
                  {key.slice(0, 3).toUpperCase()}
                </StyledPaper>

                <StyledPaper
                  padding={'45px'}
                  fontSize={'60px'}
                  width={80}
                  elevation={5}
                  key={key + val}
                >
                  {formatTimeString(val)}
                </StyledPaper>
              </Grid>
            );
          })}
      </Stack>
    </>
  );
};
export default Counter;
