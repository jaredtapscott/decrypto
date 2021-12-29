import React, { useState } from 'react';
import './App.css';
import Auth from './utils/auth';
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
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
          >
            <Header user={user} isLoggedIn={isLoggedIn}/>
          </AppBar>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            variant="permanent"
            anchor="left"
          >
            <Toolbar />
            <Divider />
            <List>
              {routes.map((route, i) => (
                <ListItem button key={i}>
                  <ListItemIcon>
                    {i % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <Link to={route.path}><ListItemText primary={route.title} /></Link>
                </ListItem>
              ))}
            </List>
          </Drawer>
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
        </Box>
    )
}

export default App;
