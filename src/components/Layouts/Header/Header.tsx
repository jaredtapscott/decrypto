import React, { useState } from 'react';
import {
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
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
      Decrypto
    </Typography>
    {props.isLoggedIn ? (
      <div>
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
          <MenuItem onClick={Auth.logout}>Logout</MenuItem>
        </Menu>

      </div>
    ):(
        <Button color="inherit" onClick={Auth.login}>Login</Button>
    )}
  </Toolbar>
)};

export default Header;
