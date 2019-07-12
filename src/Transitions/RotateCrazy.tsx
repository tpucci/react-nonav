import React, { Children } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';

import { ITransition, TransitionComponent } from './Transition.d';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const {
  sub,
  multiply,
  Clock,
  Value,
  set,
  cond,
  startClock,
  clockRunning,
  timing,
  and,
  eq,
  stopClock,
  block
} = Animated;

function runTiming(
  clock: Animated.Clock,
  value: Animated.Value<number>,
  dest: Animated.Value<number>,
  setIsHidden: (value: boolean) => any
) {
  const state = {
    finished: new Value(0),
    frameTime: new Value(0),
    position: value,
    time: new Value(0)
  };

  const config = {
    duration: 1000,
    easing: Easing.inOut(Easing.ease),
    toValue: dest
  };

  return block([
    cond(
      clockRunning(clock),
      [
        // if the clock is already running we update the toValue, in case a new dest has been passed in
        set(config.toValue, dest)
      ],
      [
        // If the clock isn't running we reset all the animation params and start the clock
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock)
      ]
    ),
    // we run the step here that is going to update position
    timing(clock, state, config),
    // if the animation is over we stop the clock
    cond(state.finished, stopClock(clock)),
    cond(and(state.finished, eq(state.position, 1)), setIsHidden(true)),
    // we made the block return the updated position
    state.position
  ]);
}

export class RotateCrazy extends TransitionComponent implements ITransition {
  state = {
    hidden: !this.props.directionForward
  };

  clock = new Clock();
  progress: Animated.Value<number> = new Value(
    this.props.directionForward ? 0 : 1
  );
  animation: Animated.Value<number> = new Value(
    this.props.directionForward ? 0 : 1
  );
  trans = runTiming(
    this.clock,
    this.progress,
    this.animation,
    (hidden: boolean) => {
      // react-native-reanimated is not correctly mocked
      // istanbul ignore next
      // @ts-ignore
      if (process.env.NODE_ENV !== 'test' && this.state.hidden !== hidden) {
        this.setState({ hidden });
      }
    }
  );

  componentDidUpdate() {
    this.animation.setValue(this.props.directionForward ? 0 : 1);
    if (this.state.hidden && this.props.directionForward) {
      this.setState({ hidden: false });
    }
  }

  render() {
    return (
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            opacity: sub(new Value(1), this.trans),
            transform: [
              {
                rotate: multiply(this.trans, 5),
                translateX: multiply(this.trans, SCREEN_WIDTH)
              }
            ]
          }
        ]}
      >
        {!this.state.hidden && Children.only(this.props.children)}
      </Animated.View>
    );
  }
}
