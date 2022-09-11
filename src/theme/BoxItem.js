import React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const Item = styled(Box)(({ top, left, width, minWidth, maxWidth }) => {
  return {
    position: 'fixed',
    top: top,
    left: left,
    width,
    transform: 'translate(-50%, -50%)',
    minWidth,
    maxWidth,
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
