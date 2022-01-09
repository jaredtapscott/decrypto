import React from 'react';
import styles from './Total.module.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Total = (props:any) => (
  <Card>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        { props.source }
      </Typography>
      <Typography variant="h5" component="div">${props.data}</Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.fiat}
        </Typography>

    </CardContent>
  </Card>
);

export default Total;
