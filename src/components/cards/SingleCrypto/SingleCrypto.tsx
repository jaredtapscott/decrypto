import React, { useEffect, useState } from 'react';
import styles from './SingleCrypto.module.css';
import api from '../../../utils/apis/coinbase';

/**
 * @name SingleCrypto
 * @description A component to provide data for a single cryptocurrency
 * @param props - 2 properties are expected: 1) "crypto": a string with the desired crypto symbol and 2) "fiat": a string of the base fiat currency
 * @returns 
 */
const SingleCrypto = (props:any) => {
  const [price, setPrice] = useState(0);

  
  useEffect(() => {
    const getData = async () => {
      let res:any = await api.getPrice(props.crypto, props.fiat);
      setPrice(res.amount);
      price.toFixed(2);
    };
    getData();
  }, [props])
  
  return (
    <div className={styles.SingleCrypto}>
      <div>{props.crypto} is {price} {props.fiat}</div>
    </div>
  )
};

export default SingleCrypto;
