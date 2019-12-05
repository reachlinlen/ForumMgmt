import React from 'react';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { render } from '../../unittest/customRendererWithStore';
import Login from '../ManualLogin';
//
const utils = render(<Login />);
//
const setUp = () => {
  const userName = utils.getByLabelText('Username');
  const password = utils.getByLabelText('Password');
  const loginBtn = utils.getByTestId('loginBtn');
  return {
    userName, password, loginBtn, ...utils,
  };
};
//
test('value changed in Username input field', () => {
  const { userName } = setUp();
  fireEvent.change(userName, { target: { value: 'abc@a.com' } });
  expect(userName.value).toBe('abc@a.com');
});
//
test('value changed in Password input field', () => {
  const { password } = setUp();
  fireEvent.change(password, { target: { value: 'Trees$99' } });
  expect(password.value).toBe('Trees$99');
});
//
test(`login button not fired when Username
 doesnot match the criteria`, () => {
  const { userName, password, loginBtn } = setUp();
  fireEvent.change(userName, { target: { value: 'abc@acom' } });
  fireEvent.change(password, { target: { value: 'Trees$99' } });
  fireEvent.click(loginBtn);
});
//
test(`login button not fired when password
 doesnot match the criteria`, () => {
  const { userName, password, loginBtn } = setUp();
  fireEvent.change(userName, { target: { value: 'abc@a.com' } });
  fireEvent.change(password, { target: { value: 'Trees9999' } });
  fireEvent.click(loginBtn);
});
//
test(`login button fired when both username &
password match the criteria`, () => {
  //mock out authenticate api call
  const fakeRespAuthenticated = { data: true };
  // const authenticate = jest.fn();
  const updateAuthenticate = jest.fn();
  jest.spyOn(Login, 'authenticate').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve(fakeRespAuthenticated),
  }));
  const { userName, password, loginBtn } = setUp();
  fireEvent.change(userName, { target: { value: 'abc@a.com' } });
  fireEvent.change(password, { target: { value: 'Trees$9999' } });
  fireEvent.click(loginBtn);
  expect(updateAuthenticate).toHaveBeenCalledTimes(1);
});
//
