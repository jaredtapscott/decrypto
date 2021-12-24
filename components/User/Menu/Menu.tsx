import React from 'react';
import styles from './Menu.module.scss';
import {Button, Menu, MenuItem} from '@mui/material';
import CardSmall from '../CardSmall/CardSmall';
import Link from 'next/link';

const UserMenu = ({user} : {user:any}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={styles.Menu} data-testid="Menu">
      <Button
        className={styles.btn} 
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <CardSmall user={user} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}><Link href="auth/profile">Profile</Link></MenuItem>
        <MenuItem onClick={() => {
                    user.signOut()
                  }}>Logout</MenuItem>
      </Menu>
    </div>
)};

export default UserMenu;
