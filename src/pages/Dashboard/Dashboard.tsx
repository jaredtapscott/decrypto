import React from 'react';
import styles from './Dashboard.module.css';
import {Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import Coinbase from '../../utils/coinbase';

function createData(
  token: string,
  tokenPrice: number,
  amountIn: number,
  currentValue: number,
  profit: number,
) {
  return { token, tokenPrice, amountIn, currentValue, profit };
}

const rows = [
  createData('Bitcoin', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

let response:any
Coinbase().then((res:any) => {
  response = res;
});

response?.map((data:any) => {
  console.log('response: ', data)
});

const Dashboard = () => (
  <Container className={styles.Dashboard}>
    Dashboard Component: <strong>Add .ENV variables!!!!</strong>
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Token</TableCell>
            <TableCell align="right">Token Price</TableCell>
            <TableCell align="right">Invested</TableCell>
            <TableCell align="right">Current Value</TableCell>
            <TableCell align="right">Profit</TableCell>
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
              <TableCell align="right">{row.hold}</TableCell>
              <TableCell align="right">{row.available}</TableCell>
              <TableCell align="right">{row.profit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  </Container>
);

export default Dashboard;
