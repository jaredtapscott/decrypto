import React, { useState, useEffect } from 'react';
import styles from './Crypto_portfolio.module.css';
import Price from '../../Price/Price';
import api from '../../../utils/apis/coinbase';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableFooter, Paper} from '@mui/material';

const CryptoPortfolio = (props:any) => {
  let initData = {list: [], total: 0}
  const [data, setData] = useState(initData)
  const [loading, setLoading] = useState(false);

  let title: any;
  if (props.platform === 'pro') {
    title = "Coinbase Pro Portfolio";
  } else {
    title = "Coinbase Portfolio";
  }

  
  useEffect(() => {
    const getCrypto = async (fiat:string) => {
      try {
        setData(data);
        setLoading(true);
        let res: any;
        res = await api.createPortfolio(fiat, props.platform);
        setData(res);
        props.getTotal({platform: title, total: parseInt(res.total)})
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
    <h2>{title}</h2>
    <TableContainer component={Paper} sx={{ maxHeight: 510 }} >
      <Table stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Token</TableCell>
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
              <TableCell align="right" sx={{width: '175px'}}>
                <Price loading={loading} price={row.price} fiat={props.fiat} />
              </TableCell>
              <TableCell align="right" sx={{width: '175px'}}>
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
    <div>{ data.total }</div>
  </div>
)};

export default CryptoPortfolio;
