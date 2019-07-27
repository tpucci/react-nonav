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

class ScreenComponent extends ReactComponent<WithBackContext<ScreenProps>, ScreenProps['props']> {
  constructor(props: WithBackContext<ScreenProps>) {
    super(props);
    this.state = props.props;
  }

  state: ScreenProps['props'];
  static getDerivedStateFromProps(
    props: WithBackContext<ScreenProps>,
    state: ScreenProps['props']
  ) {
    if (!props.visible) return state;
    return props.props;
  }

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
    const { Transitioner, onBack } = this.props;
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
          {this.factory({ navigation: { goBack: onBack }, ...this.state })}
        </BackContext.Provider>
      </Transitioner>
    );
  }
}

// @ts-ignore
export const Screen = withBackContext(ScreenComponent);
