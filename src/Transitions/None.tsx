import React, { Children } from 'react';
import { View, StyleSheet } from 'react-native';

import { TransitionComponent } from './Transition';

export class None extends TransitionComponent {
  render() {
    if (!this.props.directionForward) {
      return null;
    }
    return (
      <View style={StyleSheet.absoluteFill}>
        {Children.only(this.props.children)}
      </View>
    );
  }
}
