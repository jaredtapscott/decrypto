import React from 'react';
import styles from './Dashboard.module.css';
import {Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import Coinbase from '../../utils/coinbase';

// Get the Data
let response:any
Coinbase().then((res:any) => {
  res = res.filter((data:any) => data.balance > 0);
  console.log('filter: ', res);
  response = res;
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
            <TableCell align="right">Available</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {response?.map((row:any) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.currency}
              </TableCell>
              <TableCell align="right">{row.balance}</TableCell>
              <TableCell align="right">{row.available}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  </Container>
);

export default Dashboard;
