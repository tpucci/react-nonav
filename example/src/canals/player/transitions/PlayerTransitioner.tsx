import React, {Children} from 'react';
import {Dimensions, View, TouchableOpacity} from 'react-native';
import Animated, {Easing} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import {transition} from 'react-nonav';
import {PlayerModule} from '../../../module/PlayerModule';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const {
  add,
  sub,
  block,
  concat,
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
} = Animated;

function runTiming(
  clock: Animated.Clock,
  value: Animated.Value<number>,
  dest: Animated.Value<number>,
  updateVisibility: () => any,
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
      ],
    ),
    // we run the step here that is going to update position
    timing(clock, state, config),
    // if the animation is over we stop the clock
    cond(state.finished, stopClock(clock)),
    cond(state.finished, [
      call([state.finished], updateVisibility),
      stopClock(clock),
    ]),
    // we made the block return the updated position
    state.position,
  ]);
}

export class PlayerTransitioner extends transition.TransitionComponent {
  state = {
    hidden: !this.props.directionForward,
  };

  clock = new Clock();
  progress: Animated.Value<number> = new Value(
    this.props.directionForward ? 0 : 1,
  );
  animation: Animated.Value<number> = new Value(
    this.props.directionForward ? 0 : 1,
  );

  // istanbul ignore next
  trans = runTiming(this.clock, this.progress, this.animation, () => {
    // react-native-reanimated is not correctly mocked
    // istanbul ignore next
    // @ts-ignore
    if (
      process.env.NODE_ENV !== 'test' &&
      this.state.hidden !== !this.props.directionForward
    ) {
      this.setState({hidden: !this.props.directionForward});
    }
  });

  componentDidUpdate() {
    this.animation.setValue(this.props.directionForward ? 0 : 1);
    if (this.state.hidden && this.props.directionForward) {
      this.setState({hidden: false});
    }
  }

  render() {
    return (
      <Animated.View
        pointerEvents="box-none"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          bottom: multiply(this.trans, 60),
          justifyContent: 'flex-end',
        }}>
        <Animated.View
          style={[
            {
              backgroundColor: '#000000',
              height: add(
                multiply(sub(1, this.trans), SCREEN_HEIGHT),
                multiply(this.trans, 60),
              ),
            },
          ]}>
          <View
            style={{
              height: 60,
              justifyContent: 'center',
            }}>
            <Animated.View
              style={{
                transform: [
                  {rotateZ: concat(multiply(this.trans, 180), 'deg')},
                ],
                alignSelf: 'center',
              }}>
              <TouchableOpacity
                onPress={PlayerModule.toggleIsPlayerMinimized}
                hitSlop={{top: 30, bottom: 30, right: 30, left: 30}}>
                <Icon name="arrow-down" size={12} color="#FFFFFF" />
              </TouchableOpacity>
            </Animated.View>
          </View>
          <Animated.View
            style={{
              flex: 1,
              opacity: sub(1, this.trans),
            }}>
            {!this.state.hidden && Children.only(this.props.children)}
          </Animated.View>
        </Animated.View>
      </Animated.View>
    );
  }
}
