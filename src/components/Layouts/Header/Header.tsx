import React, { useState } from 'react';
import {
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Auth from '../../../utils/auth';

function Header(props:any) {
  // Set State Variables
  const [isLoggedIn, setLogin] = useState(false);
  const [user, setUser] = useState({});
  console.log('header props: ', props.name);

  const login = async () => {
    let res = await Auth.login();
    setUser(res);
    setLogin(true);
    console.log('login', isLoggedIn);
  }
  const logout = async () => {
    let res = await Auth.logout();
    setUser(res);
    setLogin(false);
    console.log('logout', isLoggedIn);
  }
  return (
  <Toolbar>
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      sx={{ mr: 2 }}
    >
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      Dashboard
    </Typography>
    {isLoggedIn ? (
      <div>
        <Button color="inherit" onClick={logout}><Avatar alt={props.user.displayName} src={props.user.photoURL} /></Button>
      </div>
    ):(
        <Button color="inherit" onClick={login}>Login</Button>
    )}
  </Toolbar>
)};

export default Header;
