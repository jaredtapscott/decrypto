import React, { useState } from 'react';
import styles from './App.module.css';
import { 
  getAuth, 
  onAuthStateChanged,
} from "firebase/auth";
import {
  Box,
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText 
} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {
  Link,
  Routes,
  Route
} from "react-router-dom";
import Header from './components/Layouts/Header/Header';
// Route Config
import routes from './utils/routes';

const drawerWidth = 240;

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
    return (
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
    )
}

export default App;
