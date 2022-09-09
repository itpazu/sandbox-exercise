import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiSnackbar: {
      styleOverrides: {
        // root: {
        //     backgroundColor:
        // },
        anchorOriginTopRight: {
          top: '55px',
          '@media (min-width: 1000px)': {
            top: '2.5px',
          },
          '@media (min-width: 600px)': {
            top: '55px',
          },
        },
      },
    },
  },
});

export default function GlobalThemeOverride({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
