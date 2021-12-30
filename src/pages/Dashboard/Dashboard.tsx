import React from 'react';
import styles from './Dashboard.module.css';
import {Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import api from '../../utils/coinbase';

// Get the Data
let data:any;
api.getCrypto().then((res:any) => {
  data = res;
});

const Dashboard = () => (
  <Container className={styles.Dashboard}>
    <h2>Coinbase Portfolio:</h2> 
    <p><strong>Add .ENV variables!!!!</strong></p>
    <TableContainer component={Paper} >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Token</TableCell>
            <TableCell align="right">Balance</TableCell>
            <TableCell align="right">Current Price ({data?data[0].details.quote_currency:'USD'})</TableCell>
            <TableCell align="right">Total Value ({data?data[0].details.quote_currency:'USD'})</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row:any) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.currency}
              </TableCell>
              <TableCell align="right">{row.balance}</TableCell>
              <TableCell align="right">$1.00</TableCell>
              <TableCell align="right">$2.00</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  </Container>
);

export default Dashboard;
