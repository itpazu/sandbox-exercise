import React, { useState, forwardRef, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Tabs, Tab, Box, useMediaQuery, useTheme } from '@mui/material';
import TimerSnackBar from './timerSnackBar';
import FileDetailsCard from './fileDetailsCard';
import DrawerComponent from './drawerMenu';

export const RouterLinkWithProps = forwardRef((props, ref) => (
  <Link ref={ref} {...props} />
));

const ResultsParent = () => {
  const { state = undefined } = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!state) navigate('/');
  });
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

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
        {isSmallScreen ? (
          <DrawerComponent state={state} />
        ) : (
          <Tabs
            value={value}
            onChange={handleChange}
            sx={{
              display: { xs: 'none', sm: 'none', md: 'block' },
            }}
          >
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
        )}

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
