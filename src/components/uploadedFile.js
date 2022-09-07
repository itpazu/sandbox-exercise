import React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import Popover from '@mui/material/Popover';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { StyledPaper } from '../theme/styledPaper';

export default function ClickableAndDeletableChips({ file, handleDelete }) {
  const { name, size, type } = file;

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = ({ target }) => {
    setAnchorEl(target);
  };

  const handlePopoverOpen = ({ target }) => {
    setAnchorEl(target);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Chip
        sx={{ maxWidth: '250px' }}
        size='Large'
        label={name}
        variant='outlined'
        onClick={handleClick}
        onDelete={handleDelete}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      />
      <Popover
        id='mouse-over-popover'
        sx={{
          pointerEvents: 'none',
        }}
        open={!!anchorEl}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Stack
          direction='row'
          divider={<Divider orientation='vertical' flexItem />}
        >
          <StyledPaper elevation={2} padding={'15px'}>
            size: {Math.floor(size * 0.001)} KB
          </StyledPaper>
          <StyledPaper padding={'15px'} elevation={2}>
            type: {type}
          </StyledPaper>
        </Stack>
      </Popover>
    </>
  );
}
