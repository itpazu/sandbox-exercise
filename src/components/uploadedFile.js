import React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import Popover from '@mui/material/Popover';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(() => ({
  textAlign: 'center',
  height: 60,
  lineHeight: '60px',
  padding: '5px',
}));

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
        sx={{ border: 'solid', maxWidth: '250px' }}
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
          alignItems='center'
          justifyContent='center'
        >
          <Item elevation={2}>size: {Math.floor(size * 0.001)} KB</Item>
          <Item elevation={2}>type: {type}</Item>
        </Stack>
      </Popover>
    </>
  );
}
