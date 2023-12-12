import { experimental_extendTheme as extendTheme} from '@mui/material/styles';

// Create a theme instance.

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#1976d2',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#000',
        },
      },
    },
  },
});

export default theme;