import { createTheme } from '@mui/material';


export const ThemeDark = createTheme({
  palette: {
    mode: 'dark',
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});