import React from 'react';
import styles from './Price.module.css';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';

const Price = (props:any) => {
  if (props.loading) {
    return (
      <Box sx={{width: '50px', float: 'right', padding: '5px'}}>
        <LinearProgress color="inherit" />
      </Box>
    )
  } else {
    return (
      <Chip 
        variant={props.variant}
        className={styles.Price}
        label={`$${props.price} ${props.fiat}`}
      />
    )
  }
}
export default Price;
