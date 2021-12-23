import React from 'react';
import styles from './CardSmall.module.scss';
import {Avatar} from '@mui/material';
import Button from 'next/button';
import UserMenu from '../Menu/Menu';

const CardSmall = ({user}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event:any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  }
  return (
  <div className={styles.CardSmall} data-testid="CardSmall">
    <Avatar src={user.photoURL} alt={user.displayName} sx={{ width: 40, height: 40 }} />
  </div>
)};

export default CardSmall;
