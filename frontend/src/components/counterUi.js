import React from 'react';
import { Divider, Grid, Stack, Button } from '@mui/material';
import { StyledPaper } from '../theme/styledPaper';
import { formatTimeString } from '../data_models/helper';

const CounterUi = ({ timePassed, toggleStart }) => {
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
      <Button onClick={() => toggleStart()}>Abort</Button>
    </>
  );
};
export default CounterUi;
