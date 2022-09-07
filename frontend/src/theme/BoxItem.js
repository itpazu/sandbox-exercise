import React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const Item = styled(Box)(({ top, left, width }) => {
  return {
    position: 'fixed',
    top: top,
    left: left,
    width,
    transform: 'translate(-50%, -50%)',
  };
});

export default function BoxItem({
  children,
  topPosition,
  leftPosition,
  width,
}) {
  return (
    <Item top={topPosition} left={leftPosition} width={width}>
      {children}
    </Item>
  );
}
