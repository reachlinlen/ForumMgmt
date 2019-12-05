import React from 'react';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { render } from '../../unittest/customRendererWithStore';
import Login from '../ManualLogin';
//
const mockHandleSubmit = jest.fn();
const utils = render(<Login handleSubmit={mockHandleSubmit} />);
//
const userNameSetUp = () => {
  const userName = utils.getByLabelText('Username');
  return {
    userName, ...utils,
  };
};
//
const passwordSetUp = () => {
  const password = utils.getByLabelText('Password');
  return {
    password, ...utils,
  };
};
//
const loginBtnSetUp = () => {
  const loginbtn = utils.getByTestId('loginBtn');
  return {
    loginbtn, ...utils,
  };
};
//
test('value changed in Username input field', () => {
  const { userName } = userNameSetUp();
  fireEvent.change(userName, { target: { value: 'abc@a.com' } });
  expect(userName.value).toBe('abc@a.com');
});
//
test('value changed in Password input field', () => {
  const { password } = passwordSetUp();
  fireEvent.change(password, { target: { value: 'Trees$99' } });
  expect(password.value).toBe('Trees$99');
});
//
test(`login button not fired when Username
 doesnot match the criteria`, () => {
  const { userName } = userNameSetUp();
  const { password } = passwordSetUp();
  const { loginbtn } = loginBtnSetUp();
  fireEvent.change(userName, { target: { value: 'abc@acom' } });
  fireEvent.change(password, { target: { value: 'Trees$99' } });
  fireEvent.click(loginbtn, { button: 2 });
  expect(mockHandleSubmit.mock.calls.length).toBe(0);
});

