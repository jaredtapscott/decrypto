import React, { useState, useEffect } from 'react';
import styles from './Crypto_portfolio.module.css';
import Price from '../../Price/Price';
import api from '../../../utils/apis/coinbase';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableFooter, Paper} from '@mui/material';

api.getCrypto('USD');


const CryptoPortfolio = (props:any) => {
  let initData = {list: [], total: 0}
  const [data, setData] = useState(initData)
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    const getCrypto = async (fiat:string) => {
      try {
        setData(data);
        setLoading(true);
        let res = await api.createPortfolio(fiat, 'pro');
        setData(res);
        setLoading(false);
      } catch (e) {
        setData(data);
        console.log(e);
      }
    };    
    getCrypto(props.fiat);
  },[props.fiat]);

  return (
  <div className={styles.Crypto_portfolio}>
    <TableContainer component={Paper} >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Coinbase Pro Portfolio</TableCell>
            <TableCell align="right">Balance</TableCell>
            <TableCell align="right">Current Price</TableCell>
            <TableCell align="right">Total Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {data?.list.map((row:any, i:number) => ( 
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.currency}
              </TableCell>
              <TableCell align="right">{row.balance}</TableCell>
              <TableCell align="right" max-width="50px">
                <Price loading={loading} price={row.price} fiat={props.fiat} />
              </TableCell>
              <TableCell align="right" sx={{maxWidth: '50px'}}>
                <Price loading={loading} price={row.value} fiat={props.fiat} />
              </TableCell>
            </TableRow>
          ))} 
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} variant="footer"></TableCell>
            <TableCell variant="footer" align="right"  className={styles.footer}>
            <Price variant='outlined' loading={loading} price={data.total} fiat={props.fiat} />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    
  </div>
)};

export default CryptoPortfolio;
