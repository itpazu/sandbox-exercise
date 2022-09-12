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
        // root: {
        //     backgroundColor:
        // },
        anchorOriginTopRight: {
          top: '90vh',
          '@media (min-width: 1000px)': {
            top: '2.5px',
          },
          '@media (min-width: 600px)': {
            top: '52px',
          },
        },
      },
    },
  },
});
theme = responsiveFontSizes(theme);
export default function GlobalThemeOverride({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
