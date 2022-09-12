import React, { useState, forwardRef, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Tabs, Tab, Box } from '@mui/material';
import TimerSnackBar from './timerSnackBar';
import FileDetailsCard from './fileDetailsCard';

export const RouterLinkWithProps = forwardRef((props, ref) => (
  <Link ref={ref} to='/' {...props} role={undefined} />
));

const ResultsParent = () => {
  const { state = undefined } = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!state) navigate('/');
  });

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const {
    name: fileName = '',
    size: fileSize = '',
    type: fileType = '',
  } = state || { fileName: '', fileSize: '', fileType: '' };
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

        <FileDetailsCard
          fileName={fileName}
          fileSize={fileSize}
          fileType={fileType}
          rows={false}
        />
      </Box>

      <Outlet />
    </>
  );
};

export default ResultsParent;
