import React, {useState, Suspense} from 'react';
import styles from './Dashboard.module.css';
import {Container, Typography, Toolbar, Box, FormControl, InputLabel, Select, SelectChangeEvent, MenuItem } from '@mui/material';
import CryptoPortfolio from '../../components/cards/CryptoPortfolio/Crypto_portfolio';

const Dashboard = () => {
  const [fiat, setFiat] = useState('USD');

  const updateFiat = async (event: SelectChangeEvent) => {
    setFiat(event.target.value);
  }

  return (
  <Container className={styles.Dashboard}>
    <Box sx={{ flexGrow: 1 }}>

      <Toolbar>
        <Typography variant="h5" sx={{flexGrow: 1}}>Coinbase Portfolio:</Typography> 
        <Box>
          <FormControl>
              <InputLabel id="currency_switcher">Currency</InputLabel>
              <Select
                labelId="currency_switcher"
                id="currency_switcher"
                value={fiat}
                label="Currency"
                onChange={updateFiat}
              >
                <MenuItem value={'USD'}>USD</MenuItem>
                <MenuItem value={"CAD"}>CAD</MenuItem>
                <MenuItem value={"EUR"}>EUR</MenuItem>
              </Select>
          </FormControl>
        </Box>
      </Toolbar>
    </Box>
    <Suspense fallback={<p>loading...</p>}>
      <CryptoPortfolio fiat={fiat} />
    </Suspense>
  </Container>
)};

export default Dashboard;
