import React from 'react';
import ReactDOM from 'react-dom';
import SingleCrypto from './SingleCrypto';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SingleCrypto />, div);
  ReactDOM.unmountComponentAtNode(div);
});