import { createTheme } from '@mui/material/styles';

const CustomTheme = (prefersDarkMode:any) => {
  const Theme = createTheme({
    palette: {
      mode: prefersDarkMode ? 'dark' : 'light',
      primary: {
        light: '#757ce8',
        main: '#3f50b5',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: prefersDarkMode ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)',
            borderBottomColor: prefersDarkMode ? '#000' : '#eee',
          }
        }
      },
    },
  })
    
  return {
    theme: Theme
  };
};

export default CustomTheme;