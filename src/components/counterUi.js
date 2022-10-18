import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Divider, Grid, Stack, Button } from '@mui/material';
import { StyledPaper } from '../theme/styledPaper';
import { formatTimeString } from '../data_models/helper';

const CounterUi = ({ timePassed, toggleStart }) => {
  const navigate = useNavigate();
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
                <StyledPaper
                  key={val}
                  width={'6vw'}
                  fontSize={'2vmax'}
                  padding={'1vmin'}
                >
                  {key.slice(0, 3).toUpperCase()}
                </StyledPaper>

                <StyledPaper
                  padding={'3vmin'}
                  fontSize={'3vmax'}
                  width={'10vw'}
                  elevation={5}
                  key={key + val}
                >
                  {formatTimeString(val)}
                </StyledPaper>
              </Grid>
            );
          })}
      </Stack>
      <Button
        onClick={() => {
          toggleStart();
          navigate('/');
        }}
      >
        Abort
      </Button>
    </>
  );
};

export default CounterUi;
