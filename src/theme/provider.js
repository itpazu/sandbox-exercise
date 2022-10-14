import React from 'react';
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material/styles';

let theme = createTheme({
  components: {
    MuiSnackbar: {
      styleOverrides: {
        root: {
          '& .MuiSnackbarContent-root': {
            '@media (min-width: 600px)': {
              minWidth: 'fit-content',
            },
          },
        },
        anchorOriginTopRight: {
          '@media (min-width: 335px)': {
            maxWidth: 'fit-content',
            top: '10vh',
            right: '10px',
            left: 'auto',
          },
          '@media (min-width: 900px)': {
            maxWidth: 'fit-content',
            right: '40vw',
          },
          '@media (max-width: 335px)': {
            display: 'none',
          },
          '@media screen and (max-height: 530px)': {
            display: 'none',
          },
        },
      },
    },
  },
});
theme = responsiveFontSizes(theme);
console.log(theme.components.MuiSnackbar);
export default function GlobalThemeOverride({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
