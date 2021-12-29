import React, { useState } from 'react';
import styles from './Header.module.css';
import {
  NavLink,
} from "react-router-dom";
import {
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Auth from '../../../utils/auth';

function Header(props:any) {
  
  // Trigger UserMenu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // to open the user menu
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log('routes: ', props.routes);

  return (
  <Toolbar className={styles.Header}>
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      sx={{ mr: 2 }}
    >
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" component="div">
      Decrypto
    </Typography>
    <Box sx={{ flexGrow: 1 }} />
    {props.isLoggedIn ? (
      <Box>
        <Button onClick={handleClick}>
            <Avatar alt={props.user?.displayName} src={props.user?.photoURL} />
        </Button>
        <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        >
        {props.routes?.map((route:any, i:number) => (
          <MenuItem onClick={handleClose}><NavLink to={route.path}>{route.title}</NavLink></MenuItem>
        ))}
          <MenuItem onClick={Auth.logout}>Logout</MenuItem>
        </Menu>

      </Box>
    ):(
        <Button color="inherit" onClick={Auth.login}>Login</Button>
    )}
  </Toolbar>
)};

export default Header;
