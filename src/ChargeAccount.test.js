import React from 'react';
import ReactDOM from 'react-dom';
import ChargeAccount from './ChargeAccount';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ChargeAccount />, div);
});
