import React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const Item = styled(Box)(({ top, left }) => ({
  position: 'fixed',
  top: top,
  left: left,
  transform: 'translate(-50%, -50%)',
  // fontSize: 100,
}));

export default function BoxItem({ children, topPosition, leftPosition }) {
  return (
    <Item top={topPosition} left={leftPosition}>
      {children}
    </Item>
  );
}
