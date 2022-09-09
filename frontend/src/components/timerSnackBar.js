import React from 'react';
import Snackbar from '@mui/material/Snackbar';

export default function PositionedSnackbar({
  duration = { minutes: '', seconds: '' },
}) {
  const { vertical, horizontal } = {
    vertical: 'top',
    horizontal: 'right',
  };
  console.log(duration);
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical,
          horizontal,
        }}
        open={!!duration}
        message={`Request Time: ${duration.minutes}.${duration.seconds}`}
        key={vertical + horizontal}
      />
    </div>
  );
}
