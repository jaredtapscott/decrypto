import React from 'react';
import './App.css';
import SideDrawer from './components/Layouts/SideDrawer/SideDrawer';
import { Container } from '@mui/material';

function App() {
  return (
    <div className="App">
      <SideDrawer />
      <Container maxWidth="lg">
        <p>start here...</p>
      </Container>
    </div>
  );
}

export default App;
