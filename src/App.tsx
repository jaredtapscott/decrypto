import React from 'react';
import './App.css';
import SideDrawer from './components/Layouts/SideDrawer/SideDrawer';
import { Container } from '@mui/material';
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <SideDrawer />
      <Container maxWidth="lg" className="App">
        <p>start here...</p>
      </Container>
    </BrowserRouter>
  );
}

export default App;
