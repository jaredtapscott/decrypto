import React, { useState, useEffect } from 'react';
import styles from './Crypto_portfolio.module.css';
import Price from '../../Price/Price';
import api from '../../../utils/coinbase';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableFooter, Paper} from '@mui/material';

let data:any;
const getCrypto = async (fiat:string) => {
  try {
    let res = await api.getCrypto(fiat);
    data = res;
    console.log('getCrypto', data);
    return data;
  } catch (e) {
    console.log(e);
  }
};
getCrypto('USD');

const CryptoPortfolio = (props:any) => {
  const [cryptoPrice, setPrice] = useState('');

  const receivePrice = (price:any) => {
    return price;
  }

  console.log('Crypto Rendered', data);
  return (
  <div className={styles.Crypto_portfolio}>
    <TableContainer component={Paper} >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Token</TableCell>
            <TableCell align="right">Balance</TableCell>
            <TableCell align="right">
              Current Price ({props.fiat})
            </TableCell>
            <TableCell align="right">Total Value ({props.fiat})</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {data && data.map((row:any, i:number) => ( 
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.currency}
              </TableCell>
              <TableCell align="right">{row.balance}</TableCell>
              <TableCell align="right">
                <Price crypto={row.currency} fiat={props.fiat} receivePrice={receivePrice}/>
              </TableCell>
              <TableCell align="right">
                $ Value TBD
              </TableCell>
            </TableRow>
          ))} 
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}></TableCell>
            <TableCell>Total: {data?.total} </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    
  </div>
)};

export default CryptoPortfolio;
