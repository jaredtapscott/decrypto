import React, { useState, useEffect } from 'react';
import styles from './Price.module.css';
import api from '../../utils/coinbase';
import Chip from '@mui/material/Chip';


const Price = (props:any) => {
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      let res:any = await api.getPrice(props.crypto, props.fiat);
      setPrice(res.amount);
      setLoading(false);
    };
    getData();
  }, [props.fiat])

  // send price back to parent component
  props.receivePrice(price);


  if (loading) {
    return (
        <Chip label="Loading..." />
    )
  } else {
    return (
      <Chip 
        className={styles.Price}
        label={`$${price} ${props.fiat}`}
      />
    )
  }
}
export default Price;
