import React, { Children } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

import { TransitionComponent } from './Transition';

const { width } = Dimensions.get('window');
const SCREEN_WIDTH = width / 2;

const TOSS_SEC = 0.2;

const {
  add,
  block,
  call,
  Clock,
  clockRunning,
  cond,
  multiply,
  set,
  startClock,
  stopClock,
  timing,
  Value,
  event,
  lessThan,
  eq,
  sub,
  neq,
  defined,
  spring,
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
    duration: 200,
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
    cond(state.finished, [call([state.finished], updateVisibility), stopClock(clock)]),
    // we made the block return the updated position
    state.position,
  ]);
}

export class SlideLeft extends TransitionComponent {
  state = {
    hidden: !this.props.directionForward,
  };

  dragX = new Value(0);
  gestureState = new Value(-1);
  dragVX = new Value(0);

  onGestureEvent = event([
    {
      nativeEvent: {
        translationX: this.dragX,
        velocityX: this.dragVX,
        state: this.gestureState,
      },
    },
  ]);

  transX = new Value(0);
  clock = new Clock();
  prevDragX = new Value(0);

  snapPoint = cond(
    lessThan(add(this.transX, multiply(TOSS_SEC, this.dragVX)), SCREEN_WIDTH),
    0,
    SCREEN_WIDTH
  );

  animationState = {
    finished: new Value(0),
    velocity: this.dragVX,
    position: new Value(0),
    time: new Value(0),
  };

  config = {
    damping: 12,
    mass: 1,
    stiffness: 150,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
    toValue: this.snapPoint,
  };

  newTransX = cond(
    eq(this.gestureState, State.ACTIVE),
    [
      stopClock(this.clock),
      set(this.transX, add(this.transX, sub(this.dragX, this.prevDragX))),
      set(this.prevDragX, this.dragX),
      this.transX,
    ],
    cond(neq(this.gestureState, -1), [
      set(this.prevDragX, 0),
      set(
        this.transX,
        cond(
          defined(this.transX),
          [
            cond(clockRunning(this.clock), 0, [
              set(this.animationState.finished, 0),
              set(this.animationState.velocity, this.dragVX),
              set(this.animationState.position, this.transX),
              startClock(this.clock),
            ]),
            spring(this.clock, this.animationState, this.config),
            cond(this.animationState.finished, stopClock(this.clock)),
            this.animationState.position,
          ],
          0
        )
      ),
    ])
  );

  progress: Animated.Value<number> = new Value(this.props.directionForward ? 0 : 1);
  animation: Animated.Value<number> = new Value(this.props.directionForward ? 0 : 1);

  // istanbul ignore next
  _transX = runTiming(this.clock, this.progress, this.animation, () => {
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
      <PanGestureHandler
        maxPointers={1}
        onGestureEvent={this.onGestureEvent}
        onHandlerStateChange={this.onGestureEvent}
      >
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              transform: [{ translateX: this.newTransX }],
            },
          ]}
        >
          {!this.state.hidden && Children.only(this.props.children)}
        </Animated.View>
      </PanGestureHandler>
    );
  }
}
