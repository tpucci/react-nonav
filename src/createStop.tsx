import React, { Component as ReactComponent, createFactory, ComponentType } from 'react';
import { BackContext } from './Navigation/BackContext';
import { filter, share, tap } from 'rxjs/operators';
import { Navigation } from './Navigation';
import { CanalInterface } from './createCanal';
import { TransitionComponentType } from './transitions/Transition';
import { None } from './transitions';
import { StopComponentProps } from './Navigation/Stop';

export const createStop = (
  canal: CanalInterface,
  onBack: (() => any) | undefined,
  name: string,
  Component: ComponentType,
  props: object | undefined,
  Transitioner: TransitionComponentType = None
) => {
  /**
   * @TODO 2019-07-26 Update @types/react once https://github.com/DefinitelyTyped/DefinitelyTyped/pull is merged.
   */
  // @ts-ignore
  const factory = createFactory(Component);

  return class StopComponent extends ReactComponent<StopComponentProps> {
    back$ = canal.back$.pipe(
      filter(value => value.target === name),
      tap(() => {
        if (onBack) {
          Navigation.instance.backHandlerDelegate.setOnBackCallback(onBack);
        }
      }),
      share()
    );

    backSubscription = this.back$.subscribe();

    componentWillUnmount() {
      this.backSubscription.unsubscribe();
    }

    render() {
      return (
        <Transitioner directionForward={this.props.isAuthorized}>
          <BackContext.Provider
            value={{
              back$: this.back$,
            }}
          >
            {factory({ navigation: { goBack: onBack }, ...props })}
          </BackContext.Provider>
        </Transitioner>
      );
    }
  };
};
