import React from 'react';
import Chip from '@mui/material/Chip';

export default function ClickableAndDeletableChips({ file }) {
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  return (
    <Chip
      label={file}
      variant='outlined'
      onClick={handleClick}
      onDelete={handleDelete}
    />
  );
}
