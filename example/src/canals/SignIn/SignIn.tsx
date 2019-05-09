import React from 'react';
import { createCanal } from 'react-gondola';
import { FirstName } from './FirstName';
import { LastName } from './LastName';
import { Observer } from 'mobx-react/native';
import { fromStream } from 'mobx-utils';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

// @ts-ignore
const SignInCanal = createCanal([
  { name: 'firstName', Component: FirstName },
  { name: 'lastName', Component: LastName }
]);

export const SignIn = () => {
  const delayedAuth = fromStream(
    interval(1000).pipe(map(tick => tick % 2 === 0))
  );
  return (
    <Observer>
      {() => <SignInCanal firstName lastName={delayedAuth.current} />}
    </Observer>
  );
};
