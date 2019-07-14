import React, { ComponentType, createFactory, FunctionComponent } from 'react';
import { BackContext, BackContextInterface } from './Navigation/BackContext';

export type WithBackContext<T> = T & {
  backContext: BackContextInterface;
};

export function withBackContext<P>(Component: ComponentType<P>): FunctionComponent<P> {
  /**
   * @TODO 2019-07-26 Update @types/react once https://github.com/DefinitelyTyped/DefinitelyTyped/pull is merged.
   */
  // @ts-ignore
  const factory = createFactory(Component);

  const HOC = (props: P) => (
    <BackContext.Consumer>
      {value => factory({ ...props, backContext: value })}
    </BackContext.Consumer>
  );

  HOC.displayName = 'WithBackContext';

  return HOC;
}
