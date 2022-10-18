import React from 'react';
import Snackbar from '@mui/material/Snackbar';

export default function PositionedSnackbar({ fetchDuration }) {
  const { vertical, horizontal } = {
    vertical: 'top',
    horizontal: 'right',
  };
  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical,
          horizontal,
        }}
        open={!!fetchDuration}
        message={`Request Time: ${fetchDuration?.minutes}m : ${fetchDuration?.seconds}s`}
        key={vertical + horizontal}
      />
    </>
  );
}
