import React from 'react';
import ReactDOM from 'react-dom';
import SideDrawer from './SideDrawer';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SideDrawer />, div);
  ReactDOM.unmountComponentAtNode(div);
});