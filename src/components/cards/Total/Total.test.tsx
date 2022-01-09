import React from 'react';
import ReactDOM from 'react-dom';
import Total from './Total';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Total />, div);
  ReactDOM.unmountComponentAtNode(div);
});