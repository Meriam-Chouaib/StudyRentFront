import { Theme } from '@mui/material';
export function TextField(theme: Theme) {
  return {
    MuiTextField: {
      root: {
        StylesOverrides: {
          backgroundColor: theme.palette.secondary.main,
          color: '#000000',
          fontSize: '18px',
          fontFamily: 'poppins',
        },
      },
    },
  };
}
