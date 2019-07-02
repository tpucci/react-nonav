import React, {
  Component as ReactComponent,
  createFactory,
  ComponentType
} from 'react';
import { BackContext } from './Navigation/BackContext';
import { View, StyleSheet } from 'react-native';
import { filter, share, tap } from 'rxjs/operators';
import { Navigation } from './Navigation';
import { ICanal } from './createCanal';
import { TransitionType } from './Transitions/Transition';

export const createStop = (
  canal: ICanal,
  onBack: (() => any) | undefined,
  name: string,
  Component: ComponentType,
  props: object | undefined,
  transition: TransitionType | undefined
) => {
  /**
   * @TODO 2019-07-26 Update @types/react once https://github.com/DefinitelyTyped/DefinitelyTyped/pull is merged.
   */
  // @ts-ignore
  const factory = createFactory(Component);

  return class StopComponent extends ReactComponent<{}> {
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
        <BackContext.Provider
          value={{
            back$: this.back$
          }}
        >
          <View style={StyleSheet.absoluteFill}>{factory({ ...props })}</View>
        </BackContext.Provider>
      );
    }
  };
};
