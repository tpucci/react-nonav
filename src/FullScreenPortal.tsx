import React, { Component, Fragment } from 'react';
import { View, StyleSheet } from 'react-native';
import { from } from 'rxjs';
import { componentFromStreamWithConfig } from 'recompose';

import { Navigation } from './Navigation';
import { map, publish, withLatestFrom } from 'rxjs/operators';
import { withBackContext, WithBackContext } from './withBackContext';
import { BackContext } from './Navigation/BackContext';
import { last } from './utils/Array.last';

class FullScreenPortalComponent extends Component<WithBackContext<{}>> {
  static FullScreenStack = componentFromStreamWithConfig({
    fromESObservable: from,
    toESObservable: stream => stream,
  })(() =>
    Navigation.instance.fullScreenDelegate.fullSceenStack$.pipe(
      map(fullScreenStack => <>{fullScreenStack}</>)
    )
  );

  constructor(props: WithBackContext<{}>) {
    super(props);
    this.back$.connect();
  }

  /**
   * @TODO Pipe operator cannot infer return type as ConnectableObservable.
   * See https://github.com/ReactiveX/rxjs/issues/2972.
   */
  // @ts-ignore
  back$: ConnectableObservable<BackEvent> = this.props.backContext.back$.pipe(
    withLatestFrom(Navigation.instance.fullScreenDelegate.fullSceenStack$),
    map(([_, fullScreenStack]) => {
      const currentScreen = last(fullScreenStack.filter(screen => screen.props.visible));
      if (currentScreen) {
        return { target: currentScreen.props.name };
      }
      return { target: null };
    }),
    publish()
  );

  render() {
    return (
      <BackContext.Provider
        value={{
          back$: this.back$,
        }}
      >
        <View style={StyleSheet.absoluteFill}>
          <Fragment>{this.props.children}</Fragment>
          <FullScreenPortalComponent.FullScreenStack />
        </View>
      </BackContext.Provider>
    );
  }
}

export const FullScreenPortal = withBackContext(FullScreenPortalComponent);
