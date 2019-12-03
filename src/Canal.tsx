import React, { Component, ReactElement } from 'react';
import { arrayify } from './utils/Array.arrayify';
import { withBackContext, WithBackContext } from './withBackContext';
import { View, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { BackEvent } from './Navigation/BackHandlerDelegate';
import { last } from './utils/Array.last';
import { map, publish } from 'rxjs/operators';
import { ConnectableObservable } from 'rxjs';
import { BackContext } from './Navigation/BackContext';
import { Screen, ScreenProps } from './Screen';
import { Navigation } from './Navigation';

interface Props {
  children: ReactElement<ScreenProps, typeof Screen>[] | ReactElement<ScreenProps, typeof Screen>;
  style?: StyleProp<ViewStyle>;
}

class CanalComponent extends Component<WithBackContext<Props>> {
  constructor(props: WithBackContext<Props>) {
    super(props);
    this.back$.connect();
  }

  canalId: string = Date.now().toString();

  static defaultProps = { style: StyleSheet.absoluteFill };

  /**
   * @TODO Pipe operator cannot infer return type as ConnectableObservable.
   * See https://github.com/ReactiveX/rxjs/issues/2972.
   */
  // @ts-ignore
  back$: ConnectableObservable<BackEvent> = this.props.backContext.back$.pipe(
    map(() => {
      const currentScreen = last(
        arrayify<ReactElement<ScreenProps, typeof Screen>>(this.props.children).filter(
          child => child.props.visible && !child.props.isFullScreen
        )
      );
      if (currentScreen) {
        return { target: currentScreen.props.name };
      }
      return { target: null };
    }),
    publish()
  );

  componentDidUpdate() {
    this.notifyFullScreenDelegate();
  }

  componentDidMount() {
    this.notifyFullScreenDelegate();
  }

  componentWillUnmount() {
    Navigation.instance.fullScreenDelegate.canalsFullScreenStackProperties$.next({
      canalId: this.canalId,
      fullScreenStack: [],
    });
  }

  notifyFullScreenDelegate = () => {
    const { children: reactChildren } = this.props;
    const fullScreenChildren = arrayify<ReactElement<ScreenProps, typeof Screen>>(
      reactChildren
    ).filter(child => child.props.isFullScreen);
    Navigation.instance.fullScreenDelegate.canalsFullScreenStackProperties$.next({
      canalId: this.canalId,
      fullScreenStack: fullScreenChildren,
    });
  };

  render() {
    const { children: reactChildren } = this.props;
    const children = arrayify<ReactElement<ScreenProps, typeof Screen>>(reactChildren).filter(
      child => !child.props.isFullScreen
    );
    return (
      <BackContext.Provider
        value={{
          back$: this.back$,
        }}
      >
        <View style={this.props.style} pointerEvents="box-none">
          {children}
        </View>
      </BackContext.Provider>
    );
  }
}

export const Canal = withBackContext(CanalComponent);
