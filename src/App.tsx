import React, { useState } from 'react';
// styles
import styles from './App.module.css';
import Header from './components/Layouts/Header/Header';
import { ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CustomTheme from './utils/theme';
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
} from '@mui/material';
// firebase
import { 
  getAuth, 
  onAuthStateChanged,
} from "firebase/auth";
// routing
import {
  Routes,
  Route
} from "react-router-dom";
// Route Config
import routes from './utils/routes';


const App = () => {  

  // Set the current user
  const auth = getAuth();
  const [isLoggedIn, setLogin] = useState(false);
  const [user, setUser] = useState<null | Object>(null); 
  // Watch for any change in current user
  onAuthStateChanged(auth, (res => {
    if (res) {
      setUser(res);
      setLogin(true);
    } else {
      setUser(res);
      setLogin(false);
    }
  }))

  // setup dark vs light mode detector
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  React.useMemo(() => {
    CustomTheme(prefersDarkMode);
  },[prefersDarkMode]);

    return (
      <ThemeProvider theme={CustomTheme(prefersDarkMode).theme}>

        <Box>
        {isLoggedIn ? (
          <div>
            <CssBaseline />
            <AppBar
              className={styles.header} 
              position="fixed"
              color="transparent" 
            >
              <Header user={user} isLoggedIn={isLoggedIn} routes={routes}/>
            </AppBar>

            <Box
              component="main"
              sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
              <Toolbar />
              <Routes>
              {routes.map((route, i) => (
                <Route key={i} path={route.path} element={route.element} />
              ))}
              </Routes>
            </Box>
            </div>
        ):(
          <AppBar position="fixed" color="transparent">
            <Header user={user} isLoggedIn={isLoggedIn}/>
          </AppBar>
      )}
        </Box>
      </ThemeProvider>
    )
}

export default App;
