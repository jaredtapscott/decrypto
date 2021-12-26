import React from 'react';
import './App.css';
import Header from './components/Layouts/Header/Header';
import { Container } from '@mui/material';

function App() {
  return (
    <div className="App">
      <Header />
      <Container maxWidth="lg">
        <p>start here...</p>
      </Container>
    </div>
  );
}

export default App;
