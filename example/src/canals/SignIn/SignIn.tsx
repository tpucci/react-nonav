import React from 'react';
import { createCanal } from 'react-gondola';
import { FirstName } from './FirstName';
import { LastName } from './LastName';
import { Confirm } from './Confirm';
import { Observer } from 'mobx-react/native';
import { fromStream } from 'mobx-utils';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

// @ts-ignore
const SignInCanal = createCanal([
  { name: 'firstName', Component: FirstName },
  { name: 'lastName', Component: LastName },
  { name: 'confirm', Component: Confirm, isFullScreen: true }
]);

export const SignIn = () => {
  const lastNameAuth = fromStream(
    interval(1000).pipe(map(tick => tick % 4 === 0 || (tick + 1) % 4 === 0))
  );
  const confirmAuth = fromStream(
    interval(1000).pipe(map(tick => tick % 2 === 0))
  );
  return (
    <Observer>
      {() => (
        <SignInCanal
          firstName
          lastName={lastNameAuth.current}
          confirm={confirmAuth.current}
        />
      )}
    </Observer>
  );
};
