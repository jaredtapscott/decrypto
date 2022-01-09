import React, {useState, Suspense, useEffect} from 'react';
import styles from './Dashboard.module.css';
import {Container, Grid, Typography, Toolbar, Box, FormControl, InputLabel, Select, SelectChangeEvent, MenuItem } from '@mui/material';
import CryptoPortfolio from '../../components/cards/CryptoPortfolio/Crypto_portfolio';
import Total from '../../components/cards/Total/Total';

const Dashboard = () => {

  const [fiat, setFiat] = useState('USD');
  const [totals, setTotals] = useState<any[]>([]);
  const [grandTotal, setGrandTotal] = useState<any>(0);
  
  const updateFiat = async (event: SelectChangeEvent) => {
    setFiat(event.target.value);
  }

  // Grab totals from each Cryptocurrency portfolio
  // return an object (i.e. {platform: 'v2', total: '1234.00'})
  const getTotal = (data:any) => {
    setTotals(prevArray => [...prevArray, data])
    setGrandTotal((prev:any) => prev + data.total);
  }

  // update if fiat changes
  useEffect(() => {
    // empty the totals array and grandTotal if the fiat changes
    setTotals([]);
    setGrandTotal(0);
  }, [fiat])
    

  return (
  <Container className={styles.Dashboard}>
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar>
        <Typography variant="h5" sx={{flexGrow: 1}}>Jared's Portfolio:</Typography> 
        <Box>
          <FormControl>
              <InputLabel id="currency_switcher">Currency</InputLabel>
              <Select
                labelId="currency_switcher"
                id="currency_switcher"
                value={fiat}
                label="Currency"
                autoWidth
                onChange={updateFiat}
              >
                <MenuItem value={'USD'}>USD</MenuItem>
                <MenuItem value={"CAD"}>CAD</MenuItem>
                <MenuItem value={"EUR"}>EUR</MenuItem>
              </Select>
          </FormControl>
        </Box>
      </Toolbar>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Total data={grandTotal} fiat={fiat} source="Grand Total" />
        </Grid>
        {totals?.map((item:any, i:number) => (
        <Grid  key={i} item xs={4}>
          <Total data={item.total} fiat={fiat} source={item.platform} />
        </Grid>
        ))}
      </Grid>

      <Suspense fallback={<p>loading...</p>}>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CryptoPortfolio platform="pro" fiat={fiat} getTotal={getTotal} />
          </Grid>
          <Grid item xs={6}>
            <CryptoPortfolio platform="v2" fiat={fiat}  getTotal={getTotal} />
          </Grid>
        </Grid>

      </Suspense>
    </Box>
  </Container>
)};

export default Dashboard;
