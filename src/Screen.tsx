import React, { Component as ReactComponent, createFactory, ComponentType } from 'react';
import { BackContext } from './Navigation/BackContext';
import { filter, share, tap } from 'rxjs/operators';
import { Navigation } from './Navigation';
import { TransitionComponentType } from './transitions/Transition';
import { None } from './transitions';
import { withBackContext, WithBackContext } from './withBackContext';

export interface ScreenProps {
  isFullScreen?: boolean;
  onBack?: (() => any) | undefined;
  name: string;
  Component: ComponentType<any>;
  props?: object | undefined;
  Transitioner?: TransitionComponentType;
  visible: boolean;
}

class ScreenComponent extends ReactComponent<WithBackContext<ScreenProps>> {
  static defaultProps = {
    isFullScreen: false,
    Transitioner: None,
    props: {},
  };

  back$ = this.props.backContext.back$.pipe(
    filter(value => value.target === this.props.name),
    tap(() => {
      if (this.props.onBack) {
        Navigation.instance.backHandlerDelegate.setOnBackCallback(this.props.onBack);
      }
    }),
    share()
  );

  backSubscription = this.back$.subscribe();

  componentWillUnmount() {
    this.backSubscription.unsubscribe();
  }

  /**
   * @TODO 2019-07-26 Update @types/react once https://github.com/DefinitelyTyped/DefinitelyTyped/pull is merged.
   */
  // @ts-ignore
  factory = createFactory(this.props.Component);

  render() {
    const { Transitioner, onBack, props } = this.props;
    return (
      /**
       *  @todo Transitioner is always defined in static defaultProps.
       */
      // @ts-ignore
      <Transitioner directionForward={this.props.visible}>
        <BackContext.Provider
          value={{
            back$: this.back$,
          }}
        >
          {this.factory({ navigation: { goBack: onBack }, ...props })}
        </BackContext.Provider>
      </Transitioner>
    );
  }
}

export const Screen = withBackContext(ScreenComponent);
