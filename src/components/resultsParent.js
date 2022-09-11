import React, { useState, forwardRef } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Tabs, Tab, Box } from '@mui/material';
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

  return (
    <>
      <TimerSnackBar fetchDuration={state?.timePassed} />

      <Box sx={{ width: '100%' }}>
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
        </Tabs>
      </Box>

      <Outlet />
    </>
  );
};

export default ResultsParent;
