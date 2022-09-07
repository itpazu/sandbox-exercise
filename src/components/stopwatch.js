import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { StyledPaper } from '../theme/styledPaper';
import BoxItem from '../theme/BoxItem';

const Counter = ({ start, toggleStart }) => {
  const [TimePassed, setTimePassed] = useState({ seconds: 0, minutes: 0 });
  const [position, setPosition] = useState({
    topPosition: '50%',
    leftPosition: '50%',
    fontSize: '30px',
  });

  useEffect(() => {
    let interval;
    if (!start) {
      clearInterval(interval);
      setPosition({ topPosition: '25%', leftPosition: '15%' });
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
      <BoxItem
        topPosition={position.topPosition}
        leftPosition={position.leftPosition}
      >
        <Stack
          direction='row'
          divider={<Divider orientation='vertical' />}
          spacing={0}
        >
          <Grid align='center'>
            <StyledPaper width={'50%'} fontSize={'30px'}>
              MIN
            </StyledPaper>

            <StyledPaper
              padding={'45px'}
              fontSize={'60px'}
              width={80}
              elevation={5}
            >
              {TimePassed.minutes}
            </StyledPaper>
          </Grid>

          <Grid align='center'>
            <StyledPaper width={'50%'} fontSize={'30px'}>
              SEC
            </StyledPaper>
            <StyledPaper
              fontSize={'60px'}
              padding={'45px'}
              elevation={5}
              width={80}
            >
              {TimePassed.seconds}
            </StyledPaper>
          </Grid>
        </Stack>
        <Button
          onClick={() => {
            toggleStart(false);
          }}
        >
          stop
        </Button>
      </BoxItem>
    </>
  );
};
export default Counter;
