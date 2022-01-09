import React from 'react';
import styles from './Price.module.css';
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton';

const Price = (props:any) => {
  if (props.loading) {
    return (

      <Skeleton animation="wave"  variant="text" sx={{float: 'right'}}>
        <Chip 
          className={styles.Price}
          label="12345.67890"
        />
      </Skeleton>

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
