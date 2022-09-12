import React, { useState, forwardRef } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import TimerSnackBar from './timerSnackBar';

export const RouterLinkWithProps = forwardRef((props, ref) => (
  <Link ref={ref} to='/' {...props} role={undefined} />
));

const ResultsParent = () => {
  const { state } = useLocation();
  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };
  console.log(state);
  const { name: fileName, size: fileSize, type: fileType } = state;
  return (
    <>
      <TimerSnackBar fetchDuration={state?.timePassed} />
      <Box>
        <Tabs value={value} onChange={handleChange}>
          <Tab
            state={{ ...state }}
            to='doughnut'
            label='Summary'
            component={RouterLinkWithProps}
          />
          <Tab
            state={{ ...state }}
            component={RouterLinkWithProps}
            label='Table'
            to='table'
          />
          <Tab
            state={{ ...state }}
            component={RouterLinkWithProps}
            label='Email Results'
            to='email'
          />
        </Tabs>

        <Typography variant='h6' sx={{ textAlign: 'center', marginTop: '2px' }}>
          {`Scan results for file ${fileName} / ${fileType} / ${fileSize}`}
        </Typography>
      </Box>

      <Outlet />
    </>
  );
};

export default ResultsParent;
