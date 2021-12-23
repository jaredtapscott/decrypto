import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CardSmall from './User/CardSmall';

describe('<CardSmall />', () => {
  test('it should mount', () => {
    render(<CardSmall />);
    
    const userCardSmall = screen.getByTestId('CardSmall');

    expect(userCardSmall).toBeInTheDocument();
  });
});