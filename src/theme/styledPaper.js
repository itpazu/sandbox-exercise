import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

export const StyledPaper = styled(Paper)(
  ({ padding, theme, width, fontSize }) => {
    return {
      textAlign: 'center',
      lineHeight: '60px',
      elevation: 2,
      padding,
      backgroundColor: theme.palette.primary.light,
      width,
      fontSize,
    };
  }
);
