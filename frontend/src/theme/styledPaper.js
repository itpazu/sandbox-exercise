import { styled } from '@mui/material/styles';
import { Paper, colors } from '@mui/material/';

export const StyledPaper = styled(Paper)(
  ({ padding, theme, width, fontSize }) => {
    return {
      textAlign: 'center',
      lineHeight: '60px',
      elevation: 2,
      padding,
      backgroundColor: colors.blue[300],
      width,
      fontSize,
    };
  }
);
