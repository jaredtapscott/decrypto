import React from 'react';
import styles from './CardSmall.module.scss';
import {Avatar} from '@mui/material';
import UserMenu from '../Menu/Menu';

const CardSmall = ({user} : {user:any}) => {
  return (
  <div className={styles.CardSmall} data-testid="CardSmall">
    <Avatar src={user.photoURL} alt={user.displayName} sx={{ width: 40, height: 40 }} />
  </div>
)};

export default CardSmall;
