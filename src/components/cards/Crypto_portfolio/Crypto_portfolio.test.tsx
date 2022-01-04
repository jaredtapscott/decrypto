import React from 'react';
import ReactDOM from 'react-dom';
import Crypto_portfolio from './Crypto_portfolio';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Crypto_portfolio />, div);
  ReactDOM.unmountComponentAtNode(div);
});