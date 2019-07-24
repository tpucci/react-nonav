import React, { Children } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';

import { TransitionComponent } from './Transition';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const {
  block,
  call,
  Clock,
  clockRunning,
  cond,
  multiply,
  set,
  startClock,
  stopClock,
  sub,
  timing,
  Value,
} = Animated;

function runTiming(
  clock: Animated.Clock,
  value: Animated.Value<number>,
  dest: Animated.Value<number>,
  updateVisibility: () => any
) {
  const state = {
    finished: new Value(0),
    frameTime: new Value(0),
    position: value,
    time: new Value(0),
  };

  const config = {
    duration: 300,
    easing: Easing.inOut(Easing.ease),
    toValue: dest,
  };

  return block([
    cond(
      clockRunning(clock),
      [
        // if the clock is already running we update the toValue, in case a new dest has been passed in
        set(config.toValue, dest),
      ],
      [
        // If the clock isn't running we reset all the animation params and start the clock
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock),
      ]
    ),
    // we run the step here that is going to update position
    timing(clock, state, config),
    // if the animation is over we stop the clock
    cond(state.finished, stopClock(clock)),
    cond(state.finished, [call([state.finished], updateVisibility), stopClock(clock)]),
    // we made the block return the updated position
    state.position,
  ]);
}

export class CardSkewUp extends TransitionComponent {
  state = {
    hidden: !this.props.directionForward,
  };

  clock = new Clock();
  progress: Animated.Value<number> = new Value(this.props.directionForward ? 0 : 1);
  animation: Animated.Value<number> = new Value(this.props.directionForward ? 0 : 1);
  // istanbul ignore next
  trans = runTiming(this.clock, this.progress, this.animation, () => {
    // react-native-reanimated is not correctly mocked
    // istanbul ignore next
    // @ts-ignore
    if (process.env.NODE_ENV !== 'test' && this.state.hidden !== !this.props.directionForward) {
      this.setState({ hidden: !this.props.directionForward });
    }
  });

  componentDidUpdate() {
    this.animation.setValue(this.props.directionForward ? 0 : 1);
    if (this.state.hidden && this.props.directionForward) {
      this.setState({ hidden: false });
    }
  }

  render() {
    return (
      <Animated.View
        pointerEvents={this.state.hidden ? 'none' : 'auto'}
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: '#00000050', alignItems: 'center', justifyContent: 'center' },
          { opacity: sub(new Value(1), this.trans) },
        ]}
      >
        <Animated.View
          style={{
            transform: [
              { perspective: 500 },
              { rotateX: multiply(this.trans, -0.5) },
              { translateY: multiply(this.trans, SCREEN_HEIGHT / 2) },
            ],
          }}
        >
          {!this.state.hidden && Children.only(this.props.children)}
        </Animated.View>
      </Animated.View>
    );
  }
}
