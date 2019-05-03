import React from 'react';
import { createCanal } from 'react-gondola';
import { FirstName } from './FirstName';
import { LastName } from './LastName';

// @ts-ignore
const SignInCanal = createCanal(
  { name: 'firstName', Component: FirstName },
  { name: 'lastName', Component: LastName }
);

export const SignIn = () => {
  return <SignInCanal />;
};
