/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../Store';

const customRender = (ui, ...options) => (
  render(
    <Provider store={store}>
      <MemoryRouter>
        {ui}
      </MemoryRouter>
    </Provider>,
    ...options,
  )
);

export * from '@testing-library/react';
export { customRender as render };
