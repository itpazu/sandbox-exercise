import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Box)(({ top, left, width, minWidth, maxWidth, theme }) => {
  return {
    position: 'fixed',
    top: top || 'clamp(170px, 50vh,  700px)',
    left: left || 'clamp(200px, 50%, 1200px)',
    width,
    transform: 'translate(-50%, -50%)',
    minWidth,
    maxWidth,
    minHeight: '165px',
    '@media screen and (max-width: 380px)': {
      left: '50%',
    },
  };
});
export default function BoxItem({
  children,
  topPosition,
  leftPosition,
  width,
  minWidth,
  maxWidth,
}) {
  return (
    <Item
      top={topPosition}
      left={leftPosition}
      width={width}
      minWidth={minWidth}
      maxWidth={maxWidth}
    >
      {children}
    </Item>
  );
}
